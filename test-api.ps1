# API Test Script for Login Endpoints

Write-Host "Testing Login API Endpoints..." -ForegroundColor Green
Write-Host ""

# TC_003: Valid Credentials Test
Write-Host "TC_003: Testing valid credentials..." -ForegroundColor Yellow
$validBody = @{
    username = "admin"
    password = "password123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/login" -Method POST -Body $validBody -ContentType "application/json"
    Write-Host "✅ TC_003: PASS - Response received as expected" -ForegroundColor Green
    Write-Host "   Status: 200 OK"
    Write-Host "   Success: $($response.success)"
    Write-Host "   Message: $($response.message)"
} catch {
    Write-Host "❌ TC_003: FAIL" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)"
}

Write-Host ""

# TC_004: Invalid Credentials Test
Write-Host "TC_004: Testing invalid credentials..." -ForegroundColor Yellow
$invalidBody = @{
    username = "admin"
    password = "wrongpassword"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/login" -Method POST -Body $invalidBody -ContentType "application/json"
    Write-Host "❌ TC_004: FAIL - Should have returned 401" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
        Write-Host "✅ TC_004: PASS - Unauthorized error returned correctly" -ForegroundColor Green
        Write-Host "   Status: 401 Unauthorized"
        Write-Host "   Success: $($errorResponse.success)"
        Write-Host "   Message: $($errorResponse.message)"
    } else {
        Write-Host "❌ TC_004: FAIL - Unexpected error" -ForegroundColor Red
        Write-Host "   Error: $($_.Exception.Message)"
    }
}

Write-Host ""
Write-Host "API Testing Complete!" -ForegroundColor Green