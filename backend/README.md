# Multiserwis Backend (VPS-ready)

Minimalny szkielet API (Express + TypeScript) do lokalnego developmentu i późniejszego wdrożenia na VPS.

## Szybki start
```bash
cd backend
npm install
npm run dev
```

### Wymagane ENV
Skopiuj `.env.example` -> `.env` i uzupełnij:
- `PORT` (domyślnie 4000)
- `DATABASE_URL` (MySQL/MariaDB DSN)
- `JWT_SECRET`
- `BUNNY_*` dla wideo na Bunny CDN

## Struktura
- `src/index.ts` – punkt startowy serwera
- `src/routes/*` – trasy API (auth, employees, health)
- `src/middleware/auth.ts` – weryfikacja JWT
- `src/db.ts` – połączenie z bazą (mysql2/promise)

## Następne kroki
- Podłączyć DB (Prisma lub bezpośrednio mysql2)
- Zaimplementować logikę w /auth i /employees
- Dodać /courses, /enrollments, /progress
- Zastąpić TODO w kodzie realnymi zapytaniami
