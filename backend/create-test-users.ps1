# Create test users via API
$testUsers = @(
    @{
        email = "admin@test.com"
        password = "admin123"
        name = "Administrator"
    },
    @{
        email = "student@test.com"
        password = "student123"
        name = "Jan Kowalski"
    },
    @{
        email = "guardian@test.com"
        password = "guardian123"
        name = "Opiekun Firmy ABC"
    }
)

$apiUrl = "http://localhost:4000/api/auth/register"

Write-Host "Creating test users..." -ForegroundColor Green

foreach ($user in $testUsers) {
    $body = $user | ConvertTo-Json
    
    try {
        $response = Invoke-WebRequest -Uri $apiUrl -Method POST `
            -Headers @{"Content-Type"="application/json"} `
            -Body $body -UseBasicParsing
        
        $data = $response.Content | ConvertFrom-Json
        Write-Host "✅ Created: $($user.email)" -ForegroundColor Green
    } catch {
        $error = $_.Exception.Response.StatusCode
        Write-Host "❌ Error creating $($user.email): $error" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Test users created!" -ForegroundColor Green
Write-Host ""
Write-Host "Credentials:" -ForegroundColor Yellow
Write-Host "  Admin: admin@test.com / admin123" 
Write-Host "  Student: student@test.com / student123"
Write-Host "  Guardian: guardian@test.com / guardian123"
