@echo off
if not exist .env (
    echo Creating .env file...
    echo DATABASE_PASSWORD=your_db_password_here> .env
    echo MISTRAL_API_KEY=your_mistral_api_key_here>> .env
    echo Please edit the .env file with your actual credentials
    exit /b
)

docker-compose up --build