# MySQL Database Setup Script for MultiSerwis (Windows PowerShell)
# Usage: .\setup-db.ps1

Write-Host "🚀 MultiSerwis MySQL Database Setup" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""

# Check if MySQL is installed
try {
    $mysqlPath = (Get-Command mysql -ErrorAction Stop).Source
    Write-Host "✅ MySQL found at: $mysqlPath" -ForegroundColor Green
} catch {
    Write-Host "❌ MySQL/MariaDB is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install MySQL/MariaDB first:"
    Write-Host "  https://dev.mysql.com/downloads/mysql/"
    exit 1
}

Write-Host ""

# Prompt for root password
$rootPassword = Read-Host "Enter MySQL root password" -AsSecureString
$rootPasswordPlain = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToCoTaskMemUnicode($rootPassword))

# Prompt for new user details
$dbUser = Read-Host "Enter new database username (default: multiserwis)"
if ([string]::IsNullOrEmpty($dbUser)) { $dbUser = "multiserwis" }

$dbPassword = Read-Host "Enter new database user password" -AsSecureString
$dbPasswordPlain = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToCoTaskMemUnicode($dbPassword))

$dbName = "multiserwis_dev"

Write-Host ""
Write-Host "Creating database and user..." -ForegroundColor Yellow
Write-Host "Database: $dbName"
Write-Host "User: $dbUser"
Write-Host ""

# Create database and user
$createDbSql = @"
CREATE DATABASE IF NOT EXISTS $dbName CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '$dbUser'@'localhost' IDENTIFIED BY '$dbPasswordPlain';
GRANT ALL PRIVILEGES ON $dbName.* TO '$dbUser'@'localhost';
FLUSH PRIVILEGES;
"@

$createDbSql | mysql -u root -p"$rootPasswordPlain" 2>$null

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database and user created successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to create database and user" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Loading database schema..." -ForegroundColor Yellow

# Load schema
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$schemaPath = Join-Path $scriptPath "sql\schema.sql"

Get-Content $schemaPath | mysql -u "$dbUser" -p"$dbPasswordPlain" $dbName 2>$null

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database schema loaded successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to load database schema" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Update backend/.env with:" -ForegroundColor Cyan
Write-Host "DATABASE_URL=mysql://$dbUser`:$dbPasswordPlain@127.0.0.1:3306/$dbName"
Write-Host ""
Write-Host "Then run: npm run dev" -ForegroundColor Cyan
