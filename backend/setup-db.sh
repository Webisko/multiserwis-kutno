#!/bin/bash
# MySQL Database Setup Script for MultiSerwis

echo "🚀 MultiSerwis MySQL Database Setup"
echo "===================================="
echo ""

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL/MariaDB is not installed or not in PATH"
    echo "Please install MySQL/MariaDB first:"
    echo "  Windows: https://dev.mysql.com/downloads/mysql/"
    echo "  macOS: brew install mysql@8.0"
    echo "  Linux: sudo apt install mysql-server"
    exit 1
fi

# Prompt for root password
read -sp "Enter MySQL root password: " ROOT_PASSWORD
echo ""

# Prompt for new user details
read -p "Enter new database username (default: multiserwis): " DB_USER
DB_USER=${DB_USER:-multiserwis}

read -sp "Enter new database user password: " DB_PASSWORD
echo ""

DB_NAME="multiserwis_dev"

echo ""
echo "Creating database and user..."
echo "Database: $DB_NAME"
echo "User: $DB_USER"
echo ""

# Create database and user
mysql -u root -p"$ROOT_PASSWORD" << EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;
EOF

if [ $? -eq 0 ]; then
    echo "✅ Database and user created successfully"
else
    echo "❌ Failed to create database and user"
    exit 1
fi

echo ""
echo "Loading database schema..."

# Load schema
mysql -u "$DB_USER" -p"$DB_PASSWORD" $DB_NAME < "$(dirname "$0")/sql/schema.sql"

if [ $? -eq 0 ]; then
    echo "✅ Database schema loaded successfully"
else
    echo "❌ Failed to load database schema"
    exit 1
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Update backend/.env with:"
echo "DATABASE_URL=mysql://$DB_USER:$DB_PASSWORD@127.0.0.1:3306/$DB_NAME"
echo ""
echo "Then run: npm run dev"
