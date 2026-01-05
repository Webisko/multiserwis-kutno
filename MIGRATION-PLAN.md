# 🚀 PLAN MIGRACJI: Vite → Next.js 14

## Status: FAZA 1 - Migracja Frontendowa

---

## KROK 1: PRZYGOTOWANIE (✓ Do wykonania)

### 1.1 Backup projektu
```bash
git checkout -b migration-to-nextjs
git push -u origin migration-to-nextjs
```

### 1.2 Sprawdź hosting Seohost.pl
- [ ] Zaloguj się do panelu
- [ ] Sprawdź Node.js version (≥18.17 wymagane)
- [ ] Sprawdź MySQL version
- [ ] Sprawdź czy jest SSH access
- [ ] Sprawdź dostępne deployment options

---

## KROK 2: SETUP NEXT.JS (30 min)

### 2.1 Instalacja Next.js
```bash
# W głównym folderze projektu
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir
# Wybierz:
# ✓ TypeScript: Yes
# ✓ ESLint: Yes  
# ✓ Tailwind CSS: Yes (już mamy)
# ✓ App Router: Yes
# ✓ Import alias: @/* (domyślnie)
```

### 2.2 Struktura folderów - DOCELOWA
```
multiserwis-kutno/
├── app/                          # Next.js App Router (NOWE)
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── (public)/                # Public routes
│   │   ├── szkolenia/
│   │   │   ├── page.tsx         # Katalog szkoleń
│   │   │   └── [slug]/page.tsx  # Szczegóły szkolenia
│   │   ├── wynajem/page.tsx
│   │   ├── serwis/page.tsx
│   │   └── kontakt/page.tsx
│   ├── (auth)/                  # Auth routes
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── verify-email/page.tsx
│   ├── (student)/               # Protected - Student
│   │   └── panel/page.tsx       # LMS Panel
│   ├── (admin)/                 # Protected - Admin
│   │   └── admin/page.tsx
│   ├── (guardian)/              # Protected - Guardian
│   │   └── firma/page.tsx
│   └── api/                     # API Routes (PRZYSZŁOŚĆ)
│       ├── auth/
│       └── courses/
├── components/                   # Komponenty React (ZACHOWANE)
│   ├── Layout.tsx               
│   └── LessonTextEditor.tsx
├── lib/                         # Utilities (NOWE)
│   ├── db.ts                    # Prisma client
│   └── utils.ts                 # Helpers
├── prisma/                      # Database (NOWE - FAZA 2)
│   └── schema.prisma
├── public/                      # Static assets (ZACHOWANE)
│   └── *.webp
├── styles/                      # Global styles
│   └── globals.css
├── constants.ts                 # Dane (ZACHOWANE - póki co)
├── types.ts                     # Types (ZACHOWANE)
├── package.json
├── next.config.js              # Next.js config (NOWE)
└── tsconfig.json               # Updated

# DO USUNIĘCIA PO MIGRACJI:
├── index.html                   # ❌ Zastąpiony przez app/layout.tsx
├── index.tsx                    # ❌ Zastąpiony przez app/page.tsx
├── App.tsx                      # ❌ Podzielony na routing w app/
└── vite.config.ts              # ❌ Zastąpiony przez next.config.js
```

---

## KROK 3: MIGRACJA KOMPONENTÓW (2-3 godziny)

### 3.1 Root Layout (app/layout.tsx)
- [ ] Przenieść <head> z index.html
- [ ] Setup Tailwind
- [ ] Setup fonts (Montserrat, Inter)
- [ ] Global styles
- [ ] Metadata

### 3.2 Homepage (app/page.tsx)
- [ ] Przenieść HomeView z App.tsx
- [ ] Przekształcić na Server Component
- [ ] Zachować SEO

### 3.3 Layout Component (components/Layout.tsx)
- [ ] Dostosować do Next.js (Link zamiast onClick)
- [ ] useRouter hook z next/navigation
- [ ] Zachować nawigację
- [ ] Zachować mobile menu

### 3.4 Pozostałe widoki
- [ ] CatalogView → app/szkolenia/page.tsx
- [ ] CourseDetailView → app/szkolenia/[slug]/page.tsx  
- [ ] LMSView → app/panel/page.tsx
- [ ] LessonPlayerView → app/panel/lekcja/page.tsx
- [ ] AdminView → app/admin/page.tsx
- [ ] AdminPanelView → app/admin/ustawienia/page.tsx
- [ ] CompanyGuardianView → app/firma/page.tsx

### 3.5 Edytor TipTap
- [ ] Zachować LessonTextEditor jako Client Component
- [ ] Dodać 'use client' na górze
- [ ] Sprawdzić czy wszystko działa

---

## KROK 4: ROUTING & NAVIGATION (1-2 godziny)

### 4.1 Zastąpić custom routing
```typescript
// Było (Vite):
setView('CATALOG')

// Będzie (Next.js):
import { useRouter } from 'next/navigation'
router.push('/szkolenia')
```

### 4.2 Dynamic routes
- [ ] /szkolenia/[slug] dla szczegółów kursu
- [ ] /panel/[lessonId] dla lekcji
- [ ] /admin/kurs/[id] dla edycji

### 4.3 Protected routes
- [ ] Middleware dla autoryzacji
- [ ] Redirect do /login jeśli niezalogowany

---

## KROK 5: NEXT.JS CONFIG (30 min)

### 5.1 next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'multiserwis-kutno.pl',
      },
    ],
  },
  // Dla deployment na Seohost
  output: 'standalone', // lub 'export' jeśli potrzeba static
}

