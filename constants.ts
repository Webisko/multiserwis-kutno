import { Course, Machine, UserCourse, Module, Student, SEOMetadata, Language } from './types';

export const TRANSLATIONS = {
  PL: {
    nav: {
      home: 'Start',
      catalog: 'Szkolenia',
      rentals: 'Wynajem',
      contact: 'Kontakt',
      admin: 'Panel Managera',
      lms: 'Strefa Kursanta'
    },
    hero: {
      badge: 'Nowe terminy szkoleń 2024',
      title: 'Zdobądź uprawnienia operatora',
      subtitle: 'online i stacjonarnie',
      desc: 'Kompleksowe kursy UDT z dostępem do teorii w e-learningu. Praktyka na nowoczesnym sprzęcie.',
      cta1: 'Przeglądaj szkolenia',
      cta2: 'Usługi serwisowe'
    }
  },
  EN: {
    nav: {
      home: 'Home',
      catalog: 'Courses',
      rentals: 'Rentals',
      contact: 'Contact',
      admin: 'Manager Panel',
      lms: 'Student Zone'
    },
    hero: {
      badge: 'New training dates 2024',
      title: 'Get operator certification',
      subtitle: 'online and on-site',
      desc: 'Comprehensive UDT courses with e-learning theory access. Practice on modern equipment.',
      cta1: 'Browse Courses',
      cta2: 'Service & Repairs'
    }
  },
  DE: {
    nav: {
      home: 'Startseite',
      catalog: 'Schulungen',
      rentals: 'Vermietung',
      contact: 'Kontakt',
      admin: 'Manager-Panel',
      lms: 'Studentenzone'
    },
    hero: {
      badge: 'Neue Schulungstermine 2024',
      title: 'Holen Sie sich das Zertifikat',
      subtitle: 'online und vor Ort',
      desc: 'Umfassende UDT-Kurse mit Zugang zur E-Learning-Theorie. Praxis an modernen Geräten.',
      cta1: 'Kurse durchsuchen',
      cta2: 'Serviceleistungen'
    }
  }
};

// SEO Structure for Telescopic Loader (Ładowarki)
export const SEO_DATA: Record<Language, SEOMetadata> = {
  PL: {
    title: 'Kurs na Ładowarki Teleskopowe UDT (I WJO) | MultiSerwis Kutno',
    description: 'Zrób uprawnienia na ładowarki teleskopowe w Kutnie. Teoria online, egzamin państwowy UDT. Najwyższa zdawalność w regionie.',
    keywords: 'kurs ładowarki teleskopowe, szkolenia udt kutno, uprawnienia na ładowarki, operator ładowarki cena',
    ogTitle: 'Zdobądź uprawnienia na Ładowarki Teleskopowe - Szybko i Skutecznie',
    ogDescription: 'Szkolenie hybrydowe: teoria w domu, praktyka na placu. Zapisz się już dziś!'
  },
  EN: {
    title: 'Telescopic Handler Training UDT (I WJO) | MultiSerwis Poland',
    description: 'Get certified for telescopic loaders in Kutno, Poland. Online theory, UDT state exam. Highest pass rate in the region.',
    keywords: 'telescopic handler training, udt poland, loader certification, heavy machinery course',
    ogTitle: 'Get your Telescopic Loader License - Fast & Effective',
    ogDescription: 'Hybrid training: theory at home, practice on site. Sign up today!'
  },
  DE: {
    title: 'Teleskoplader Ausbildung UDT (I WJO) | MultiSerwis Polen',
    description: 'Zertifizierung für Teleskoplader in Kutno. Online-Theorie, staatliche UDT-Prüfung. Höchste Bestehensquote.',
    keywords: 'teleskoplader schulung, udt polen, staplerschein, baumaschinenkurs',
    ogTitle: 'Erhalten Sie Ihren Teleskoplader-Führerschein',
    ogDescription: 'Hybrides Training: Theorie zu Hause, Praxis vor Ort. Melden Sie sich heute an!'
  }
};

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Operator Wózków Widłowych (I WJO)',
    category: 'UDT',
    duration: '35h',
    price: '650 PLN',
    image: '/operator-wozki-widlowe.webp',
    isPopular: true,
    description: "Ucz się teorii w domu, przyjedź tylko na egzamin praktyczny. Oszczędź czas i pieniądze dzięki naszej platformie e-learningowej. Gwarantujemy materiały wideo 4K, testy próbne identyczne z państwowymi oraz 100% wsparcia instruktora."
  },
  {
    id: 'c2',
    title: 'Ładowarki Teleskopowe - Pełne Uprawnienia',
    category: 'UDT',
    duration: '40h',
    price: '850 PLN',
    image: '/ladowarki-teleskopowe.webp',
    isPopular: true,
    description: "Szkolenie na wielozadaniowe nośniki osprzętu. Najbardziej poszukiwane uprawnienia w budownictwie."
  },
  {
    id: 'c3',
    title: 'Uprawnienia Energetyczne G1 (Eksploatacja)',
    category: 'SEP',
    duration: '8h',
    price: '400 PLN',
    image: '/uprawnienia-energetyczne-g1.webp',
    description: "Kurs przygotowawczy do egzaminu kwalifikacyjnego na stanowisku Eksploatacji."
  },
  {
    id: 'c4',
    title: 'Suwnice i Wciągniki',
    category: 'UDT',
    duration: '24h',
    price: '600 PLN',
    image: '/suwnice-wciagniki.webp',
    description: "Obsługa suwnic sterowanych z poziomu roboczego oraz kabiny."
  }
];

