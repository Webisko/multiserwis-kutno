# Backend Setup & Database Connection

## ✅ Co jest gotowe

- Express.js API server (TypeScript)
- Schematy SQL dla: users, courses, modules, lessons, enrollments, progress, certificates, employees
- Endpoints: auth (login/register/me), courses (CRUD), enrollments, progress, certificates
- JWT authentication middleware
- Password hashing (bcrypt)

## 🚀 Szybki start

### 1. Instalacja (już done)
```bash
cd backend
npm install
npm run dev
```

Serwer uruchomi się na `http://localhost:4000`

### 2. Baza danych - wybierz opcję

#### Opcja A: MySQL/MariaDB (lokalnie) - REKOMENDOWANE
```bash
# Zainstaluj MySQL/MariaDB (jeśli nie masz)
# Na Windows: https://dev.mysql.com/downloads/mysql/
# Na macOS: brew install mysql@8.0
# Na Linux: sudo apt install mysql-server

# Utwórz bazę
mysql -u root -p
CREATE DATABASE multiserwis_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'multiserwis'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON multiserwis_dev.* TO 'multiserwis'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Załaduj schemat
mysql -u multiserwis -p multiserwis_dev < backend/sql/schema.sql
```

#### Opcja B: PostgreSQL (jeśli wolisz)
```bash
# Zainstaluj PostgreSQL
# Na Windows: https://www.postgresql.org/download/windows/
# Na macOS: brew install postgresql@14
# Na Linux: sudo apt install postgresql

# Utwórz bazę i usera
psql postgres
CREATE DATABASE multiserwis_dev;
CREATE USER multiserwis WITH PASSWORD 'password123';
ALTER ROLE multiserwis SET client_encoding TO 'utf8';
ALTER ROLE multiserwis SET default_transaction_isolation TO 'read committed';
ALTER ROLE multiserwis SET default_transaction_deferrable TO on;
ALTER ROLE multiserwis SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE multiserwis_dev TO multiserwis;
\q

# Uwaga: Zmień klienta w src/db.ts z mysql2 na pg
```

### 3. Konfiguracja .env

Edytuj `backend/.env`:
```env
PORT=4000
JWT_SECRET=dev-secret-change-in-production

# Dla MySQL:
DATABASE_URL=mysql://multiserwis:password123@127.0.0.1:3306/multiserwis_dev

# Lub dla PostgreSQL:
# DATABASE_URL=postgresql://multiserwis:password123@localhost:5432/multiserwis_dev

BUNNY_STREAM_LIBRARY_ID=
BUNNY_STREAM_API_KEY=
BUNNY_PULL_ZONE_URL=
```

### 4. Sprawdź połączenie

Backend automatycznie restartuje się przy zmianach kodu.
Jeśli baza nie jest dostępna, zobaczysz błąd przy wywołaniu endpointu.

## 📝 Testy API

### Postman
Importuj [postman.json](postman.json) do Postmana i testuj endpointy.

### cURL (bez bazy, będzie błąd)
```bash
# Health check (nie wymaga bazy)
curl http://localhost:4000/health

# Lista kursów (wymaga bazy)
curl http://localhost:4000/api/courses

# Register (wymaga bazy)
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123","name":"User Name"}'

# Login (wymaga bazy)
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'
```

## 🐛 Troubleshooting

### Błąd: "Error: connect ECONNREFUSED"
- Baza nie jest uruchomiona
- Sprawdź, czy MySQL/PostgreSQL serwer działa
- Sprawdź DATABASE_URL w .env

### Błąd: "Access denied for user"
- Sprawdź login/hasło w DATABASE_URL
- Sprawdź, czy użytkownik ma uprawnienia do bazy

### Błąd: "No such table"
- Załaduj schemat: `mysql -u multiserwis -p multiserwis_dev < backend/sql/schema.sql`

## 📚 Dokumentacja endpointów

Pełna lista dostępna na `GET http://localhost:4000`

**Najważniejsze:**
- `POST /api/auth/login` - zaloguj się
- `POST /api/auth/register` - zarejestruj nowe konto
- `GET /api/courses` - lista kursów
- `POST /api/enrollments` - zapisz się na kurs
- `POST /api/progress` - śledź postęp

## 🔐 Authentication

Wszystkie endpointy prywatne wymagają header'a:
```
Authorization: Bearer <JWT_TOKEN>
```

Token dostaniesz z `/api/auth/login` lub `/api/auth/register`.

## 📦 Następne kroki

1. **Zamień mock employees na real DB** - emplementuj `/api/employees` CRUD
2. **Dodaj modules/lessons API** - POST/PUT/DELETE dla modułów i lekcji
3. **Podłącz frontend** - zmień axios URL z mock'ów na `http://localhost:4000/api`
4. **Email system** - dodaj wysyłanie zaproszeń dla pracowników
5. **Bunny CDN** - integracja dla wideo kursów