module.exports = nextConfig
```

### 5.2 Optymalizacja obrazów
- [ ] Zamień <img> na <Image> z next/image
- [ ] WebP już mamy ✓
- [ ] Lazy loading automatycznie ✓

---

## KROK 6: TESTOWANIE LOKALNE (1 godzina)

### 6.1 Development server
```bash
npm run dev
# Otwórz http://localhost:3000
```

### 6.2 Checklist testów
- [ ] Homepage ładuje się poprawnie
- [ ] Nawigacja działa (wszystkie linki)
- [ ] Katalog szkoleń wyświetla kursy
- [ ] Szczegóły kursu działają
- [ ] Panel LMS działa
- [ ] Panel Admin działa  
- [ ] Panel Opiekuna działa
- [ ] Edytor TipTap działa
- [ ] Responsive design OK
- [ ] Mobile menu działa
- [ ] Language switcher działa

### 6.3 Build test
```bash
npm run build
npm start
# Test produkcyjny lokalnie
```

---

## KROK 7: PRZYGOTOWANIE DO DEPLOYMENT (30 min)

### 7.1 package.json scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 7.2 .gitignore
```
.next/
out/
.env*.local
```

### 7.3 Environment variables
Stwórz `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=https://multiserwis-kutno.pl
DATABASE_URL=mysql://user:pass@localhost:3306/dbname
```

---

## KROK 8: DEPLOYMENT NA SEOHOST (1 godzina)

### 8.1 Opcja A: Node.js Hosting
```bash
# Na serwerze przez SSH:
cd /home/username/domains/multiserwis-kutno.pl
git clone https://github.com/Webisko/multiserwis-kutno.git .
npm install
npm run build
npm start
```

### 8.2 Opcja B: Static Export (jeśli Node.js niedostępny)
```javascript
// next.config.js
module.exports = {
  output: 'export',
  trailingSlash: true,
}
```
```bash
npm run build
# Upload folder 'out/' przez FTP do public_html
```

### 8.3 Nginx/Apache config
Jeśli Node.js:
```nginx
server {
    server_name multiserwis-kutno.pl;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## KROK 9: WERYFIKACJA PRODUKCYJNA (30 min)

- [ ] Strona ładuje się na domenie
- [ ] SSL działa (https://)
- [ ] Wszystkie assets wczytane
- [ ] Nawigacja działa
- [ ] SEO meta tags OK (sprawdź View Source)
- [ ] Mobile version OK
- [ ] Performance OK (Google PageSpeed)

---

## KROK 10: CLEANUP (30 min)

### 10.1 Usuń stare pliki
```bash
rm index.html
rm index.tsx  
rm App.tsx
rm vite.config.ts
rm -rf dist/
```

### 10.2 Commit & Push
```bash
git add .
git commit -m "Migracja do Next.js 14 - Faza 1 zakończona"
git push origin migration-to-nextjs

# Po weryfikacji:
git checkout master
git merge migration-to-nextjs
git push origin master
```

---

## ⚠️ POTENCJALNE PROBLEMY I ROZWIĄZANIA

### Problem 1: "Window is not defined"
**Przyczyna:** Server-side rendering  
**Rozwiązanie:** 
```typescript
'use client' // Na górze komponentu używającego window/document
```

### Problem 2: Obrazy nie wczytują się
**Przyczyna:** Ścieżki relatywne  
**Rozwiązanie:**
```typescript
import Image from 'next/image'
<Image src="/logo.webp" alt="Logo" width={200} height={100} />
```

### Problem 3: CSS nie działa
**Przyczyna:** Global styles  
**Rozwiązanie:** Import w app/layout.tsx:
```typescript
import '../styles/globals.css'
```

### Problem 4: Seohost nie wspiera Node.js
**Rozwiązanie:** Static export (output: 'export')  
**Ograniczenia:** Brak API routes, trzeba będzie osobny backend

---

## 📊 TIMELINE REALISTYCZNY

| Krok | Czas | Kumulatywnie |
|------|------|--------------|
| 1-2. Setup | 45 min | 45 min |
| 3. Migracja komponentów | 3h | 3h 45min |
| 4. Routing | 2h | 5h 45min |
| 5. Config | 30 min | 6h 15min |
| 6. Testy | 1h | 7h 15min |
| 7. Prep deployment | 30 min | 7h 45min |
| 8. Deploy | 1h | 8h 45min |
| 9. Weryfikacja | 30 min | 9h 15min |
| 10. Cleanup | 30 min | **10h** |

**Realnie: 2-3 dni pracy (po 3-4h dziennie)**

---

## 🎯 PO ZAKOŃCZENIU FAZY 1 BĘDZIEMY MIEĆ:

✅ Next.js 14 działający  
✅ Wszystkie obecne funkcje zachowane  
✅ Lepsze SEO (SSR/SSG)  
✅ Szybszy development  
✅ Gotowość na Fazę 2 (Backend + Database)  

---

## 🔜 NASTĘPNA FAZA (FAZA 2):

Po zakończeniu i przetestowaniu Fazy 1, rozpoczniemy:
- Prisma + MySQL setup
- NextAuth.js (login/register)
- API Routes
- Database models

---

## ❓ PYTANIA PRZED STARTEM

1. **Czy masz dostęp SSH do Seohost.pl?**
2. **Jaka wersja Node.js jest dostępna?** (sprawdź w panelu)
3. **Czy możesz zainstalować własne pakiety npm?**
4. **Czy jest opcja PM2/forever do zarządzania procesem Node?**
5. **Czy masz dostęp do phpMyAdmin (MySQL)?**

Odpowiedz na te pytania, a będę wiedział jak skonfigurować deployment.

---

**Status:** Czekam na Twoje potwierdzenie aby rozpocząć KROK 1 🚀
