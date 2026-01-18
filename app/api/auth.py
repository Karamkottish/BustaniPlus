from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.models.user import User, UserRole
from app.schemas.user import UserCreate, UserResponse, Token
from app.core.security import get_password_hash, create_access_token, create_refresh_token
from typing import Any

router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    user_in: UserCreate, 
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Register a new user with full_name, email, password, and role.
    Roles available: visitor, farmer, producer.
    """
    # Check if user already exists
    result = await db.execute(select(User).filter(User.email == user_in.email))
    user = result.scalar_one_or_none()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    
    # Create new user
    user_obj = User(
        full_name=user_in.full_name,
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        role=user_in.role
    )
    
    db.add(user_obj)
    await db.commit()
    await db.refresh(user_obj)
    
    return user_obj

# Placeholder for login to show tokens
@router.post("/login", response_model=Token)
async def login(
    email: str,
    password: str,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    OAuth2 compatible token login, retrieve an access token for future requests.
    """
    # This is a basic implementation, usually using OAuth2PasswordRequestForm
    result = await db.execute(select(User).filter(User.email == email))
    user = result.scalar_one_or_none()
    
    from app.core.security import verify_password
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    return {
        "access_token": create_access_token(user.id, role=user.role),
        "refresh_token": create_refresh_token(user.id),
        "token_type": "bearer",
    }
