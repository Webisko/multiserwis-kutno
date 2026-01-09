# Plan Rozwoju Paneli MultiSerwis

Data: 8 stycznia 2026  
Status: W planowaniu

## 1. Przegląd Obecnego Stanu

### Co już mamy ✅

**PANEL ADMINISTRATORA (AdminView)**
- ✅ Dashboard z basic stats (liczba kursów, użytkowników, firm)
- ✅ Zarządzanie kursami (add/edit/delete, moduły, lekcje, materiały)
- ✅ Zarządzanie użytkownikami (search, filter, edit)
- ✅ Zarządzanie firmami (CRUD, tabela z agregacją)
- ⚠️ Settings tab (placeholder)

**PANEL MANAGERA (ManagerView)** ✅ ISTNIEJE
- ✅ Dashboard
- ✅ Zarządzanie Szkoleniami (Moje kursy)
- ✅ Lista Kursantów
- ✅ Zarządzanie Firmami
- ⚠️ Podstawowe funkcje, wymagają rozbudowy

**PANEL KURSANTA (LMSView)**
- ✅ Dashboard z aktywnymi kursami
- ✅ Katalog kursów (courses tab)
- ✅ Certyfikaty (certifications tab)
- ✅ Profil użytkownika
- ❌ Rekomendacje dla Ciebie
- ❌ Promocje i oferty
- ❌ Komunikaty/wiadomości
- ❌ Pomoc i FAQ

**PANEL OPIEKUNA FIRMY (CompanyGuardianView)**
- ✅ Dashboard z podsumowaniem
- ✅ Pracownicy (zarządzanie, dodawanie)
- ✅ Zakupione kursy (nowy - licencje z statusem, ważnością, limitami)
- ⚠️ Raporty postępów (placeholder)
- ❌ Szczegóły pracownika
- ❌ Zarządzanie dostępami (masowe przypisywanie, import CSV)
- ❌ Katalog i zamówienia
- ❌ Powiadomienia
- ❌ Statystyki firmowe zaawansowane

## 2. Analiza Wymagań Funkcjonalnych

### Grupy Paneli

#### Panele Obsługowe (Admin + Manager)
- Służą do zarządzania treścią/użytkownikami
- Powinny mieć podobny layout, nawigację, style
- Admin ma pełne uprawnienia, Manager ma ograniczone scope

#### Panele Klienckie (Kursant + Opiekun Firmy)
- Służą do konsumpcji usług
- Powinny mieć similar UX z focus na progress + discovery
- Oba mają dostęp do katalogu, promocji, rekomendacji

## 3. Brakujące Funkcjonalności

### Panel Administratora - NIEDOSTĘPNE
- [ ] Zaawansowany Dashboard z wykresami (trendy, najpopularniejsze)
- [ ] Logi systemowe (ostatnie działania)
- [ ] Zarządzanie finansami (ceny, pakiety, kody promo)
- [ ] Treści i komunikacja (szablony emaili, regulaminy)
- [ ] Zaawansowane raporty (eksport, statystyki)
- [ ] Ustawienia systemowe (konfiguracja, integracje)

### Panel Managera - NE ISTNIEJE
- [ ] Cały panel do stworzenia
- [ ] Dashboard (statystyki kursów)
- [ ] Moje kursy (zarządzanie treścią)
- [ ] Zarządzanie cenami
- [ ] Kursanci
- [ ] Postępy i wyniki
- [ ] Komunikacja z kursantami
- [ ] Biblioteka materiałów

### Panel Kursanta - NIEDOSTĘPNE
- [ ] Rekomendacje dla Ciebie (algorytmiczne)
- [ ] Promocje i oferty (limitowane, timers)
- [ ] Komunikaty (wiadomości od admina/managera)
- [ ] Pomoc i FAQ

### Panel Opiekuna Firmy - NIEDOSTĘPNE
- [ ] Szczegóły pracownika (po kliknięciu)
- [ ] Zarządzanie dostępami (masowo, import CSV)
- [ ] Katalog i zamówienia
- [ ] Powiadomienia automatyczne
- [ ] Statystyki firmowe zaawansowane (ROI, trending)

## 4. Ujednolicenie Designu

### Struktura Layout - PANELE OBSŁUGOWE (Admin/Manager)

```
┌─────────────────────────────────────────────┐
│  Logo  │ Sekcje (Główne)  │ Notif │ Profil  │  <- Top Bar
├─────────────────────────────────────────────┤
│                                             │
│  AKTYWNA SEKCJA (np. Dashboard)             │
│  - Tytuł sekcji                             │
│  - Podsekcje/Tabs (jeśli są)                │
│  - Zawartość                                │
│                                             │
└─────────────────────────────────────────────┘
```

