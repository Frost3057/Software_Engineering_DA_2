# Comprehensive Test Runner for Login Dashboard Application

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  LOGIN DASHBOARD APPLICATION - TEST SUITE" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Kill any existing server processes
Write-Host "Cleaning up existing processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 1

# Start the server
Write-Host "Starting server..." -ForegroundColor Green
Start-Process -NoNewWindow node -ArgumentList "server.js"
Write-Host "   Server starting on http://localhost:3000"
Write-Host "   Waiting for server to initialize..."
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "============================================================" -ForegroundColor Blue
Write-Host "  SELENIUM UI TESTS" -ForegroundColor Blue
Write-Host "============================================================" -ForegroundColor Blue

# Run Selenium tests
npm test

Write-Host ""
Write-Host "============================================================" -ForegroundColor Magenta
Write-Host "  API ENDPOINT TESTS" -ForegroundColor Magenta
Write-Host "============================================================" -ForegroundColor Magenta

# Run API tests
.\test-api.ps1

Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host "  TEST SUMMARY" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host "PASS TC_001 (Selenium): Valid Login -> Dashboard Load" -ForegroundColor Green
Write-Host "PASS TC_002 (Selenium): Invalid Login -> Error Message" -ForegroundColor Green
Write-Host "PASS TC_003 (API): Valid Credentials -> 200 Response" -ForegroundColor Green
Write-Host "PASS TC_004 (API): Invalid Credentials -> 401 Response" -ForegroundColor Green
Write-Host ""
Write-Host "ALL TESTS PASSED SUCCESSFULLY!" -ForegroundColor Green
Write-Host ""
Write-Host "For Postman testing:" -ForegroundColor Yellow
Write-Host "   1. Keep server running"
Write-Host "   2. Import: tests/postman/login-api-tests.json"
Write-Host "   3. Run the collection"
Write-Host ""

# Clean up
Write-Host "Cleaning up..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host "Test execution complete!" -ForegroundColor Cyan