export const MACHINES: Machine[] = [
  {
    id: 'm1',
    name: 'Manitou MRT 2150',
    type: 'Ładowarka Teleskopowa',
    specs: { height: '21m', capacity: '5000kg' },
    image: '/manitou-mrt-2150.webp',
  },
  {
    id: 'm2',
    name: 'Genie Z-45/25J',
    type: 'Podnośnik Przegubowy',
    specs: { height: '16m', weight: '6500kg' },
    image: '/genie-z-4525j.webp',
  },
  {
    id: 'm3',
    name: 'JCB 3CX',
    type: 'Koparko-ładowarka',
    specs: { weight: '8000kg', capacity: '1.2m³' },
    image: '/jcb-3cx.webp',
  }
];

export const MY_COURSES: UserCourse[] = [
  {
    id: 'uc1',
    courseId: 'c1',
    progress: 45,
    status: 'active',
    nextLesson: 'Bezpieczeństwo wymiany butli LPG',
  },
  {
    id: 'uc2',
    courseId: 'c3',
    progress: 100,
    status: 'completed',
    nextLesson: 'Egzamin zakończony',
  }
];

export const COURSE_CURRICULUM: Module[] = [
  // Operator Wózków Widłowych (c1)
  {
    id: 'c1m1',
    courseId: 'c1',
    title: 'Moduł 1: Budowa Wózka Widłowego',
    lessons: [
      { id: 'c1l1', title: 'Wprowadzenie i typy wózków', duration: '15:00', isCompleted: true, isLocked: false, type: 'video' },
      { id: 'c1l2', title: 'Układ napędowy i jezdny', duration: '22:30', isCompleted: true, isLocked: false, type: 'video' },
      { id: 'c1l3', title: 'Mechanizm podnoszenia', duration: '18:45', isCompleted: true, isLocked: false, type: 'video' },
    ]
  },
  {
    id: 'c1m2',
    courseId: 'c1',
    title: 'Moduł 2: Eksploatacja i Bezpieczeństwo',
    lessons: [
      { id: 'c1l4', title: 'Czynności przed rozpoczęciem pracy', duration: '12:00', isCompleted: true, isLocked: false, type: 'video' },
      { id: 'c1l5', title: 'Bezpieczeństwo wymiany butli LPG', duration: '25:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c1l6', title: 'Diagram udźwigu - czytanie wykresów', duration: '30:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c1l7', title: 'Test wiedzy - Moduł 2', duration: '15 pytań', isCompleted: false, isLocked: false, type: 'quiz', questions: [
        {
          id: 'q1',
          question: 'Jakie bezpieczeństwo jest najważniejsze przy wymianie butli LPG?',
          type: 'single',
          options: ['Bezpieczeństwo elektryczne', 'Bezpieczeństwo mechaniczne', 'Bezpieczeństwo chemiczne', 'Wszystkie wyżej wymienione'],
          correctAnswer: 3,
          explanation: 'Przy wymianie butli LPG wszystkie rodzaje bezpieczeństwa są ważne.'
        },
        {
          id: 'q2',
          question: 'Wybierz wszystkie czynności, które należy wykonać przed rozpoczęciem pracy:',
          type: 'multiple',
          options: ['Sprawdzić hamulce', 'Sprawdzić życzliwości operatora', 'Sprawdzić widoczność', 'Sprawdzić opony', 'Zapalić świecę'],
          correctAnswer: [0, 2, 3],
          explanation: 'Należy sprawdzić hamulce, widoczność i opony. Życzliwości i świece nie są częścią kontroli przedstartu.'
        },
        {
          id: 'q3',
          question: 'Opisz procedurę bezpiecznego zatrzymania wózka widłowego:',
          type: 'open',
          explanation: 'Prawidłowa odpowiedź powinna zawierać: redukcję prędkości, płynne hamowanie, obniżenie ładunku i wyłączenie silnika.'
        },
        {
          id: 'q4',
          question: 'Ile wynosi maksymalny kąt nachylenia terenu, na którym można pracować wózkiem widłowym?',
          type: 'single',
          options: ['5 stopni', '10 stopni', '15 stopni', '20 stopni'],
          correctAnswer: 1,
          explanation: 'Maksymalny kąt nachylenia to około 10 stopni.'
        }
      ]},
    ]
  },
  {
    id: 'c1m3',
    courseId: 'c1',
    title: 'Moduł 3: Dozór Techniczny (UDT)',
    lessons: [
      { id: 'c1l8', title: 'Przepisy prawne', duration: '20:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c1l9', title: 'Dokumentacja techniczno-ruchowa', duration: '15:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c1l10', title: 'Egzamin końcowy', duration: '20 pytań', isCompleted: false, isLocked: false, type: 'quiz', questions: [
        {
          id: 'eq1',
          question: 'Które przepisy prawne regulują obsługę wózków widłowych?',
          type: 'multiple',
          options: ['Kodeks pracy', 'Przepisy BHP', 'Rozporządzenie ministra', 'Ustawa o ochronie konkurencji'],
          correctAnswer: [0, 1, 2],
          explanation: 'Obsługę wózków widłowych regulują Kodeks pracy, przepisy BHP i rozporządzenia ministra.'
        },
        {
          id: 'eq2',
          question: 'Co zawiera dokumentacja techniczno-ruchowa wózka widłowego?',
          type: 'single',
          options: ['Tylko mapę tras', 'Dane techniczne, historię remontów i przeglądy', 'Tylko aktualne przeglądy UDT', 'Numer seryjny i kolor'],
          correctAnswer: 1,
          explanation: 'Dokumentacja techniczno-ruchowa zawiera dane techniczne, historię remontów i przeglądy.'
        },
        {
          id: 'eq3',
          question: 'Opisz rol inspektora UDT przy zatwierdzaniu wózka do pracy:',
          type: 'open',
          explanation: 'Inspektor UDT sprawdza stan techniczny, bezpieczeństwo i zgodność z normami. Wydaje zaświadczenie o przygodności.'
        },
        {
          id: 'eq4',
          question: 'Jaki jest okres ważności przeglądu UDT dla wózków widłowych?',
          type: 'single',
          options: ['6 miesięcy', '1 rok', '2 lata', '3 lata'],
          correctAnswer: 2,
          explanation: 'Przegląd UDT dla wózków widłowych jest ważny 2 lata.'
        },
        {
          id: 'eq5',
          question: 'Wybierz wszystkie dokumenty, które powinny towarzyszyć wózkowi widłowemu:',
          type: 'multiple',
          options: ['Dowód rejestracyjny', 'Kartę przeglądu okresowego', 'Zaświadczenie UDT', 'Kartę paliwa', 'Umowę leasingu'],
          correctAnswer: [1, 2],
          explanation: 'Wózkowi powinny towarzyszyć karta przeglądu okresowego i zaświadczenie UDT.'
        }
      ]},
    ]
  },
  // Ładowarki Teleskopowe (c2)
  {
    id: 'c2m1',
    courseId: 'c2',
    title: 'Moduł 1: Budowa i Funkcje',
    lessons: [
      { id: 'c2l1', title: 'Wprowadzenie do ładowarek teleskopowych', duration: '20:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c2l2', title: 'Układ hydrauliczny i teleskop', duration: '28:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c2l3', title: 'Wymienne osprzęty', duration: '22:00', isCompleted: false, isLocked: false, type: 'video' },
    ]
  },
  {
    id: 'c2m2',
    courseId: 'c2',
    title: 'Moduł 2: Obsługa i Bezpieczeństwo',
    lessons: [
      { id: 'c2l4', title: 'Zasady bezpiecznej pracy', duration: '18:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c2l5', title: 'Stabilność ładowarki', duration: '24:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c2l6', title: 'Praca na wysokości', duration: '26:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c2l7', title: 'Test praktyczny - symulacja', duration: '30 min', isCompleted: false, isLocked: false, type: 'test' },
    ]
  },
  {
    id: 'c2m3',
    courseId: 'c2',
    title: 'Moduł 3: Konserwacja',
    lessons: [
      { id: 'c2l8', title: 'Przeglądy okresowe', duration: '16:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c2l9', title: 'Typowe awarie i ich eliminacja', duration: '20:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c2l10', title: 'Egzamin końcowy', duration: '25 pytań', isCompleted: false, isLocked: false, type: 'quiz' },
    ]
  },
  // Uprawnienia Energetyczne G1 (c3)
  {
    id: 'c3m1',
    courseId: 'c3',
    title: 'Moduł 1: Podstawy Elektrotechniki',
    lessons: [
      { id: 'c3l1', title: 'Prawo Ohma i Kirchhoffa', duration: '25:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c3l2', title: 'Obwody prądu stałego i zmiennego', duration: '30:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c3l3', title: 'Bezpieczeństwo pracy z prądem', duration: '35:00', isCompleted: false, isLocked: false, type: 'video' },
    ]
  },
  {
    id: 'c3m2',
    courseId: 'c3',
    title: 'Moduł 2: Urządzenia i Instalacje',
    lessons: [
      { id: 'c3l4', title: 'Rozdzielnice i tablice', duration: '28:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c3l5', title: 'Zabezpieczenia nadprądowe', duration: '32:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c3l6', title: 'Ochrona przeciwporażeniowa', duration: '40:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c3l7', title: 'Test wiedzy - Moduł 2', duration: '20 pytań', isCompleted: false, isLocked: false, type: 'quiz' },
    ]
  },
  {
    id: 'c3m3',
    courseId: 'c3',
    title: 'Moduł 3: Eksploatacja',
    lessons: [
      { id: 'c3l8', title: 'Przepisy i normy', duration: '22:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c3l9', title: 'Pomiary elektryczne', duration: '35:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c3l10', title: 'Dokumentacja eksploatacyjna', duration: '18:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c3l11', title: 'Egzamin końcowy', duration: '30 pytań', isCompleted: false, isLocked: false, type: 'quiz' },
    ]
  },
  // Suwnice i Wciągniki (c4)
  {
    id: 'c4m1',
    courseId: 'c4',
    title: 'Moduł 1: Budowa Suwnic',
    lessons: [
      { id: 'c4l1', title: 'Typy i konstrukcja suwnic', duration: '24:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c4l2', title: 'Mechanizmy podnoszenia', duration: '28:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c4l3', title: 'Wciągniki i zawiesia', duration: '20:00', isCompleted: false, isLocked: false, type: 'video' },
    ]
  },
  {
    id: 'c4m2',
    courseId: 'c4',
    title: 'Moduł 2: Obsługa Suwnic',
    lessons: [
      { id: 'c4l4', title: 'Sterowanie i manewrowanie', duration: '26:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c4l5', title: 'Bezpieczeństwo przy podnoszeniu', duration: '30:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c4l6', title: 'Sygnały i komunikacja', duration: '16:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c4l7', title: 'Test praktyczny', duration: '25 min', isCompleted: false, isLocked: false, type: 'test' },
    ]
  },
  {
    id: 'c4m3',
    courseId: 'c4',
    title: 'Moduł 3: Konserwacja i UDT',
    lessons: [
      { id: 'c4l8', title: 'Przeglądy techniczne', duration: '22:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c4l9', title: 'Przepisy UDT dla dźwignic', duration: '28:00', isCompleted: false, isLocked: false, type: 'video' },
      { id: 'c4l10', title: 'Egzamin końcowy', duration: '25 pytań', isCompleted: false, isLocked: false, type: 'quiz' },
    ]
  }
];

