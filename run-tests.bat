@echo off
echo Installing dependencies...
call npm install

echo.
echo Starting server...
start /B node server.js

echo Waiting for server to start...
timeout /t 3 /nobreak > nul

echo.
echo Running Selenium tests...
call npm test

echo.
echo Tests completed!
echo.
echo To run Postman tests:
echo 1. Keep server running with: npm start
echo 2. Import tests/postman/login-api-tests.json into Postman
echo 3. Run the collection

pause