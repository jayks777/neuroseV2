from pydantic import BaseModel, Field, EmailStr

class UserCreate(BaseModel):
    name: str = Field(
        min_lenght=3,
        max_lenght=30,
    )
    
    email: EmailStr
    
    password: str = Field(
        min_lenght=8,
        max_lenght = 128,
    )
    
class User(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        form_atributes = True
        
class UserLogin(BaseModel):
    email: EmailStr
    password: str