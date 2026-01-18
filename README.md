# BustaniApp Backend

High-performance Python API using FastAPI, SQLAlchemy 2.0 (Async), and PostgreSQL.

## Tech Stack
- **FastAPI**: Modern, fast web framework.
- **PostgreSQL 16**: Latest stable database.
- **SQLAlchemy 2.0**: Type-safe async ORM.
- **Pydantic V2**: Fastest data validation.
- **Docker**: Containerized database setup.

## Getting Started

### 1. Start the Database
Ensure you have Docker installed, then run:
```bash
docker-compose up -d
```

### 2. Install Dependencies
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Run the API
```bash
uvicorn app.main:app --reload
```

## API Documentation
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
