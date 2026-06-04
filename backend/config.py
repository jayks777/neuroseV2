import os

from fastapi.middleware.cors import CORSMiddleware

from routes.user import router as user_router
from routes.auth import router as auth_router


def configure_all(app):
    configure_cors(app)
    configure_database()
    configure_routes(app)


def configure_cors(app):
    allowed_origins = [
        origin.strip()
        for origin in os.getenv(
            "CORS_ALLOWED_ORIGINS",
            "http://localhost:5173,http://127.0.0.1:5173",
        ).split(",")
        if origin.strip()
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


def configure_database():
    from db.db import engine, Base

    Base.metadata.create_all(bind=engine)


def configure_routes(app):
    app.include_router(user_router)
    app.include_router(auth_router)
