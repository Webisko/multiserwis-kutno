# Backend Implementation Summary

## 📊 Status: GOTOWY DO TESTÓW (bez DB)

Pełny backend Express.js (TypeScript) z następującymi endpointami:

### ✅ Wdrożone moduły

#### 1. **Auth** (`src/routes/auth.ts`)
- `POST /api/auth/login` - zaloguj się z email + hasło
- `POST /api/auth/register` - załóż nowe konto (auto-hash bcrypt)
- `GET /api/auth/me` - dane zalogowanego użytkownika (require auth)

#### 2. **Courses** (`src/routes/courses.ts`)
- `GET /api/courses` - lista wszystkich opublikowanych kursów
- `GET /api/courses/:slug` - szczegóły kursu + moduły + lekcje
- `POST /api/courses` - utwórz kurs (admin only)
- `PUT /api/courses/:id` - edytuj kurs (admin only)
- `DELETE /api/courses/:id` - usuń kurs (admin only)

#### 3. **Enrollments** (`src/routes/enrollments.ts`)
- `GET /api/enrollments` - moje zapisy na kursy
- `POST /api/enrollments` - zapisz się na kurs
- `PUT /api/enrollments/:id` - zmień status (active/completed/dropped)

#### 4. **Progress** (`src/routes/progress.ts`)
- `GET /api/progress/:enrollmentId` - postęp w kursie (lekcje/moduły)
- `POST /api/progress` - zaznacz lekcję/moduł jako ukończony + time tracking

#### 5. **Certificates** (`src/routes/certificates.ts`)
- `GET /api/certificates` - moje certyfikaty
- `POST /api/certificates` - generuj certyfikat (po completion kursu)
- `GET /api/certificates/:certNumber` - weryfikuj certyfikat (publiczny)

#### 6. **Employees** (`src/routes/employees.ts`)
- Zaplanowany, TODO: pełna implementacja z email invites

### 🗄️ Baza danych

**Schemat SQL** (`sql/schema.sql`):
- `users` - studenci, admini, opiekunowie, managery
- `courses` - kursy z metadanymi (tytuł, slug, cena, trudność)
- `modules` - sekcje w kursach
- `lessons` - lekcje z video URL (będą Bunny CDN)
- `enrollments` - zapisy studenta na kursy + progress %
- `progress` - śledzenie lekcji/modułów (co obejrzane, ile czasu)
- `certificates` - wydane certyfikaty z numerami
- `employees` - pracownicy opiekunów firm

### 🔐 Security

- JWT tokens (7 dni validity)
- Bcrypt password hashing (10 rounds)
- Middleware autoryzacji na `/api/auth/me` i private endpointach
- Role-based access (admin, manager, student, company_guardian)
- SQL injection prevention (prepared statements)

### 📦 Technologia

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **DB Client**: mysql2/promise (ready dla MySQL/MariaDB)
- **Validation**: Zod (schema validation)
- **Auth**: JWT + bcryptjs
- **Dev**: ts-node-dev (watch + reload)

### 🚀 Szybki start

```bash
cd backend
npm install
# Ustaw .env z DATABASE_URL
npm run dev
```

Backend uruchomi się na `http://localhost:4000`

### 📋 Co trzeba zrobić dalej

#### Priority 1: Database Connection ⚠️
1. Zainstaluj MySQL 8.0 lub MariaDB 10.5+
2. `mysql -u root -p < backend/sql/schema.sql` (załaduj schemat)
3. Zmień `DATABASE_URL` w `.env` na twoje dane
4. Test: `curl http://localhost:4000/api/courses` (powinno pokazać [])

#### Priority 2: Testowanie
- Importuj [postman.json](postman.json) do Postmana
- Test flow: Register → Login → Create Course → Enroll → Track Progress → Generate Certificate
- Fix bugs jak pojawią się

#### Priority 3: Frontend Integration
- Zamień axios/fetch URL w `App.tsx` z `http://localhost:4000/api` zamiast mock'ów
- `POST /api/auth/login` zamiast sprawdzania `mockUsers`
- `GET /api/courses` zamiast `COURSES` constant
- `POST /api/enrollments` zamiast `enrolledCourses.push()`

#### Priority 4: Employees Implementation
- Zakończyć `/api/employees` (CRUD)
- Dodać email invite system z tokenami
- Endpoint do aktywacji konta z tokenu

#### Priority 5: Advanced Features
- Video upload → Bunny CDN (zamiast video_url w lessons)
- Module tests (pytania/odpowiedzi)
- Final exam logic
- Email notifications
- Admin dashboard statystyki

### 📝 Notes

- Password hashing jest asynchroniczny (bcrypt.hash) - wszystkie auth endpointy są async
- DB Pool connection limit: 10 (adjust w `src/db.ts` jeśli potrzeba)
- Certificate numbers: `CERT-YEAR-RANDOM` np. `CERT-2026-0001`
- Wszystkie timestamps w UTC (MySQL CURRENT_TIMESTAMP)
- UUIDs zamiast auto-increment ID (lepsze dla distributed system)

### 🎯 Następne spotkanie

Kiedy przygotowujesz MySQL, dam Ci step-by-step instrukcje podłączenia frontendu.
