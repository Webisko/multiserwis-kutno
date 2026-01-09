# Frontend Integration with Backend API

## Cel
Zastąpić mock'i w App.tsx rzeczywistymi API callami do backendu.

## Status
- Backend: ✅ Gotowy na porcie 4000
- Frontend: 🟡 Potrzeba integracji

## Kroki

### 1. Setup CORS (już zrobione w backend)
Backend ma CORS włączony, frontend może robić requesty z portu 3000.

### 2. Utwórz API client (helper)
```typescript
// lib/api.ts (lub utils/api.ts)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export async function apiCall(endpoint: string, options?: RequestInit) {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { ...headers, ...options?.headers }
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}
```

### 3. Replace Mock Auth
**Było:**
```typescript
const mockUsers = { ... }
const user = mockUsers[loginEmail]
```

**Teraz:**
```typescript
const response = await apiCall('/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email: loginEmail, password: loginPassword })
});
localStorage.setItem('token', response.token);
setLoggedInUser(response.user);
```

### 4. Replace Mock Courses
**Było:**
```typescript
const COURSES = [...]
courseData = COURSES
```

**Teraz:**
```typescript
const courses = await apiCall('/courses');
setCourses(courses);
```

### 5. Replace Mock Enrollments
**Było:**
```typescript
studentViewUser.enrolledCourses.push(courseId)
```

**Teraz:**
```typescript
const enrollment = await apiCall('/enrollments', {
  method: 'POST',
  body: JSON.stringify({ course_id: courseId })
});
```

### 6. Replace Mock Employees
**Było:**
```typescript
console.log('Dodaj pracownika:', employeeData);
```

**Teraz:**
```typescript
const employee = await apiCall('/employees', {
  method: 'POST',
  body: JSON.stringify(employeeData)
});
// Show success + copy invite link
```

## ⚠️ WAŻNE: Baza danych musi być dostępna!

Zanim zaciśniesz frontend, upewnij się:
1. MySQL jest uruchomiony
2. Schema załadowana (`setup-db.ps1`)
3. Backend ma `DATABASE_URL` ustawione w `.env`
4. Backend zaraportuje "API running on port 4000"

## Testy

### Local Development
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend  
npm run dev
```

### Test flow
1. Otwórz http://localhost:3000 (lub port frontendu)
2. Zaloguj się (będzie error jeśli baza niedostępna)
3. Lista kursów załaduje się z API
4. Zapisy/postępy będą zapisywane w DB

## Błędy i rozwiązania

### "Failed to fetch" / CORS error
- Sprawdź czy backend działa: `curl http://localhost:4000/health`
- Sprawdź czy `API_URL` w env jest poprawne

### "Invalid email or password"
- Baza nie ma użytkownika
- Zaloguj się na `/api/auth/register` aby utworzyć konto

### "Internal server error"
- Backend ma błąd w logach
- Sprawdź czy `DATABASE_URL` wskazuje na poprawną bazę

## Plany dalej

1. **Email system** - wysyłanie zaproszeń dla pracowników
2. **Bunny CDN** - upload video + streaming
3. **Testing** - unit testy + API testy
4. **Production** - deploy na VPS klienta