### Struktura Layout - PANELE KLIENCKIE (Kursant/Opiekun)

```
┌─────────────────────────────────────────────┐
│  Logo  │ Sekcje (Główne)  │ Notif │ Profil  │  <- Top Bar
├─────────────────────────────────────────────┤
│                                             │
│  AKTYWNA SEKCJA (np. Dashboard)             │
│  - Powitanie / Hero section                 │
│  - Quick Stats / Cards                      │
│  - Zawartość                                │
│                                             │
└─────────────────────────────────────────────┘
```

### Komponenty do Ustandaryzowania

1. **Top Navigation Bar**
   - Logo / Menu toggle
   - Główne sekcje (Tabs/Links)
   - Notifications icon
   - Profile dropdown (Mój profil, Ustawienia, Wyloguj)

2. **Sekcje (Tabs)**
   - Unified styling
   - Border-bottom indicator
   - Hover states

3. **Tables**
   - Unified header (bg-slate-50, uppercase)
   - Hover rows (bg-slate-50)
   - Actions column (Edit, Delete, More)
   - Empty states

4. **Cards/Stats**
   - Border-left color indicator
   - Icon + value layout
   - Consistent padding/spacing

5. **Buttons**
   - Primary (bg-brand-accent)
   - Secondary (border + text)
   - Danger (bg-red)
   - Disabled states

6. **Forms & Modals**
   - Consistent input styling
   - Label placement
   - Error messages
   - Button layout

## 5. Plan Implementacji - FAZY

### FAZA 1: UNIFIED DESIGN SYSTEM (Wk. 1) 🚀 ROZPOCZĘCIE
- [ ] Stworzyć reusable komponenty:
  - **PanelHeader** - wspólny header z logo, sekcjami, notif, profil
  - **PanelTabs** - ustandaryzowane tabs (obsługowe vs klienckie style)
  - **PanelTable** - unified table component z paginacją, sortowaniem
  - **StatCard** - karty statystyk (border-left, icon, value layout)
  - **PanelLayout** - wrapper layout dla struktury
  - **NotificationBell** - ikonka z dropdown (na później)
- [ ] Ekstrakt wspólne style do Tailwind classes
- [ ] Zaaplikować komponenty na:
  - AdminView (bez zmiany funkcjonalności)
  - ManagerView (bez zmiany funkcjonalności)
  - LMSView (bez zmiany funkcjonalności)
  - CompanyGuardianView (bez zmiany funkcjonalności)
- [ ] Zapewn responsywność (mobile-first)

### FAZA 2: MANAGER VIEW (Wk. 2-3)
- [ ] Stworzyć nowy komponent ManagerView
- [ ] Dashboard (statystyki kursów, lista, zadania)
- [ ] Moje kursy (edycja treści, opisy, thumbnail)
- [ ] Kursanci (lista, add/remove)
- [ ] Postępy (raporty, eksport)
- [ ] Komunikacja (wiadomości, FAQ)
- [ ] Materiały (biblioteka zasobów)

### FAZA 3: ROZBUDOWA ADMIN DASHBOARD (Wk. 3-4)
- [ ] Wykresy (Chart.js lub Recharts)
- [ ] Logi systemowe
- [ ] Finansowanie (pricing, promocje, transakcje)
- [ ] Szablony komunikacji
- [ ] Zaawansowane raporty
- [ ] Ustawienia systemowe

### FAZA 4: ROZBUDOWA STUDENT VIEW (Wk. 4-5)
- [ ] Rekomendacje (mock algorithm)
- [ ] Promocje i oferty (limitowane, countdown)
- [ ] Komunikaty (feed wiadomości)
- [ ] Pomoc i FAQ

### FAZA 5: ROZBUDOWA GUARDIAN VIEW (Wk. 5-6)
- [ ] Modal szczegółów pracownika
- [ ] Zarządzanie dostępami (masowo, import)
- [ ] Katalog i zamówienia
- [ ] Powiadomienia
- [ ] Statystyki zaawansowane

### FAZA 6: FINETUNE & QA (Wk. 6)
- [ ] Responsywność (mobile/tablet)
- [ ] Accessibility
- [ ] Performance
- [ ] Bug fixes

## 6. Pytania Wyjaśniające - ODPOWIEDZI

✅ **Mock data → Real API integration**
- Integracja z backend API (responsywnie)

