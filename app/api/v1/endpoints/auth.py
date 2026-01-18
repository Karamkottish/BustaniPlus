from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.api import deps
from app.crud.crud_user import user as crud_user
from app.schemas.user import UserCreate, UserResponse, Token
from app.core.security import create_access_token, create_refresh_token
from typing import Any

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    *,
    db: AsyncSession = Depends(deps.get_db),
    user_in: UserCreate
) -> Any:
    """
    **Register a new user.**

    Create a new user account with the following details:
    - **full_name**: Name of the user
    - **email**: Valid email address (must be unique)
    - **password**: Secure password (min 8 characters)
    - **role**: One of *visitor*, *farmer*, or *producer*
    
    Returns the created user object.
    """
    user = await crud_user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists.",
        )
    return await crud_user.create(db, obj_in=user_in)

@router.post("/login", response_model=Token)
async def login(
    *,
    db: AsyncSession = Depends(deps.get_db),
    email: str,
    password: str
) -> Any:
    """
    **Login to get access and refresh tokens.**

    Authenticate using email and password to receive JWT tokens for subsequent requests.
    """
    user = await crud_user.authenticate(db, email=email, password=password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    return {
        "access_token": create_access_token(user.id, role=user.role),
        "refresh_token": create_refresh_token(user.id),
        "token_type": "bearer",
    }