export const ADMIN_STUDENTS: Student[] = [
  // Operator Wózków Widłowych (I WJO) - c1 ma 10 lekcji
  { id: 's1', name: 'Adam Nowak', email: 'adam.n@firma.pl', company: 'LogiTrans Sp. z o.o.', course: 'c1', progress: 85, expirationDays: 12, status: 'active', 
    completedLessons: ['c1l1', 'c1l2', 'c1l3', 'c1l4', 'c1l5', 'c1l6', 'c1l7', 'c1l8', 'c1l9'] }, // 9/10
  { id: 's1-c3', name: 'Adam Nowak', email: 'adam.n@firma.pl', company: 'LogiTrans Sp. z o.o.', course: 'c3', progress: 35, expirationDays: 45, status: 'active', 
    completedLessons: ['c3l1', 'c3l2', 'c3l3'] }, // Adam ma też kurs SEP
  { id: 's3', name: 'Anna Wiśniewska', email: 'a.wisniewska@logistics.com', company: 'DHL Supply Chain', course: 'c1', progress: 95, expirationDays: 2, status: 'warning', 
    completedLessons: ['c1l1', 'c1l2', 'c1l3', 'c1l4', 'c1l5', 'c1l6', 'c1l7', 'c1l8', 'c1l9'] }, // 9/10 - brakuje egzaminu
  { id: 's6', name: 'Tomasz Lewandowski', email: 't.lewandowski@magazyn.pl', company: 'Amazon Fulfillment Poland', course: 'c1', progress: 45, expirationDays: 28, status: 'active', 
    completedLessons: ['c1l1', 'c1l2', 'c1l3', 'c1l4', 'c1l5'] }, // 5/10
  { id: 's7', name: 'Katarzyna Kaczmarek', email: 'k.kaczmarek@transport.eu', company: 'Trans-Evropa Sp. z o.o.', course: 'c1', progress: 100, expirationDays: 90, status: 'active', 
    completedLessons: ['c1l1', 'c1l2', 'c1l3', 'c1l4', 'c1l5', 'c1l6', 'c1l7', 'c1l8', 'c1l9', 'c1l10'] }, // 10/10
  { id: 's7-c2', name: 'Katarzyna Kaczmarek', email: 'k.kaczmarek@transport.eu', company: 'Trans-Evropa Sp. z o.o.', course: 'c2', progress: 60, expirationDays: 85, status: 'active', 
    completedLessons: ['c2l1', 'c2l2', 'c2l3', 'c2l4', 'c2l5', 'c2l6'] }, // Katarzyna ma też ładowarki
  { id: 's8', name: 'Michał Szymański', email: 'm.szymanski@logistyka.com', company: 'LogiTrans Sp. z o.o.', course: 'c1', progress: 30, expirationDays: 55, status: 'active', 
    completedLessons: ['c1l1', 'c1l2', 'c1l3'] }, // 3/10 - zmieniono z Raben na LogiTrans
  
  // Ładowarki Teleskopowe - Pełne Uprawnienia - c2 ma 10 lekcji
  { id: 's2', name: 'Krzysztof Kowalczyk', email: 'k.kowalczyk@budimex.pl', company: 'Budimex S.A.', course: 'c2', progress: 20, expirationDays: 45, status: 'active', 
    completedLessons: ['c2l1', 'c2l2'] }, // 2/10
  { id: 's2-c4', name: 'Krzysztof Kowalczyk', email: 'k.kowalczyk@budimex.pl', company: 'Budimex S.A.', course: 'c4', progress: 15, expirationDays: 60, status: 'active', 
    completedLessons: ['c4l1'] }, // Krzysztof ma też suwnice
  { id: 's9', name: 'Paweł Woźniak', email: 'p.wozniak@budowa.pl', company: 'DHL Supply Chain', course: 'c2', progress: 70, expirationDays: 18, status: 'active', 
    completedLessons: ['c2l1', 'c2l2', 'c2l3', 'c2l4', 'c2l5', 'c2l6', 'c2l7'] }, // 7/10 - zmieniono ze Skanska na DHL
  { id: 's10', name: 'Magdalena Dąbrowska', email: 'm.dabrowska@construction.eu', company: 'LogiTrans Sp. z o.o.', course: 'c2', progress: 55, expirationDays: 34, status: 'active', 
    completedLessons: ['c2l1', 'c2l2', 'c2l3', 'c2l4', 'c2l5'] }, // 5/10 - zmieniono z Hochtief na LogiTrans
  { id: 's11', name: 'Bartosz Kamiński', email: 'b.kaminski@sprzet.com', company: 'Trans-Evropa Sp. z o.o.', course: 'c2', progress: 100, expirationDays: 75, status: 'active', 
    completedLessons: ['c2l1', 'c2l2', 'c2l3', 'c2l4', 'c2l5', 'c2l6', 'c2l7', 'c2l8', 'c2l9', 'c2l10'] }, // 10/10 - zmieniono z Ramirent na Trans-Evropa
  { id: 's11-c1', name: 'Bartosz Kamiński', email: 'b.kaminski@sprzet.com', company: 'Trans-Evropa Sp. z o.o.', course: 'c1', progress: 100, expirationDays: 120, status: 'active', 
    completedLessons: ['c1l1', 'c1l2', 'c1l3', 'c1l4', 'c1l5', 'c1l6', 'c1l7', 'c1l8', 'c1l9', 'c1l10'] }, // Bartosz ma też wózki
  
  // Uprawnienia Energetyczne G1 (Eksploatacja) - c3 ma 11 lekcji
  { id: 's4', name: 'Piotr Zieliński', email: 'p.zielinski@serwis.pl', company: 'DHL Supply Chain', course: 'c3', progress: 0, expirationDays: 60, status: 'active', 
    completedLessons: [] }, // 0/11 - zmieniono z Elektromontaż na DHL
  { id: 's12', name: 'Łukasz Jankowski', email: 'l.jankowski@elektro.pl', company: 'Amazon Fulfillment Poland', course: 'c3', progress: 80, expirationDays: 25, status: 'active', 
    completedLessons: ['c3l1', 'c3l2', 'c3l3', 'c3l4', 'c3l5', 'c3l6', 'c3l7', 'c3l8', 'c3l9'] }, // 9/11 - zmieniono z Energa na Amazon
  { id: 's13', name: 'Joanna Mazur', email: 'j.mazur@energetyka.com', company: 'Budimex S.A.', course: 'c3', progress: 40, expirationDays: 48, status: 'active', 
    completedLessons: ['c3l1', 'c3l2', 'c3l3', 'c3l4'] }, // 4/11 - zmieniono z PGE na Budimex
  { id: 's14', name: 'Robert Wieczorek', email: 'r.wieczorek@zakład.pl', company: 'Tauron Dystrybucja', course: 'c3', progress: 90, expirationDays: 3, status: 'warning', 
    completedLessons: ['c3l1', 'c3l2', 'c3l3', 'c3l4', 'c3l5', 'c3l6', 'c3l7', 'c3l8', 'c3l9', 'c3l10'] }, // 10/11 - brakuje egzaminu
  
  // Suwnice i Wciągniki - c4 ma 10 lekcji
  { id: 's15', name: 'Grzegorz Piotrowski', email: 'g.piotrowski@przemysl.pl', company: 'ArcelorMittal Poland', course: 'c4', progress: 65, expirationDays: 40, status: 'active', 
    completedLessons: ['c4l1', 'c4l2', 'c4l3', 'c4l4', 'c4l5', 'c4l6'] }, // 6/10
  { id: 's16', name: 'Ewa Grabowska', email: 'e.grabowska@fabryka.com', company: 'KGHM Polska Miedź', course: 'c4', progress: 100, expirationDays: 120, status: 'active', 
    completedLessons: ['c4l1', 'c4l2', 'c4l3', 'c4l4', 'c4l5', 'c4l6', 'c4l7', 'c4l8', 'c4l9', 'c4l10'] }, // 10/10
  { id: 's16-c3', name: 'Ewa Grabowska', email: 'e.grabowska@fabryka.com', company: 'KGHM Polska Miedź', course: 'c3', progress: 55, expirationDays: 100, status: 'active', 
    completedLessons: ['c3l1', 'c3l2', 'c3l3', 'c3l4', 'c3l5', 'c3l6'] }, // Ewa ma też SEP
  { id: 's17', name: 'Daniel Król', email: 'd.krol@hala.eu', company: 'Volkswagen Poznań', course: 'c4', progress: 25, expirationDays: 50, status: 'active', 
    completedLessons: ['c4l1', 'c4l2'] }, // 2/10
  { id: 's18', name: 'Monika Sikora', email: 'm.sikora@magazyn.pl', company: 'Indywidualny', course: 'c4', progress: 0, expirationDays: 0, status: 'expired', 
    completedLessons: [] }, // 0/10
];

export const POPULARITY_DATA = [
  { name: 'Wózki Widłowe', value: 45, color: '#003d4d' }, // brand-primary
  { name: 'Ładowarki', value: 30, color: '#ff6600' },    // brand-accent
  { name: 'Koparki', value: 15, color: '#005c73' },      // brand-secondary
  { name: 'SEP', value: 10, color: '#94a3b8' },          // slate-400
];