✅ **Wykresy - Recharts**
- Użyjemy Recharts (lepszy dla TypeScript)

✅ **White-label / Branding**
- Tak, możliwość personalizacji brandingu per firma

✅ **Onboarding tutorial**
- Tak, interaktywny tour po pierwszym logowaniu (react-joyride)

✅ **Importowanie CSV**
- Admin, Manager, Kursant (do własnych postępów)

✅ **Powiadomienia**
- Email + On-site (toast + Bell icon dropdown)

## 7. Architektura Nowych Paneli - Struktura Nawigacji

### Koncepcja
**Nie dublujemy nawigacji**. Struktura każdego panelu ma dwa poziomy:

1. **PanelHeader** - główne sekcje (zawsze widoczne, sticky na górze)
2. **PanelTabs** - zakładki podrzędne (wewnątrz sekcji, gdy potrzebne)

### Mapa Paneli

#### 🟦 PANEL ADMINISTRATORA (Admin)
```
Header (sticky):
├── Dashboard (główny widok z metrykami)
├── Kursy (zarządzanie szkoleniami)
├── Użytkownicy (zarządzanie studkami)
├── Raporty (analytics)
└── Ustawienia (config)

Wewnątrz sekcji (PanelTabs):
├── Kursy:
│   ├── Lista
│   ├── Edycja/Tworzenie
│   └── Ustawienia Kursu
├── Użytkownicy:
│   ├── Wszystkich
│   ├── Firmy
│   └── Raporty
└── Raporty:
    ├── Zdawalność
    ├── Postępy
    └── Export
```

#### 🟩 PANEL MANAGERA (Manager)
```
Header (sticky):
├── Dashboard (metryki szkoleniowe)
├── Kursy (moje szkolenia)
├── Uczestniczy (moji kursanci)
├── Firmy (przypisane firmy)
└── Raporty

Wewnątrz sekcji (PanelTabs):
├── Kursy:
│   ├── Moje Szkolenia
│   ├── Harmonogram
│   └── Materiały
├── Uczestniczy:
│   ├── Lista
│   ├── Postępy
│   └── Certyfikaty
└── Raporty:
    ├── Zdawalność
    └── Aktywność
```

#### 🟨 PANEL KURSANTA (Student)
```
Header (sticky):
├── Moje Kursy (aktualne szkolenia)
├── Certyfikaty (zdobyte + pending)
├── Historia (przebieg)
└── Ustawienia

Wewnątrz sekcji (PanelTabs):
├── Moje Kursy:
│   ├── W Trakcie
│   ├── Ukończone
│   └── Dostępne Kursy
├── Certyfikaty:
│   ├── Aktywne
│   ├── Ważne Wkrótce
│   └── Archiwum
└── Historia:
    ├── Ukończone Lekcje
    └── Egzaminy
```

#### 🟪 PANEL OPIEKUNA FIRMY (Guardian)
```
Header (sticky):
├── Pracownicy (zarządzanie)
├── Licencje (kupione kursy)
├── Raporty (zdawalność)
└── Ustawienia

Wewnątrz sekcji (PanelTabs):
├── Pracownicy:
│   ├── Lista
│   ├── Dodaj/Edycja
│   └── Raport Postępów
├── Licencje:
│   ├── Aktywne
│   ├── Wygasające
│   └── Historia Zakupów
└── Raporty:
    ├── Zdawalność
    ├── Aktywność
    └── ROI Szkolenia
```

### Komponenty Używane w Każdej Sekcji
- **PanelHeader** - główna nawigacja (różna dla każdej roli)
- **PanelTabs** - nawigacja podrzędna (tylko gdy sekcja ma wiele widoków)
- **StatCard** - kluczowe metryki
- **PanelTable** - listy i tabele danych
- **SectionHeader** - tytuł sekcji z akcjami
- **PanelLayout** - wrapper dla całego panelu

## 7. Priorytety (zmienione)

### KRYYCZNE (zaraz):
1. Unified design components
2. Manager View
3. Responsywność

### WAŻNE (potem):
1. Wykresy w Admin Dashboard
2. Rekomendacje w Student View
3. Promocje i oferty

### NICE TO HAVE:
1. Logi systemowe
2. White-label
3. Onboarding tutorial
4. Zaawansowana analityka

---

**Notatki:**
- Bazować na Design System którym się już posługujemy (Tailwind, brand colors)
- Maksymalna reusability komponenty
- Separator: obsługowy (admin/manager) vs kliencki (kursant/opiekun)
