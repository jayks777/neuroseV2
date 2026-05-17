from fastapi.middleware.cors import CORSMiddleware
from routes.user import router as user_router

#incluir todas as configurações aqui
def configure_all(app):
    configure_cors(app)
    configure_database(app)
    configure_routes(app)

def configure_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

def configure_database(app):
    from db.db import engine, Base
    Base.metadata.create_all(bind=engine)

def configure_routes(app):
    app.include_router(user_router)