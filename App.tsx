import React, { useState, useEffect } from 'react';
import { ViewState, Course, Machine, Language, SEOMetadata } from './types';
import { Layout } from './components/Layout';
import { COURSES, MACHINES, MY_COURSES, COURSE_CURRICULUM, ADMIN_STUDENTS, POPULARITY_DATA, TRANSLATIONS, SEO_DATA } from './constants';
import { 
  ChevronRight, 
  CheckCircle, 
  Star, 
  Play, 
  Download, 
  ShieldCheck, 
  Wrench, 
  Users, 
  Trophy,
  GraduationCap,
  Truck,
  MonitorPlay,
  Settings,
  Calendar,
  MapPin,
  ArrowRight,
  PlayCircle,
  Lock,
  FileText,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Menu,
  BarChart3,
  MoreVertical,
  AlertCircle,
  Printer,
  Search,
  BookOpen,
  Clock,
  Award,
  Phone,
  X,
  Trash2,
  Edit,
  Eye
} from 'lucide-react';

const App = () => {
  const [currentView, setView] = useState<ViewState>('HOME');
  const [language, setLanguage] = useState<Language>('PL');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(null);
  const [catalogCategory, setCatalogCategory] = useState<string>('Wszystkie');
  const [currentLessonId, setCurrentLessonId] = useState<string>('l5');
  const [isFromAdmin, setIsFromAdmin] = useState(false);
  const [adminEditingCourseId, setAdminEditingCourseId] = useState<string | null>(null);
  const [viewingStudentId, setViewingStudentId] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [adminActiveTab, setAdminActiveTab] = useState<'dashboard' | 'courses' | 'students'>('dashboard');
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number | number[] | string }>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);

  // --- SEO LOGIC ---
  const [currentSEO, setCurrentSEO] = useState<SEOMetadata | null>(null);

  // Reset accordion when course changes
  useEffect(() => {
    setOpenAccordionIndex(null);
  }, [selectedCourseId]);

  useEffect(() => {
    // Basic Title update
    document.title = `MultiSerwis [${language}] - ${currentView}`;

    // Update Simulated SEO Data
    if (currentView === 'CATALOG' || (currentView === 'HOME' && language)) {
       // We'll just use the Telescopic Loader data as the active "example" SEO when in Catalog/Home for this prototype
       // In a real app, this would route based on the specific page/slug
       setCurrentSEO(SEO_DATA[language]);
    }
  }, [currentView, language]);

  const t = TRANSLATIONS[language];

  // Get program details for each course
  const getCourseProgram = (courseId: string) => {
    const programs: { [key: string]: { title: string; details: string[] }[] } = {
      'c1': [
        {
          title: 'Bezpieczeństwo pracy',
          details: [
            'BHP w zakresie obsługi wózków widłowych',
            'Zasady poruszania się po placu manewrowym i w magazynie',
            'Bezpieczne techniki podnoszenia i transportu ładunków',
            'Procedury awaryjne i zasady postępowania w sytuacjach niebezpiecznych',
            'Środki ochrony indywidualnej operatora'
          ]
        },
        {
          title: 'Obsługa maszyn',
          details: [
            'Budowa i zasada działania wózka widłowego',
            'Codzienne czynności kontrolne przed rozpoczęciem pracy',
            'Prawidłowa technika jazdy i manewrowania',
            'Obsługa układu hydraulicznego i mechanizmu podnoszenia',
            'Wymiana butli gazowych (dla wózków LPG)'
          ]
        },
        {
          title: 'Przepisy UDT',
          details: [
            'Ustawa o dozorze technicznym - zakres i interpretacja',
            'Wymagania techniczne dla wózków jezdniowych',
            'Przeglądy okresowe i dokumentacja eksploatacyjna',
            'Obowiązki operatora i pracodawcy według przepisów UDT',
            'Odpowiedzialność prawna w przypadku wykroczeń'
          ]
        },
        {
          title: 'Praktyka na placu manewrowym',
          details: [
            'Jazda slalomem i jazda tyłem',
            'Precyzyjne ustawianie wideł i manipulacja ładunkiem',
            'Układanie palet na różnych wysokościach',
            'Jazda z ładunkiem po pochylni i nierównym terenie',
            'Wykonanie parkingu i bezpieczne pozostawienie wózka',
            'Praktyka trwa minimum 20 godzin pod okiem instruktora'
          ]
        },
        {
          title: 'Przygotowanie do egzaminu',
          details: [
            'Omówienie struktury egzaminu państwowego UDT',
            'Test próbny z pytań teoretycznych (identyczny z państwowym)',
            'Symulacja egzaminu praktycznego',
            'Najczęstsze błędy i jak ich unikać',
            'Wskazówki dotyczące dokumentacji egzaminacyjnej'
          ]
        }
      ],
      'c2': [
        {
          title: 'Bezpieczeństwo pracy',
          details: [
            'BHP przy pracy z ładowarkami teleskopowymi',
            'Bezpieczna praca na wysokościach',
            'Ocena warunków gruntu i stabilności maszyny',
            'Zasady bezpiecznej wymiany osprzętu',
            'Procedury awaryjne i ewakuacja z kabiny'
          ]
        },
        {
          title: 'Obsługa maszyn',
          details: [
            'Budowa i elementy ładowarki teleskopowej',
            'System hydrauliczny i sterowanie proporcjonalne',
            'Obsługa wysięgnika teleskopowego i mechanizmów',
            'Montaż i demontaż różnych rodzajów osprzętu (widelce, łyżka, kosz)',
            'Codzienne kontrole i konserwacja podstawowa'
          ]
        },
        {
          title: 'Przepisy UDT',
          details: [
            'Przepisy UDT dla wielozadaniowych nośników osprzętu',
            'Wymagania dla operatorów ładowarek teleskopowych',
            'Dokumentacja techniczna i książka maszyny',
            'Przeglądy i badania techniczne',
            'Certyfikacja osprzętu zamiennego'
          ]
        },
        {
          title: 'Praktyka na placu manewrowym',
          details: [
            'Jazda z wysięgnikiem w różnych pozycjach',
            'Praca na wysokościach z koszem osobowym',
            'Załadunek i manipulacja materiałami budowlanymi',
            'Precyzyjna praca łyżką przy robotach ziemnych',
            'Transport ładunków na terenie nierównym i pochyłym',
            'Szkolenie trwa 40 godzin, w tym 30 godzin praktyki'
          ]
        },
        {
          title: 'Przygotowanie do egzaminu',
          details: [
            'Testy przykładowe zgodne z wymaganiami UDT',
            'Symulacja egzaminu praktycznego z każdym rodzajem osprzętu',
            'Przegląd najważniejszych zagadnień technicznych',
            'Analiza typowych błędów egzaminacyjnych',
            'Wsparcie instruktora do dnia egzaminu'
          ]
        }
      ],
      'c3': [
        {
          title: 'Bezpieczeństwo pracy',
          details: [
            'Podstawy BHP w energetyce',
            'Bezpieczna praca przy urządzeniach elektrycznych',
            'Pierwsza pomoc przy porażeniu prądem',
            'Zasady pracy w strefach zagrożonych',
            'Środki ochrony indywidualnej w energetyce'
          ]
        },
        {
          title: 'Obsługa urządzeń',
          details: [
            'Obsługa tablic rozdzielczych i aparatury sterowniczej',
            'Identyfikacja i lokalizacja usterek',
            'Podstawowe pomiary elektryczne',
            'Zasady konserwacji urządzeń elektrycznych',
            'Protokoły eksploatacji i dokumentacja'
          ]
        },
        {
          title: 'Przepisy elektroenergetyczne',
          details: [
            'Przepisy eksploatacji urządzeń elektroenergetycznych',
            'Normy i standardy branżowe SEP',
            'Wymagania dla personelu eksploatacyjnego',
            'Dokumentacja techniczna i eksploatacyjna',
            'Odpowiedzialność prawna i ubezpieczenia'
          ]
        },
        {
          title: 'Teoria elektryczności',
          details: [
            'Podstawowe pojęcia i prawa elektryczności',
            'Rodzaje prądów i napięć',
            'Układy jednofazowe i trójfazowe',
            'Ochrona przeciwporażeniowa',
            'Interpretacja schematów elektrycznych'
          ]
        },
        {
          title: 'Przygotowanie do egzaminu',
          details: [
            'Omówienie wymagań egzaminu kwalifikacyjnego SEP',
            'Testy próbne z zakresu G1',
            'Analiza najczęstszych pytań egzaminacyjnych',
            'Powtórka kluczowych zagadnień',
            'Wskazówki odnośnie przebiegu egzaminu'
          ]
        }
      ],
      'c4': [
        {
          title: 'Bezpieczeństwo pracy',
          details: [
            'BHP przy obsłudze suwnic i wciągników',
            'Bezpieczne techniki podnoszenia ciężarów',
            'Sygnalizacja i komunikacja z nawiązywaczem',
            'Zasady podczepiania i odczepiania ładunków',
            'Procedury awaryjne przy uszkodzeniu urządzenia'
          ]
        },
        {
          title: 'Obsługa maszyn',
          details: [
            'Budowa i rodzaje suwnic (pomostowe, bramowe, obrotowe)',
            'Obsługa wciągników elektrycznych i ręcznych',
            'Sterowanie z poziomu roboczego i z kabiny',
            'Obsługa mechanizmów jazdy i podnoszenia',
            'Kontrola stanu technicznego przed rozpoczęciem pracy'
          ]
        },
        {
          title: 'Przepisy UDT',
          details: [
            'Przepisy dozoru technicznego dla dźwignic',
            'Wymagania dla operatorów suwnic kategorii II',
            'Dokumentacja eksploatacyjna i badania techniczne',
            'Przeglądy okresowe i roczne',
            'Obowiązki operatora zgodnie z przepisami UDT'
          ]
        },
        {
          title: 'Praktyka na hali produkcyjnej',
          details: [
            'Jazda suwnicą z ładunkiem i bez ładunku',
            'Precyzyjne ustawienie ładunku w wyznaczonych miejscach',
            'Obsługa różnych rodzajów zawiesi i haków',
            'Współpraca z nawiązywaczem - sygnały i komunikacja',
            'Wykonanie manewrów awaryjnych',
            'Szkolenie praktyczne trwa minimum 16 godzin'
          ]
        },
        {
          title: 'Przygotowanie do egzaminu',
          details: [
            'Struktura egzaminu UDT dla operatorów dźwignic',
            'Testy próbne - część teoretyczna',
            'Symulacja części praktycznej egzaminu',
            'Omówienie typowych błędów na egzaminie',
            'Dokumentacja wymagana w dniu egzaminu'
          ]
        }
      ]
    };

    return programs[courseId] || programs['c1'];
  };

  // --- SUB-COMPONENTS ---

  const SectionHeader = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
    <div className="mb-12 text-center">
      {subtitle && <span className="text-brand-accent font-bold uppercase tracking-widest text-xs mb-2 block">{subtitle}</span>}
      <h2 className={`text-3xl md:text-4xl font-heading font-extrabold uppercase relative inline-block ${light ? 'text-white' : 'text-brand-primary'}`}>
        {title}
        <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-brand-accent"></span>
      </h2>
    </div>
  );

  const HomeView = () => (
    <div className="animate-fade-in font-body">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[85vh] min-h-[600px] flex items-center bg-brand-dark overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}hero.webp`}
            alt="Workers with UDT Equipment" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
              <span className="text-white text-xs font-bold uppercase tracking-wider">{t.hero.badge}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-black text-white leading-[1.1] mb-6">
              {t.hero.title} <br/>
              <span className="text-brand-accent">{t.hero.subtitle}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              {t.hero.desc}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setView('CATALOG')}
                className="px-8 py-4 bg-brand-accent hover:bg-brand-accentHover text-white font-bold uppercase tracking-wider rounded-sm shadow-lg shadow-brand-accent/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                {t.hero.cta1} <ArrowRight size={20}/>
              </button>
              <button 
                onClick={() => setView('SERVICES')}
                className="px-8 py-4 border-2 border-slate-300 text-white hover:bg-white hover:text-brand-dark font-bold uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2"
              >
                <Wrench size={20}/> {t.hero.cta2}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SOCIAL PROOF */}
      <div className="bg-brand-primary border-y border-brand-secondary">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            
            {/* Item 1 */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left md:border-r border-brand-secondary/50 last:border-0 md:pr-8">
              <Users size={40} className="text-brand-accent mb-4" />
              <div className="text-3xl md:text-4xl font-heading font-black text-white mb-1">5000+</div>
              <div className="text-sm uppercase tracking-widest text-slate-300 font-semibold">Przeszkolonych Osób</div>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left md:border-r border-brand-secondary/50 last:border-0 md:pr-8">
              <BookOpen size={40} className="text-brand-accent mb-4" />
              <div className="text-3xl md:text-4xl font-heading font-black text-white mb-1">40+</div>
              <div className="text-sm uppercase tracking-widest text-slate-300 font-semibold">Dostępnych Szkoleń</div>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left md:border-r border-brand-secondary/50 last:border-0 md:pr-8">
              <Clock size={40} className="text-brand-accent mb-4" />
              <div className="text-3xl md:text-4xl font-heading font-black text-white mb-1">15 Lat</div>
              <div className="text-sm uppercase tracking-widest text-slate-300 font-semibold">Doświadczenia</div>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <Award size={40} className="text-brand-accent mb-4" />
              <div className="text-3xl md:text-4xl font-heading font-black text-white mb-1">98%</div>
              <div className="text-sm uppercase tracking-widest text-slate-300 font-semibold">Zdawalność Egzaminów</div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. SEKCJA SZKOLEŃ (GRID) */}
      <div className="py-24 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeader title="Najpopularniejsze Szkolenia" subtitle="Rozwiń swoją karierę" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Wózki Widłowe (Updated Copy) */}
            <div 
              onClick={() => {
                setSelectedCourseId('c1');
                setView('COURSE_DETAIL');
              }}
              className="group bg-white rounded-sm shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 right-4 z-20 bg-green-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide flex items-center gap-1 shadow-lg">
                  <MonitorPlay size={12} /> Dostępna Teoria Online
                </div>
                <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-brand-dark/0 transition-colors z-10"></div>
                <img 
                  src={`${import.meta.env.BASE_URL}operator-wozki-widlowe.webp`} 
                  alt="Wózki Widłowe" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-heading font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Wózki Widłowe (I WJO)</h3>
                <p className="text-slate-600 text-base mb-6 leading-relaxed">
                   {/* Specific Sales Copy Highlight */}
                   <span className="font-bold text-brand-primary block mb-2">
                     Ucz się teorii w domu, przyjedź tylko na egzamin praktyczny!
                   </span>
                   Oszczędź czas i pieniądze. Dzięki platformie e-learningowej przyswoisz wiedzę w domowym zaciszu. 100% wsparcia instruktora.
                </p>
                <div className="flex items-center text-brand-accent font-bold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                  Zobacz szczegóły <ChevronRight size={16} className="ml-1"/>
                </div>
              </div>
            </div>

            {/* Card 2: Ładowarki */}
            <div 
              onClick={() => {
                setSelectedCourseId('c2');
                setView('COURSE_DETAIL');
              }}
              className="group bg-white rounded-sm shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 right-4 z-20 bg-green-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide flex items-center gap-1 shadow-lg">
                  <MonitorPlay size={12} /> Dostępna Teoria Online
                </div>
                <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-brand-dark/0 transition-colors z-10"></div>
                <img 
                  src={`${import.meta.env.BASE_URL}ladowarki-teleskopowe.webp`} 
                  alt="Ładowarki Teleskopowe" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-heading font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Ładowarki Teleskopowe</h3>
                <p className="text-slate-600 text-base mb-6 leading-relaxed">
                  Szkolenie na wielozadaniowe nośniki osprzętu. Najbardziej poszukiwane uprawnienia w budownictwie.
                </p>
                <div className="flex items-center text-brand-accent font-bold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                  Zobacz szczegóły <ChevronRight size={16} className="ml-1"/>
                </div>
              </div>
            </div>

            {/* Card 3: Koparki */}
            <div 
              onClick={() => {
                setSelectedCourseId('c3');
                setView('COURSE_DETAIL');
              }}
              className="group bg-white rounded-sm shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 right-4 z-20 bg-brand-accent text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide flex items-center gap-1 shadow-lg">
                   Stacjonarnie
                </div>
                <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-brand-dark/0 transition-colors z-10"></div>
                <img 
                  src={`${import.meta.env.BASE_URL}koparki.webp`} 
                  alt="Koparki" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-heading font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">Koparko-Ładowarki</h3>
                <p className="text-slate-600 text-base mb-6 leading-relaxed">
                  Obsługa maszyn do robót ziemnych kl. III. Praktyka na placu manewrowym w Kutnie.
                </p>
                <div className="flex items-center text-brand-accent font-bold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                  Zobacz szczegóły <ChevronRight size={16} className="ml-1"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SEKCJA USŁUG */}
      <div className="py-24 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full -z-0"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-accent/5 rounded-tr-full -z-0"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <SectionHeader title="Usługi dla Przemysłu" subtitle="Kompleksowe wsparcie" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Wynajem */}
            <div 
              onClick={() => setView('RENTALS')}
              className="flex flex-col md:flex-row bg-slate-50 rounded-sm overflow-hidden border border-slate-100 group cursor-pointer hover:shadow-xl transition-all"
            >
              <div className="md:w-2/5 relative min-h-[200px]">
                <img 
                  src={`${import.meta.env.BASE_URL}wynajem-maszyn.webp`} 
                  alt="Wynajem" 
                  className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="p-8 md:w-3/5 flex flex-col justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-brand-accent">
                   <Truck size={24} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-brand-dark mb-2">Wynajem Maszyn</h3>
                <p className="text-slate-600 mb-6 text-base">
                  Flota ładowarek teleskopowych i podnośników koszowych dostępna od ręki. Krótki i długi termin.
                </p>
                <span className="text-brand-dark font-bold text-sm uppercase underline decoration-brand-accent decoration-2 underline-offset-4 group-hover:text-brand-accent transition-colors">
                  Zobacz dostępny sprzęt
                </span>
              </div>
            </div>

            {/* Konserwacja */}
            <div 
               onClick={() => setView('SERVICES')}
               className="flex flex-col md:flex-row bg-slate-50 rounded-sm overflow-hidden border border-slate-100 group cursor-pointer hover:shadow-xl transition-all"
            >
              <div className="md:w-2/5 relative min-h-[200px]">
                <img 
                  src={`${import.meta.env.BASE_URL}serwis-i-koserwacja.webp`} 
                  alt="Serwis" 
                  className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="p-8 md:w-3/5 flex flex-col justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-brand-secondary">
                   <Settings size={24} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-brand-dark mb-2">Serwis i Konserwacja</h3>
                <p className="text-slate-600 mb-6 text-base">
                  Przeglądy okresowe UDT, resursy, naprawy bieżące. Mobilny serwis z dojazdem do klienta.
                </p>
                <span className="text-brand-dark font-bold text-sm uppercase underline decoration-brand-secondary decoration-2 underline-offset-4 group-hover:text-brand-secondary transition-colors">
                  Umów serwis
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. SEO FOOTER */}
      <div className="bg-slate-100 border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-heading font-bold text-brand-primary mb-6">
                Profesjonalne Centrum Szkoleniowe MultiSerwis
              </h2>
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                <p>
                  Jesteśmy liderem w branży szkoleniowej w regionie centralnej Polski. Oferujemy certyfikowane 
                  <strong className="text-slate-800"> Szkolenia UDT w Kutnie</strong> oraz okolicach. Naszą misją jest dostarczanie 
                  najwyższej jakości edukacji zawodowej, łączącej teorię z praktyką.
                </p>
                <p>
                  Szukasz szkolenia na maszyny budowlane? Nasze <strong className="text-slate-800">szkolenie operatora koparki</strong> oraz 
                  ładowarki teleskopowej przygotuje Cię do egzaminu państwowego z najwyższą skutecznością. Posiadamy własny plac manewrowy 
                  oraz nowoczesne sale wykładowe.
                </p>
                <p>
                  Dla wygody naszych klientów wprowadziliśmy również szkolenia hybrydowe. Teoria odbywa się online, 
                  a zajęcia praktyczne realizujemy na naszym sprzęcie. Sprawdź również naszą ofertę wynajmu podnośników.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                  <MapPin size={16} className="text-brand-accent"/> Kutno i okolice
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                  <Calendar size={16} className="text-brand-accent"/> Terminy co tydzień
                </div>
              </div>
            </div>
            
            <div className="relative">
               <div className="absolute -inset-4 bg-brand-accent/10 rounded-full blur-xl"></div>
               <div className="relative bg-white p-8 rounded-sm shadow-lg border-l-4 border-brand-accent">
                 <h3 className="font-heading font-bold text-lg mb-4 text-brand-dark">Dlaczego warto wybrać MultiSerwis?</h3>
                 <ul className="space-y-3">
                   {[
                     "Własny park maszynowy i hala szkoleniowa",
                     "Załatwiamy wszelkie formalności z UDT",
                     "Materiały dydaktyczne w cenie kursu",
                     "Elastyczne godziny zajęć praktycznych",
                     "Certyfikat w języku angielskim (opcja)"
                   ].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 text-base text-slate-700">
                       <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> {item}
                     </li>
                   ))}
                 </ul>
               </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );

  const CatalogView = () => {
    const categoryMap: { [key: string]: string } = {
      'Wszystkie': 'ALL',
      'Urządzenia UDT': 'UDT',
      'Uprawnienia SEP': 'SEP',
      'BHP i PPOŻ': 'BHP',
      'Maszyny Budowlane': 'Inne'
    };
    
    const filteredCourses = catalogCategory === 'Wszystkie' 
      ? COURSES 
      : COURSES.filter(course => course.category === categoryMap[catalogCategory]);
    
    return (
    <div className="py-12 bg-brand-surface animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader title="Katalog Szkoleń" subtitle="Podnieś swoje kwalifikacje" />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="col-span-1 hidden lg:block space-y-8">
            <div className="bg-white p-6 rounded-sm shadow-sm">
              <h3 className="font-heading font-bold text-lg mb-4 text-brand-dark">Kategorie</h3>
              <ul className="space-y-2 text-base text-slate-600">
                {['Wszystkie', 'Urządzenia UDT', 'Uprawnienia SEP', 'BHP i PPOŻ', 'Maszyny Budowlane'].map((cat, idx) => (
                  <li 
                    key={idx} 
                    onClick={() => setCatalogCategory(cat)}
                    className={`cursor-pointer hover:text-brand-accent transition-colors ${catalogCategory === cat ? 'text-brand-accent font-bold' : ''}`}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-primary p-6 rounded-sm text-white">
              <h3 className="font-heading font-bold text-lg mb-2">Potrzebujesz szkolenia dla firmy?</h3>
              <p className="text-base text-slate-300 mb-4">Przygotujemy indywidualną ofertę dla Twoich pracowników.</p>
              <button onClick={() => setCurrentView('contact')} className="w-full py-2 bg-brand-accent text-white text-sm font-bold uppercase rounded-sm hover:bg-brand-accentHover transition-colors">Zapytaj o ofertę</button>
            </div>
          </div>

          {/* Course Grid */}
          <div className="col-span-1 lg:col-span-3">
            {filteredCourses.length === 0 ? (
              <div className="bg-white rounded-sm shadow-sm p-12 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap size={40} className="text-slate-400" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-brand-dark mb-3">
                  Brak szkoleń w tej kategorii
                </h3>
                <p className="text-slate-600 mb-6">
                  W tym momencie nie mamy dostępnych szkoleń w kategorii "{catalogCategory}".
                </p>
                <button 
                  onClick={() => setCatalogCategory('Wszystkie')}
                  className="px-6 py-3 bg-brand-accent text-white font-bold uppercase text-sm rounded-sm hover:bg-brand-accentHover transition-colors"
                >
                  Zobacz wszystkie szkolenia
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                  <div 
                    key={course.id} 
                    onClick={() => {
                      setSelectedCourseId(course.id);
                      setView('COURSE_DETAIL');
                    }}
                    className="bg-white rounded-sm shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group border border-slate-100 cursor-pointer">
                    <div className="relative aspect-[3/2] overflow-hidden">
                       <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/0 transition-colors z-10"></div>
                       <img src={course.image} alt={course.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                       {course.isPopular && <span className="absolute top-4 right-4 z-20 bg-brand-accent text-white text-xs font-bold px-3 py-1 uppercase rounded-sm shadow-md">Popularny</span>}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-xs font-bold text-brand-secondary uppercase mb-2">{course.category}</div>
                      <h3 className="text-lg font-heading font-bold text-brand-dark mb-4 leading-snug group-hover:text-brand-accent transition-colors">{course.title}</h3>
                      
                      {/* Enhanced Description Area */}
                      {course.description && (
                         <p className="text-base text-slate-600 mb-4 line-clamp-3">
                            {course.description}
                         </p>
                      )}

                      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-500 uppercase">Cena</span>
                          <span className="text-lg font-bold text-brand-primary">{course.price}</span>
                        </div>
                        <div className="flex flex-col text-right">
                           <span className="text-xs text-slate-500 uppercase">Czas trwania</span>
                           <span className="text-sm font-bold text-slate-700">{course.duration}</span>
                        </div>
                      </div>
                      <button 
                        className="mt-4 w-full py-3 border border-brand-primary text-brand-primary font-bold uppercase text-sm hover:bg-brand-primary hover:text-white transition-all rounded-sm">
                        Szczegóły Kursu
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    );
  };

  const RentalsView = () => (
    <div className="py-12 bg-brand-surface animate-fade-in">
       <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader title="Wynajem Maszyn" subtitle="Flota Heavy Duty" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MACHINES.map((machine) => (
            <div 
              key={machine.id} 
              onClick={() => {
                setSelectedMachineId(machine.id);
                setView('MACHINE_DETAIL');
              }}
              className="bg-white rounded-sm shadow-sm hover:shadow-lg transition-shadow border border-slate-200 overflow-hidden flex flex-col group cursor-pointer">
               <div className="h-56 bg-slate-100 overflow-hidden relative">
                  <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/0 transition-colors z-10"></div>
                  <img src={machine.image} alt={machine.name} className="w-full h-full object-cover mix-blend-multiply transform group-hover:scale-105 transition-transform duration-500" />
               </div>
               <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-heading font-bold text-brand-dark">{machine.name}</h3>
                  <p className="text-brand-accent font-medium text-sm mb-4 uppercase">{machine.type}</p>
                  
                  <div className="space-y-2 mb-6">
                    {Object.entries(machine.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-base border-b border-slate-100 pb-1">
                        <span className="text-slate-500 capitalize">{key}</span>
                        <span className="font-bold text-slate-700">{value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-brand-primary text-white py-3 font-bold uppercase text-sm rounded-sm hover:bg-brand-dark transition-colors mt-auto">
                    Rezerwuj Maszynę
                  </button>
               </div>
            </div>
          ))}
        </div>
       </div>
    </div>
  );

  const CourseDetailView = () => {
    const course = COURSES.find(c => c.id === selectedCourseId);
    if (!course) return null;

    return (
      <div className="animate-fade-in font-body">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-brand-primary via-brand-primary/95 to-brand-secondary min-h-[500px] flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/80 to-transparent"></div>
          </div>
          
          <div className="absolute inset-0 opacity-10 z-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10 py-20">
            <button 
              onClick={() => setView('CATALOG')}
              className="flex items-center gap-1 text-white/80 hover:text-white mb-8 text-sm font-bold uppercase tracking-wider transition-colors"
            >
              <ChevronRight size={16} className="rotate-180"/> Wróć do katalogu
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-2">
                <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full mb-6">
                  {course.category}
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-black text-white mb-6 leading-tight">
                  {course.title}
                </h1>
                <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-2xl">
                  {course.description || 'Kompleksowe szkolenie przygotowujące do egzaminu państwowego z najwyższą skutecznością.'}
                </p>
                
                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center gap-3">
                    <Clock size={24} className="text-brand-accent" />
                    <div>
                      <div className="text-sm text-white/70">Czas trwania</div>
                      <div className="font-bold text-white">{course.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award size={24} className="text-brand-accent" />
                    <div>
                      <div className="text-sm text-white/70">Certyfikat UDT</div>
                      <div className="font-bold text-white">Uznawany zawodowo</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-sm shadow-2xl p-8 sticky top-24">
                  <div className="text-4xl font-heading font-black text-brand-primary mb-2">
                    {course.price}
                  </div>
                  <p className="text-slate-500 text-sm mb-8">na osobę / kursu pełnego</p>
                  
                  <button className="w-full bg-brand-primary text-white py-4 font-bold uppercase text-sm rounded-sm hover:bg-brand-dark transition-colors mb-4">
                    Zapisz się teraz
                  </button>
                  <button className="w-full border-2 border-brand-primary text-brand-primary py-3 font-bold uppercase text-sm rounded-sm hover:bg-slate-50 transition-colors">
                    Dowiedz się więcej
                  </button>

                  <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Teoria online + praktyka</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Materiały dydaktyczne w cenie</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Wsparcie instruktora</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-brand-surface py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* O szkoleniu */}
                <div>
                  <h2 className="text-3xl font-heading font-bold text-brand-primary mb-6">O szkoleniu</h2>
                  <p className="text-base text-slate-600 leading-relaxed mb-4">
                    Szkolenie {course.title.toLowerCase()} to kompleksowy program, który przygotowuje operatorów do pracy z maszynami budowlanymi. Program obejmuje zarówno wiedzę teoretyczną, jak i praktyczne umiejętności niezbędne do bezpiecznej eksploatacji sprzętu.
                  </p>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Szkolenie kończy się egzaminem państwowym UDT, którego zdanie uprawnia do pracy zawodowej na terenie całej Polski.
                  </p>
                </div>

                {/* Program */}
                <div>
                  <h2 className="text-3xl font-heading font-bold text-brand-primary mb-6">Program szkolenia</h2>
                  <div className="space-y-3">
                    {getCourseProgram(course.id).map((item, idx) => (
                      <div key={idx} className="bg-white rounded-sm border border-slate-200 overflow-hidden">
                        <button
                          onClick={() => setOpenAccordionIndex(openAccordionIndex === idx ? null : idx)}
                          className="w-full flex items-center justify-between gap-4 p-5 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                              {idx + 1}
                            </div>
                            <span className="text-slate-700 font-bold text-left">{item.title}</span>
                          </div>
                          <ChevronDown 
                            className={`flex-shrink-0 transition-all duration-300 ${openAccordionIndex === idx ? 'rotate-180 text-brand-accent' : 'text-slate-400'}`}
                            size={24} 
                          />
                        </button>
                        <div 
                          className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            openAccordionIndex === idx ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="px-5 pb-5 pt-2 bg-slate-50 border-t border-slate-200">
                            <ul className="space-y-2.5 ml-14">
                              {item.details.map((detail, detailIdx) => (
                                <li key={detailIdx} className="flex items-start gap-3 text-slate-600">
                                  <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm leading-relaxed">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wymagania */}
                <div>
                  <h2 className="text-3xl font-heading font-bold text-brand-primary mb-6">Wymagania wstępne</h2>
                  <ul className="space-y-3">
                    {['Ukończone 18 lat', 'Stan zdrowia pozwalający na pracę na wysokościach', 'Zaświadczenie lekarskie', 'Dokument tożsamości'].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-600">
                        <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-sm shadow-sm p-8 sticky top-24 space-y-6">
                  <div>
                    <p className="text-sm text-slate-500 uppercase font-bold mb-2">Kategoria</p>
                    <p className="text-lg font-bold text-brand-primary">{course.category}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-slate-500 uppercase font-bold mb-2">Czas trwania</p>
                    <p className="text-lg font-bold text-brand-primary">{course.duration}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500 uppercase font-bold mb-2">Cena</p>
                    <p className="text-2xl font-heading font-black text-brand-primary">{course.price}</p>
                  </div>

                  <button className="w-full bg-brand-primary text-white py-3 font-bold uppercase text-sm rounded-sm hover:bg-brand-dark transition-colors">
                    Zapisz się
                  </button>

                  <div className="bg-brand-accent/10 p-4 rounded-sm border-l-4 border-brand-accent">
                    <p className="text-sm font-bold text-brand-primary mb-2">📞 Masz pytania?</p>
                    <p className="text-sm text-slate-600">Skontaktuj się z nami - chętnie pomożemy!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MachineDetailView = () => {
    const machine = MACHINES.find(m => m.id === selectedMachineId);
    if (!machine) return null;

    return (
      <div className="animate-fade-in font-body">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-brand-primary via-brand-primary/95 to-brand-secondary min-h-[500px] flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={machine.image} 
              alt={machine.name} 
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/80 to-transparent"></div>
          </div>
          
          <div className="absolute inset-0 opacity-10 z-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10 py-20">
            <button 
              onClick={() => setView('RENTALS')}
              className="flex items-center gap-1 text-white/80 hover:text-white mb-8 text-sm font-bold uppercase tracking-wider transition-colors"
            >
              <ChevronRight size={16} className="rotate-180"/> Wróć do wynajmu
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-2">
                <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full mb-6">
                  {machine.type}
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-black text-white mb-6 leading-tight">
                  {machine.name}
                </h1>
                <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-2xl">
                  Profesjonalna maszyna budowlana dostępna do wynajmu. Idealna do prac na wysokości i w trudno dostępnych miejscach.
                </p>
                
                <div className="flex flex-wrap gap-8">
                  {Object.entries(machine.specs).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-brand-accent/20 backdrop-blur-sm flex items-center justify-center">
                        <Truck size={24} className="text-brand-accent" />
                      </div>
                      <div>
                        <div className="text-sm text-white/70 capitalize">{key}</div>
                        <div className="font-bold text-white">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-sm shadow-2xl p-8 sticky top-24">
                  <div className="text-sm text-slate-500 uppercase font-bold mb-2">Od</div>
                  <div className="text-4xl font-heading font-black text-brand-primary mb-2">
                    250 PLN
                  </div>
                  <p className="text-slate-500 text-sm mb-8">za dobę / netto</p>
                  
                  <button className="w-full bg-brand-primary text-white py-4 font-bold uppercase text-sm rounded-sm hover:bg-brand-dark transition-colors mb-4">
                    Zapytaj o dostępność
                  </button>
                  <button className="w-full border-2 border-brand-primary text-brand-primary py-3 font-bold uppercase text-sm rounded-sm hover:bg-slate-50 transition-colors">
                    Pobierz ofertę PDF
                  </button>

                  <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Możliwość transportu</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Ubezpieczenie w cenie</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Obsługa operatora opcjonalnie</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-brand-surface py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* O maszynie */}
                <div>
                  <h2 className="text-3xl font-heading font-bold text-brand-primary mb-6">Opis maszyny</h2>
                  <p className="text-base text-slate-600 leading-relaxed mb-4">
                    {machine.name} to profesjonalna maszyna budowlana z najwyższej półki. Zapewnia maksymalne bezpieczeństwo pracy oraz komfort obsługi dzięki nowoczesnym systemom sterowania.
                  </p>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Idealna do prac budowlanych, instalacyjnych i konserwacyjnych na wysokości. Kompaktowa konstrukcja pozwala na pracę w trudno dostępnych miejscach.
                  </p>
                </div>

                {/* Specyfikacja */}
                <div>
                  <h2 className="text-3xl font-heading font-bold text-brand-primary mb-6">Specyfikacja techniczna</h2>
                  <div className="bg-white rounded-sm shadow-sm p-6 space-y-4">
                    {Object.entries(machine.specs).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                        <span className="text-slate-600 capitalize font-medium">{key}</span>
                        <span className="font-bold text-brand-dark text-lg">{value}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <span className="text-slate-600 font-medium">Typ napędu</span>
                      <span className="font-bold text-brand-dark text-lg">Elektryczny</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-medium">Certyfikaty</span>
                      <span className="font-bold text-brand-dark text-lg">CE, UDT</span>
                    </div>
                  </div>
                </div>

                {/* Zastosowanie */}
                <div>
                  <h2 className="text-3xl font-heading font-bold text-brand-primary mb-6">Zastosowanie</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Prace budowlane', 'Instalacje elektryczne', 'Konserwacja budynków', 'Prace magazynowe', 'Montaż konstrukcji', 'Prace wykończeniowe'].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-sm border-l-4 border-brand-accent">
                        <Wrench size={20} className="text-brand-accent flex-shrink-0" />
                        <span className="text-slate-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-sm shadow-sm p-8 sticky top-24 space-y-6">
                  <div>
                    <p className="text-sm text-slate-500 uppercase font-bold mb-2">Maszyna</p>
                    <p className="text-lg font-bold text-brand-primary">{machine.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-slate-500 uppercase font-bold mb-2">Typ</p>
                    <p className="text-lg font-bold text-brand-primary">{machine.type}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500 uppercase font-bold mb-2">Cena najmu</p>
                    <p className="text-2xl font-heading font-black text-brand-primary">250 PLN/doba</p>
                    <p className="text-sm text-slate-500 mt-1">Rabat przy dłuższym najmie</p>
                  </div>

                  <button className="w-full bg-brand-primary text-white py-3 font-bold uppercase text-sm rounded-sm hover:bg-brand-dark transition-colors">
                    Zarezerwuj
                  </button>

                  <div className="bg-brand-accent/10 p-4 rounded-sm border-l-4 border-brand-accent">
                    <p className="text-sm font-bold text-brand-primary mb-2">📞 Potrzebujesz pomocy?</p>
                    <p className="text-sm text-slate-600">Zadzwoń: +48 730 101 000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ServicesView = () => {
    return (
      <div className="animate-fade-in font-body">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-brand-primary via-brand-primary/95 to-brand-secondary min-h-[500px] flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={`${import.meta.env.BASE_URL}serwis-i-koserwacja.webp`} 
              alt="Usługi serwisowe" 
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/80 to-transparent"></div>
          </div>
          
          <div className="absolute inset-0 opacity-10 z-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10 py-20">
            <button 
              onClick={() => setView('HOME')}
              className="flex items-center gap-1 text-white/80 hover:text-white mb-8 text-sm font-bold uppercase tracking-wider transition-colors"
            >
              <ChevronRight size={16} className="rotate-180"/> Wróć do strony głównej
            </button>
            
            <div className="max-w-3xl">
              <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full mb-6">
                Kompleksowa obsługa
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-black text-white mb-6 leading-tight">
                Usługi Serwisowe
              </h1>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Profesjonalny serwis i konserwacja maszyn budowlanych. Przeglądy okresowe UDT, naprawy, 
                modernizacje oraz mobilny serwis z dojazdem do klienta na terenie całej Polski.
              </p>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/20 backdrop-blur-sm flex items-center justify-center">
                    <CheckCircle size={24} className="text-brand-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Doświadczenie</div>
                    <div className="font-bold text-white">15+ lat</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/20 backdrop-blur-sm flex items-center justify-center">
                    <Settings size={24} className="text-brand-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Zrealizowanych</div>
                    <div className="font-bold text-white">2000+ serwisów</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/20 backdrop-blur-sm flex items-center justify-center">
                    <Clock size={24} className="text-brand-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Czas reakcji</div>
                    <div className="font-bold text-white">24h</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="bg-brand-surface py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <SectionHeader 
              subtitle="Zakres usług"
              title="Czym się zajmujemy?"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: <Settings size={32} />,
                  title: 'Przeglądy UDT',
                  desc: 'Kompleksowe przeglądy okresowe zgodne z wymogami UDT. Dokumentacja i certyfikaty.'
                },
                {
                  icon: <Wrench size={32} />,
                  title: 'Naprawy bieżące',
                  desc: 'Szybkie reakcje na awarie. Diagnostyka i naprawa układów hydraulicznych, elektrycznych i mechanicznych.'
                },
                {
                  icon: <Truck size={32} />,
                  title: 'Mobilny serwis',
                  desc: 'Dojazd do klienta na terenie całej Polski. Serwis w miejscu użytkowania maszyny.'
                },
                {
                  icon: <FileText size={32} />,
                  title: 'Resursy i modernizacje',
                  desc: 'Kompleksowe remonty kapitalne. Modernizacja starszych maszyn do aktualnych norm.'
                },
                {
                  icon: <ShieldCheck size={32} />,
                  title: 'Certyfikacja',
                  desc: 'Pomoc w uzyskaniu certyfikatów UDT. Kompletowanie dokumentacji technicznej.'
                },
                {
                  icon: <Clock size={32} />,
                  title: 'Serwis gwarancyjny',
                  desc: 'Obsługa gwarancyjna maszyn. Współpraca z producentami i autoryzowanymi serwisami.'
                }
              ].map((service, idx) => (
                <div key={idx} className="bg-white p-8 rounded-sm shadow-sm hover:shadow-xl transition-shadow group">
                  <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mb-6 text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-brand-dark mb-3">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <SectionHeader 
              subtitle="Jak to działa?"
              title="Proces realizacji"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Kontakt', desc: 'Zgłoszenie telefoniczne lub mailowe' },
                { step: '02', title: 'Diagnostyka', desc: 'Wstępna ocena zakresu prac' },
                { step: '03', title: 'Wycena', desc: 'Przygotowanie szczegółowej oferty' },
                { step: '04', title: 'Realizacja', desc: 'Wykonanie serwisu i dokumentacja' }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-20 h-20 rounded-full bg-brand-primary text-white font-heading font-black text-3xl flex items-center justify-center mx-auto mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-brand-dark mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-brand-primary to-brand-secondary py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-black text-white mb-6">
              Potrzebujesz serwisu swojej maszyny?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Skontaktuj się z nami – odpowiemy na wszystkie pytania i przygotujemy ofertę dopasowaną do Twoich potrzeb.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setView('CONTACT')}
                className="px-8 py-4 bg-brand-accent hover:bg-brand-accentHover text-white font-bold uppercase tracking-wider rounded-sm shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Skontaktuj się <ArrowRight size={20}/>
              </button>
              <a 
                href="tel:+48730101000"
                className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-brand-primary font-bold uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2"
              >
                <Phone size={20}/> +48 730 101 000
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-brand-surface py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <SectionHeader 
              subtitle="Pytania i odpowiedzi"
              title="Najczęściej zadawane pytania"
            />
            
            <div className="space-y-4">
              {[
                {
                  q: 'Jak często należy wykonywać przeglądy UDT?',
                  a: 'Częstotliwość przeglądów zależy od typu maszyny i intensywności użytkowania. Zazwyczaj przeglądy wykonuje się raz w roku lub co określoną liczbę motogodzin.'
                },
                {
                  q: 'Czy wykonujecie serwis na miejscu u klienta?',
                  a: 'Tak, dysponujemy mobilnym serwisem, który może dojechać do klienta na terenie całej Polski. Większość napraw i przeglądów wykonujemy bezpośrednio w miejscu użytkowania maszyny.'
                },
                {
                  q: 'Jakie maszyny serwisujecie?',
                  a: 'Serwisujemy szeroki zakres maszyn: wózki widłowe, podnośniki koszowe, ładowarki teleskopowe, koparki, zwyżki i inne maszyny budowlane wymagające przeglądów UDT.'
                },
                {
                  q: 'Czy otrzymam dokumentację po przeglądzie?',
                  a: 'Tak, po każdym przeglądzie wydajemy komplet dokumentacji zgodnej z wymogami UDT, w tym protokoły z badań i certyfikaty.'
                }
              ].map((faq, idx) => (
                <details key={idx} className="bg-white rounded-sm shadow-sm group">
                  <summary className="p-6 cursor-pointer font-bold text-brand-dark hover:text-brand-primary transition-colors flex items-center justify-between">
                    {faq.q}
                    <ChevronRight size={20} className="transform group-open:rotate-90 transition-transform text-brand-accent" />
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LessonPlayerView = () => {
    // Determine active lesson based on mock data (e.g., first incomplete one)
    // For demo purposes, we will default to the 2nd lesson of 2nd module as "active"
    const activeLessonId = currentLessonId; 
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Znajdź wszystkie lekcje w kursie
    const allLessons: any[] = [];
    COURSE_CURRICULUM.forEach(module => {
      module.lessons.forEach(lesson => {
        allLessons.push(lesson);
      });
    });

    // Znajdź indeks aktualnej lekcji
    const currentLessonIndex = allLessons.findIndex(lesson => lesson.id === activeLessonId);
    const hasPrevious = currentLessonIndex > 0;
    const hasNext = currentLessonIndex < allLessons.length - 1;

    const goToPreviousLesson = () => {
      if (hasPrevious) {
        setCurrentLessonId(allLessons[currentLessonIndex - 1].id);
      }
    };

    const goToNextLesson = () => {
      if (hasNext) {
        setCurrentLessonId(allLessons[currentLessonIndex + 1].id);
      }
    };

    // Znajdź aktualną lekcję
    const currentLesson = allLessons[currentLessonIndex];

    return (
      <div className="min-h-screen bg-slate-100 flex flex-col font-body animate-fade-in">
        <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col md:flex-row gap-6 p-4 md:p-8">
          
          {/* Main Content Area - Left/Top on mobile */}
          <div className="flex-grow w-full md:w-3/4 flex flex-col gap-6 order-2 md:order-1">
            
            {/* Header & Breadcrumbs */}
            <div className="flex items-center justify-between">
               <div>
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                     <span onClick={() => setView('LMS')} className="cursor-pointer hover:text-brand-accent">Moje Szkolenia</span> <ChevronRight size={12}/> 
                     <span>Operator Wózków Widłowych (I WJO)</span>
                  </div>
                  <h1 className="text-2xl font-heading font-bold text-brand-dark">{currentLesson?.title || 'Bezpieczeństwo wymiany butli LPG'}</h1>
               </div>
               <div className="flex items-center gap-2">
                  {isFromAdmin && adminEditingCourseId && (
                    <button 
                      onClick={() => {
                        // Zapisz informację o powrocie do edycji w localStorage
                        localStorage.setItem('returnToEditCourseId', adminEditingCourseId);
                        
                        setIsFromAdmin(false);
                        setAdminEditingCourseId(null);
                        setView('ADMIN');
                      }}
                      className="hidden md:flex items-center gap-2 px-4 py-2 bg-brand-accent text-white font-bold text-sm rounded-sm hover:bg-brand-accentHover transition-colors"
                    >
                      <ChevronRight size={16} className="rotate-180" /> Powrót do edycji
                    </button>
                  )}
                  <button 
                     className="md:hidden p-2 bg-white rounded shadow text-brand-dark"
                     onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                     <Menu size={20} />
                  </button>
               </div>
            </div>

            {/* Video Player Container or Quiz */}
            {currentLesson?.type !== 'quiz' ? (
            <div className="w-full aspect-video bg-black rounded-sm shadow-xl overflow-hidden relative group">
              {/* Fake Video Interface */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-16 rounded-full bg-brand-accent/90 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg z-10">
                    <Play size={32} className="text-white ml-1" />
                 </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                 <div className="h-full w-1/3 bg-brand-accent"></div>
              </div>
              <div className="absolute bottom-4 left-4 text-white text-sm font-bold bg-black/50 px-2 py-1 rounded">04:20 / 25:00</div>
              <img 
                 src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop" 
                 className="w-full h-full object-cover opacity-60"
                 alt="Lesson Cover"
              />
            </div>
            ) : (
            <div className="w-full bg-white rounded-sm shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-heading font-bold text-brand-dark mb-6">{currentLesson?.title}</h2>
              <div className="space-y-6">
                {currentLesson?.questions?.map((question, qIndex) => (
                  <div key={question.id} className="border border-slate-200 rounded p-6 bg-slate-50">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-brand-dark flex-1">
                        {qIndex + 1}. {question.question}
                      </h3>
                      <span className="text-xs font-bold bg-brand-primary text-white px-3 py-1 rounded ml-4 whitespace-nowrap">
                        {question.type === 'single' ? 'Jednokrotny wybór' : question.type === 'multiple' ? 'Wielokrotny wybór' : 'Pytanie otwarte'}
                      </span>
                    </div>

                    {question.type === 'single' && (
                      <div className="space-y-3">
                        {question.options?.map((option, idx) => (
                          <label key={idx} className="flex items-center gap-3 p-3 border border-slate-300 rounded cursor-pointer hover:bg-white transition-colors">
                            <input 
                              type="radio" 
                              name={question.id}
                              value={idx}
                              checked={quizAnswers[question.id] === idx}
                              onChange={(e) => setQuizAnswers({...quizAnswers, [question.id]: parseInt(e.target.value)})}
                              className="w-4 h-4"
                            />
                            <span className="text-slate-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {question.type === 'multiple' && (
                      <div className="space-y-3">
                        {question.options?.map((option, idx) => (
                          <label key={idx} className="flex items-center gap-3 p-3 border border-slate-300 rounded cursor-pointer hover:bg-white transition-colors">
                            <input 
                              type="checkbox"
                              checked={(quizAnswers[question.id] as number[])?.includes(idx) || false}
                              onChange={(e) => {
                                const current = (quizAnswers[question.id] as number[]) || [];
                                if (e.target.checked) {
                                  setQuizAnswers({...quizAnswers, [question.id]: [...current, idx]});
                                } else {
                                  setQuizAnswers({...quizAnswers, [question.id]: current.filter(i => i !== idx)});
                                }
                              }}
                              className="w-4 h-4"
                            />
                            <span className="text-slate-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {question.type === 'open' && (
                      <textarea
                        value={(quizAnswers[question.id] as string) || ''}
                        onChange={(e) => setQuizAnswers({...quizAnswers, [question.id]: e.target.value})}
                        placeholder="Wpisz swoją odpowiedź tutaj..."
                        className="w-full p-4 border border-slate-300 rounded focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                        rows={4}
                      />
                    )}

                    {showQuizResults && (
                      <div className={`mt-4 p-4 rounded ${question.type === 'open' ? 'bg-blue-50 border border-blue-200' : 'bg-green-50 border border-green-200'}`}>
                        <p className="text-sm font-bold text-slate-700 mb-2">Wyjaśnienie:</p>
                        <p className="text-sm text-slate-600">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setShowQuizResults(!showQuizResults)}
                className="mt-6 px-6 py-3 bg-brand-primary text-white font-bold rounded hover:bg-brand-dark transition-colors"
              >
                {showQuizResults ? 'Ukryj wyjaśnienia' : 'Przesyłaj odpowiedzi i zobacz wyjaśnienia'}
              </button>
            </div>
            )}

            {/* Content Tabs & Materials */}
            {currentLesson?.type !== 'quiz' && (
            <div className="bg-white rounded-sm shadow-sm border border-slate-200 p-6">
              <div className="flex border-b border-slate-200 mb-6">
                 <button className="px-6 py-3 text-sm font-bold text-brand-accent border-b-2 border-brand-accent">Opis Lekcji</button>
                 <button className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-brand-dark transition-colors">Materiały (2)</button>
                 <button className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-brand-dark transition-colors">Notatki</button>
              </div>

              <div className="prose max-w-none text-base text-slate-600 leading-relaxed mb-8">
                <p>
                  W tej lekcji omówimy procedurę bezpiecznej wymiany butli z gazem propan-butan w wózkach jezdniowych. 
                  Jest to jedna z kluczowych czynności eksploatacyjnych, która nieprawidłowo wykonana może prowadzić do poważnych wypadków.
                </p>
                <h4 className="font-bold text-brand-dark mt-4 mb-2">Czego się nauczysz?</h4>
                <ul className="list-disc pl-5 space-y-1">
                   <li>Zasad BHP przy kontakcie z gazem płynnym.</li>
                   <li>Kolejności odłączania i podłączania przewodów.</li>
                   <li>Sprawdzania szczelności instalacji po wymianie.</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="border border-slate-200 rounded p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="p-2 bg-red-100 rounded text-red-600">
                       <FileText size={20} />
                    </div>
                    <div>
                       <div className="font-bold text-brand-dark text-sm group-hover:text-brand-accent transition-colors">Instrukcja Wymiany Butli.pdf</div>
                       <div className="text-xs text-slate-500 mt-1">PDF • 2.4 MB</div>
                    </div>
                    <Download size={16} className="ml-auto text-slate-400 group-hover:text-brand-primary" />
                 </div>

                 <div className="border border-slate-200 rounded p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="p-2 bg-blue-100 rounded text-blue-600">
                       <FileText size={20} />
                    </div>
                    <div>
                       <div className="font-bold text-brand-dark text-sm group-hover:text-brand-accent transition-colors">Transkrypcja Wideo.txt</div>
                       <div className="text-xs text-slate-500 mt-1">TXT • 150 KB</div>
                    </div>
                    <Download size={16} className="ml-auto text-slate-400 group-hover:text-brand-primary" />
                 </div>
              </div>
            </div>
            )}

            {currentLesson?.type !== 'quiz' && (
            <div className="flex justify-between mt-4">
              <button 
                onClick={goToPreviousLesson}
                disabled={!hasPrevious}
                className={`px-6 py-3 border border-slate-300 font-bold uppercase text-xs rounded-sm transition-colors ${
                  hasPrevious 
                    ? 'text-slate-600 hover:bg-white hover:text-brand-dark cursor-pointer' 
                    : 'text-slate-300 cursor-not-allowed opacity-50'
                }`}
              >
                 Poprzednia lekcja
              </button>
              <button 
                onClick={goToNextLesson}
                disabled={!hasNext}
                className={`px-6 py-3 bg-brand-accent font-bold uppercase text-xs rounded-sm transition-colors flex items-center gap-2 ${
                  hasNext 
                    ? 'text-white hover:bg-brand-accentHover cursor-pointer' 
                    : 'bg-slate-300 text-slate-400 cursor-not-allowed'
                }`}
              >
                 Następna lekcja <ChevronRight size={14} />
              </button>
            </div>
            )}

          </div>

          {/* Sidebar - Right/Bottom on mobile */}
          <div className={`
             w-full md:w-1/4 flex-shrink-0 bg-white border border-slate-200 shadow-sm rounded-sm order-1 md:order-2
             ${sidebarOpen ? 'block' : 'hidden md:block'}
          `}>
             <div className="p-4 bg-brand-primary text-white rounded-t-sm">
                <div className="text-xs font-bold uppercase text-brand-accent tracking-widest mb-1">Twój postęp</div>
                <div className="flex justify-between items-end mb-2">
                   <span className="text-2xl font-heading font-bold">45%</span>
                   <span className="text-xs text-slate-300 mb-1">ukończono</span>
                </div>
                <div className="w-full bg-brand-dark/50 rounded-full h-1.5">
                   <div className="bg-brand-accent h-1.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
             </div>

             <div>
                {COURSE_CURRICULUM.map((module) => (
                   <div key={module.id} className="border-b border-slate-100 last:border-0">
                      <div className="bg-slate-50 px-4 py-3 text-xs font-bold uppercase text-slate-600 tracking-wider flex justify-between items-center sticky top-0 z-10 border-b border-slate-200">
                         {module.title}
                      </div>
                      <div>
                         {module.lessons.map((lesson) => {
                           const isActive = lesson.id === activeLessonId;
                           return (
                             <div 
                               key={lesson.id}
                               onClick={() => !lesson.isLocked && setCurrentLessonId(lesson.id)}
                               className={`
                                 flex items-start gap-3 p-4 cursor-pointer transition-colors relative
                                 ${lesson.isCompleted ? 'bg-green-50 hover:bg-green-100' : ''}
                                 ${isActive && !lesson.isCompleted ? 'bg-brand-surface' : ''}
                                 ${!isActive && !lesson.isCompleted ? 'hover:bg-slate-50' : ''}
                                 ${lesson.isLocked ? 'opacity-50 pointer-events-none' : ''}
                               `}
                             >
                               {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent"></div>}
                               
                               <div className="mt-0.5 flex-shrink-0">
                                  {lesson.isCompleted ? (
                                     <CheckCircle size={16} className="text-green-500" />
                                  ) : lesson.isLocked ? (
                                     <Lock size={16} className="text-slate-400" />
                                  ) : (
                                     <PlayCircle size={16} className={`${isActive ? 'text-brand-accent' : 'text-slate-400'}`} />
                                  )}
                               </div>
                               <div className="flex-1">
                                  <div className={`text-sm font-medium leading-tight mb-1 ${lesson.isCompleted ? 'text-green-700' : ''} ${isActive ? 'text-brand-dark font-bold' : 'text-slate-600'}`}>
                                     {lesson.title}
                                  </div>
                                  <div className={`text-xs flex items-center gap-2 ${lesson.isCompleted ? 'text-green-600' : 'text-slate-400'}`}>
                                     {lesson.type === 'video' ? <MonitorPlay size={10}/> : <CheckCircle size={10}/>}
                                     {lesson.duration}
                                  </div>
                               </div>
                             </div>
                           )
                         })}
                      </div>
                   </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    );
  }

  const AdminView = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'courses' | 'students'>(adminActiveTab);
    const [isAddingCourse, setIsAddingCourse] = useState(false);
    const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
    const [viewingCourseId, setViewingCourseId] = useState<string | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<string>('Wszystkie');
    const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
    const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
    const [isAddingModule, setIsAddingModule] = useState(false);
    const [isEditingModule, setIsEditingModule] = useState(false);
    const [isAddingLesson, setIsAddingLesson] = useState(false);
    
    // Synchronizuj activeTab z globalnym stanem
    useEffect(() => {
      setAdminActiveTab(activeTab);
    }, [activeTab]);
    
    // Sprawdź czy wracamy do edycji kursu
    useEffect(() => {
      const returnToCourseId = localStorage.getItem('returnToEditCourseId');
      if (returnToCourseId) {
        const course = COURSES.find(c => c.id === returnToCourseId);
        if (course) {
          // Ustaw formularz edycji
          setCourseForm({
            title: course.title,
            category: course.category,
            duration: course.duration,
            price: course.price,
            image: course.image,
            description: course.description || '',
            isPopular: course.isPopular || false
          });
          setEditingCourseId(returnToCourseId);
          setIsAddingCourse(true);
          setViewingCourseId(null);
          setActiveTab('courses');
        }
        // Wyczyść localStorage
        localStorage.removeItem('returnToEditCourseId');
      }
    }, []);
    
    const [courseForm, setCourseForm] = useState({
      title: '',
      category: 'UDT' as 'UDT' | 'SEP' | 'BHP' | 'Inne',
      duration: '',
      price: '',
      image: '',
      description: '',
      isPopular: false
    });

    const [lessonForm, setLessonForm] = useState({
      title: '',
      duration: '',
      type: 'video' as 'video' | 'test' | 'text',
      videoUrl: '',
      description: '',
      materials: [] as { name: string; url: string }[],
      questions: [] as { id: string; question: string; type: 'single' | 'multiple' | 'open'; options?: string[]; correctAnswer?: number | number[]; explanation?: string }[]
    });

    const [moduleForm, setModuleForm] = useState({
      title: '',
      description: ''
    });

    const handleSaveCourse = () => {
      // W rzeczywistej aplikacji tutaj byłoby zapisywanie do API
      console.log('Zapisano szkolenie:', courseForm);
      setIsAddingCourse(false);
      setEditingCourseId(null);
      setCourseForm({
        title: '',
        category: 'UDT',
        duration: '',
        price: '',
        image: '',
        description: '',
        isPopular: false
      });
    };

    const handleEditCourse = (course: Course) => {
      setCourseForm({
        title: course.title,
        category: course.category,
        duration: course.duration,
        price: course.price,
        image: course.image,
        description: course.description || '',
        isPopular: course.isPopular || false
      });
      setEditingCourseId(course.id);
      setIsAddingCourse(true);
      setViewingCourseId(null);
    };

    const handleDeleteCourse = (courseId: string) => {
      // W rzeczywistej aplikacji tutaj byłoby usuwanie przez API
      if (confirm('Czy na pewno chcesz usunąć to szkolenie?')) {
        console.log('Usunięto szkolenie:', courseId);
      }
    };

    // Basic SVG Pie Chart Logic
    const total = POPULARITY_DATA.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercent = 0;

    const getCoordinatesForPercent = (percent: number) => {
      const x = Math.cos(2 * Math.PI * percent);
      const y = Math.sin(2 * Math.PI * percent);
      return [x, y];
    };

    return (
      <div className="py-12 bg-slate-50 animate-fade-in min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl font-heading font-bold text-brand-primary mb-2">Panel Managera</h2>
              <p className="text-slate-500">Zarządzanie postępami i szkoleniami.</p>
            </div>
            <button className="mt-4 md:mt-0 px-6 py-3 bg-brand-primary text-white font-bold uppercase text-sm rounded-sm hover:bg-brand-dark transition-colors flex items-center gap-2 shadow-lg shadow-brand-primary/20">
              <Printer size={16} /> Generuj raport PDF
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-8 border-b border-slate-200">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`pb-4 px-2 font-bold text-sm uppercase tracking-wider transition-colors relative ${
                  activeTab === 'dashboard' 
                    ? 'text-brand-accent' 
                    : 'text-slate-500 hover:text-brand-primary'
                }`}
              >
                Dashboard
                {activeTab === 'dashboard' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`pb-4 px-2 font-bold text-sm uppercase tracking-wider transition-colors relative ${
                  activeTab === 'courses' 
                    ? 'text-brand-accent' 
                    : 'text-slate-500 hover:text-brand-primary'
                }`}
              >
                Zarządzanie Szkoleniami
                {activeTab === 'courses' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`pb-4 px-2 font-bold text-sm uppercase tracking-wider transition-colors relative ${
                  activeTab === 'students' 
                    ? 'text-brand-accent' 
                    : 'text-slate-500 hover:text-brand-primary'
                }`}
              >
                Lista Kursantów
                {activeTab === 'students' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent"></div>
                )}
              </button>
            </div>
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Pie Chart Section */}
            <div className="lg:col-span-1 bg-white p-6 rounded-sm shadow-sm border border-slate-100">
               <h3 className="font-heading font-bold text-brand-dark mb-6 flex items-center gap-2">
                 <BarChart3 size={20} className="text-brand-accent"/> Popularność Szkoleń
               </h3>
               
               <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 mb-6">
                    <svg viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }}>
                       {POPULARITY_DATA.map((slice, index) => {
                          const startPercent = cumulativePercent / total;
                          cumulativePercent += slice.value;
                          const endPercent = cumulativePercent / total;
                          
                          const [startX, startY] = getCoordinatesForPercent(startPercent);
                          const [endX, endY] = getCoordinatesForPercent(endPercent);
                          
                          const largeArcFlag = endPercent - startPercent > 0.5 ? 1 : 0;
                          
                          const pathData = [
                            `M 0 0`,
                            `L ${startX} ${startY}`,
                            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                            `Z`
                          ].join(' ');

                          return (
                            <path 
                              key={index} 
                              d={pathData} 
                              fill={slice.color} 
                              stroke="white" 
                              strokeWidth="0.02" 
                              className="hover:opacity-90 transition-opacity cursor-pointer"
                            />
                          );
                       })}
                    </svg>
                  </div>
                  
                  <div className="w-full space-y-2">
                     {POPULARITY_DATA.map((item, idx) => (
                       <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                             <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                             <span className="text-slate-600">{item.name}</span>
                          </div>
                          <span className="font-bold text-slate-800">{item.value}%</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Students Table Section */}
            <div className="lg:col-span-2 bg-white p-6 rounded-sm shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-heading font-bold text-brand-dark flex items-center gap-2">
                  <GraduationCap size={20} className="text-brand-accent"/> Aktywne Szkolenia
                </h3>
              </div>

              <div className="space-y-4">
                {COURSES.map((course) => {
                  const enrolledStudents = ADMIN_STUDENTS.filter(s => s.course === course.id);
                  const activeStudents = enrolledStudents.filter(s => s.expirationDays > 0).length;
                  
                  return (
                    <div 
                      key={course.id} 
                      onClick={() => {
                        setActiveTab('courses');
                        setViewingCourseId(course.id);
                      }}
                      className="flex items-stretch justify-between bg-slate-50 rounded-sm hover:bg-slate-100 transition-colors cursor-pointer overflow-hidden"
                    >
                      <div className="flex items-stretch gap-4 flex-1">
                        <div className="w-24 bg-slate-200 flex-shrink-0">
                          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="py-4 flex items-center">
                          <div>
                            <h4 className="font-bold text-brand-dark mb-1">{course.title}</h4>
                            <div className="flex items-center gap-3 text-xs text-slate-600">
                              <span className="px-2 py-0.5 bg-brand-secondary/10 text-brand-secondary rounded font-bold uppercase">{course.category}</span>
                              <span>⏱ {course.duration}</span>
                              <span className="font-bold text-brand-primary">{course.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 px-4">
                        <div className="text-center">
                          <p className="text-2xl font-heading font-black text-teal-600">{enrolledStudents.length}</p>
                          <p className="text-xs text-slate-500 font-bold whitespace-nowrap">Uczestników</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-heading font-black text-orange-600">{activeStudents}</p>
                          <p className="text-xs text-slate-500 font-bold whitespace-nowrap">Z dostępem</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
          )}

          {/* Courses Management Tab */}
          {activeTab === 'courses' && (
            <div>
              {viewingCourseId ? (
                // Course Details View
                <div>
                  {(() => {
                    const course = COURSES.find(c => c.id === viewingCourseId);
                    if (!course) return null;
                    
                    const enrolledStudents = ADMIN_STUDENTS.filter(s => s.course === course.id);
                    
                    return (
                      <div>
                        <button
                          onClick={() => setViewingCourseId(null)}
                          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-brand-accent transition-colors font-bold"
                        >
                          <ChevronRight size={16} className="rotate-180" /> Wróć do listy
                        </button>

                        <div className="bg-white rounded-sm shadow-sm border border-slate-100 overflow-hidden">
                          <div className="p-8">
                            <div className="flex items-start gap-6 mb-6">
                              <div className="flex-grow">
                                <h2 className="text-3xl font-heading font-bold text-brand-dark mb-3">{course.title}</h2>
                                <div className="flex items-center gap-4 text-sm mb-4">
                                  <span className="px-3 py-1 bg-brand-secondary/10 text-brand-secondary rounded font-bold uppercase">{course.category}</span>
                                  <span className="text-slate-600">⏱ {course.duration}</span>
                                  <span className="font-bold text-brand-primary text-lg">{course.price}</span>
                                  {course.isPopular && <span className="px-3 py-1 bg-brand-accent/10 text-brand-accent rounded font-bold">POPULARNY</span>}
                                </div>
                                <button
                                  onClick={() => handleEditCourse(course)}
                                  className="px-4 py-2 bg-brand-accent text-white font-bold text-sm rounded-sm hover:bg-brand-accentHover transition-colors flex items-center gap-2"
                                >
                                  <Edit size={16} /> Edytuj
                                </button>
                              </div>
                              <div className="w-64 flex-shrink-0">
                                <div className="aspect-[3/2] w-full bg-slate-100 rounded-sm overflow-hidden">
                                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                </div>
                              </div>
                            </div>

                            {course.description && (
                              <div className="mb-8">
                                <h3 className="text-lg font-heading font-bold text-brand-dark mb-3">Opis</h3>
                                <p className="text-slate-600 leading-relaxed">{course.description}</p>
                              </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                              <div className="bg-slate-50 p-6 rounded-sm">
                                <div className="flex items-center gap-3 mb-2">
                                  <Users size={24} className="text-brand-accent" />
                                  <h4 className="font-bold text-slate-700">Zapisanych</h4>
                                </div>
                                <p className="text-3xl font-heading font-black text-brand-primary">{enrolledStudents.length}</p>
                              </div>
                              <div className="bg-slate-50 p-6 rounded-sm">
                                <div className="flex items-center gap-3 mb-2">
                                  <Trophy size={24} className="text-brand-accent" />
                                  <h4 className="font-bold text-slate-700">Ukończonych</h4>
                                </div>
                                <p className="text-3xl font-heading font-black text-brand-primary">{enrolledStudents.filter(s => s.progress === 100).length}</p>
                              </div>
                              <div className="bg-slate-50 p-6 rounded-sm">
                                <div className="flex items-center gap-3 mb-2">
                                  <BarChart3 size={24} className="text-brand-accent" />
                                  <h4 className="font-bold text-slate-700">Średni postęp</h4>
                                </div>
                                <p className="text-3xl font-heading font-black text-brand-primary">
                                  {enrolledStudents.length > 0 ? Math.round(enrolledStudents.reduce((sum, s) => sum + s.progress, 0) / enrolledStudents.length) : 0}%
                                </p>
                              </div>
                            </div>

                            <div>
                              <h3 className="text-lg font-heading font-bold text-brand-dark mb-4">Aktywni uczestnicy ({enrolledStudents.length})</h3>
                              {enrolledStudents.length > 0 ? (
                                <div className="overflow-x-auto">
                                  <table className="w-full text-sm text-left text-slate-600">
                                    <thead className="text-xs text-slate-400 uppercase bg-slate-50 border-b border-slate-100">
                                      <tr>
                                        <th className="px-4 py-3 font-bold tracking-wider">Imię i Nazwisko</th>
                                        <th className="px-4 py-3 font-bold tracking-wider">Email</th>
                                        <th className="px-4 py-3 font-bold tracking-wider">Postęp</th>
                                        <th className="px-4 py-3 font-bold tracking-wider">Ważność</th>
                                        <th className="px-4 py-3 font-bold tracking-wider text-right">Akcje</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                      {enrolledStudents.map((student) => (
                                        <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                          <td className="px-4 py-4">
                                            <button
                                              onClick={() => {
                                                setViewingStudentId(student.id);
                                                setView('STUDENT_DETAIL');
                                              }}
                                              className="font-bold text-brand-primary hover:text-brand-accent transition-colors text-left"
                                            >
                                              {student.name}
                                            </button>
                                          </td>
                                          <td className="px-4 py-4 text-slate-600">{student.email}</td>
                                          <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                              <div className="flex-grow w-16 bg-slate-100 h-1.5 rounded-full">
                                                <div className="bg-brand-primary h-1.5 rounded-full" style={{ width: `${student.progress}%` }}></div>
                                              </div>
                                              <span className="text-xs font-bold">{student.progress}%</span>
                                            </div>
                                          </td>
                                          <td className="px-4 py-4">
                                            {student.expirationDays > 5 ? (
                                              <span className="inline-flex items-center gap-1 text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded">
                                                {student.expirationDays} dni
                                              </span>
                                            ) : student.expirationDays > 0 ? (
                                              <span className="inline-flex items-center gap-1 text-yellow-600 font-bold text-xs bg-yellow-50 px-2 py-1 rounded">
                                                <AlertCircle size={10}/> {student.expirationDays} dni
                                              </span>
                                            ) : (
                                              <span className="inline-flex items-center gap-1 text-red-600 font-bold text-xs bg-red-50 px-2 py-1 rounded">
                                                Wygasł
                                              </span>
                                            )}
                                          </td>
                                          <td className="px-4 py-4 text-right">
                                            <button className="text-slate-400 hover:text-brand-accent transition-colors">
                                              <MoreVertical size={16} />
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <div className="text-center py-8 text-slate-500">
                                  <Users size={48} className="mx-auto mb-3 text-slate-300" />
                                  <p>Brak aktywnych uczestników</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : !isAddingCourse ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-heading font-bold text-brand-dark">Lista Szkoleń</h3>
                    <div className="flex items-center gap-4">
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent font-bold text-sm"
                      >
                        <option value="Wszystkie">Wszystkie kategorie</option>
                        <option value="UDT">UDT</option>
                        <option value="SEP">SEP</option>
                        <option value="BHP">BHP</option>
                        <option value="Inne">Inne</option>
                      </select>
                      <button
                        onClick={() => setIsAddingCourse(true)}
                        className="px-6 py-3 bg-brand-accent text-white font-bold uppercase text-sm rounded-sm hover:bg-brand-accentHover transition-colors flex items-center gap-2"
                      >
                        <GraduationCap size={16} /> Dodaj nowe szkolenie
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {COURSES.filter(c => categoryFilter === 'Wszystkie' || c.category === categoryFilter).map((course) => {
                      const enrolledCount = ADMIN_STUDENTS.filter(s => s.course === course.title).length;
                      
                      return (
                        <div key={course.id} className="bg-white rounded-sm shadow-sm border border-slate-100 hover:shadow-md transition-shadow overflow-hidden">
                          <div className="aspect-[3/2] w-full bg-slate-100">
                            <img 
                              src={course.image} 
                              alt={course.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-5">
                            <h4 className="text-lg font-heading font-bold text-brand-dark mb-3">{course.title}</h4>
                            <div className="flex flex-wrap items-center gap-2 mb-4 text-sm text-slate-600">
                              <span className="px-2 py-1 bg-brand-secondary/10 text-brand-secondary rounded text-xs font-bold uppercase">{course.category}</span>
                              <span>⏱ {course.duration}</span>
                              <span className="font-bold text-brand-primary">{course.price}</span>
                              <span className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-bold">
                                <Users size={12} /> {enrolledCount}
                              </span>
                              {course.isPopular && <span className="px-2 py-1 bg-brand-accent/10 text-brand-accent rounded text-xs font-bold">POPULARNY</span>}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setViewingCourseId(course.id)}
                                className="flex-1 px-3 py-2 text-brand-primary hover:bg-brand-primary/10 rounded transition-colors flex items-center justify-center gap-2 font-bold text-sm"
                                title="Podgląd"
                              >
                                <Eye size={16} /> Podgląd
                              </button>
                              <button
                                onClick={() => handleEditCourse(course)}
                                className="flex-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded transition-colors flex items-center justify-center gap-2 font-bold text-sm"
                                title="Edytuj"
                              >
                                <Edit size={16} /> Edytuj
                              </button>
                              <button
                                onClick={() => handleDeleteCourse(course.id)}
                                className="flex-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded transition-colors flex items-center justify-center gap-2 font-bold text-sm"
                                title="Usuń"
                              >
                                <Trash2 size={16} /> Usuń
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-heading font-bold text-brand-dark">
                      {editingCourseId ? 'Edytuj Szkolenie' : 'Dodaj Nowe Szkolenie'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingCourse(false);
                        setEditingCourseId(null);
                        setIsAddingModule(false);
                        setIsAddingLesson(false);
                        setEditingLessonId(null);
                        setEditingModuleId(null);
                        setCourseForm({
                          title: '',
                          category: 'UDT',
                          duration: '',
                          price: '',
                          image: '',
                          description: '',
                          isPopular: false
                        });
                      }}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); handleSaveCourse(); }} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Tytuł szkolenia</label>
                      <input
                        type="text"
                        value={courseForm.title}
                        onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                        placeholder="np. Operator wózków widłowych"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Kategoria</label>
                        <select
                          value={courseForm.category}
                          onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value as any })}
                          className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                        >
                          <option value="UDT">UDT</option>
                          <option value="SEP">SEP</option>
                          <option value="BHP">BHP</option>
                          <option value="Inne">Inne</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Czas trwania</label>
                        <input
                          type="text"
                          value={courseForm.duration}
                          onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                          placeholder="np. 3 dni"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Cena</label>
                        <input
                          type="text"
                          value={courseForm.price}
                          onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                          placeholder="np. 650 PLN"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">URL zdjęcia</label>
                        <input
                          type="text"
                          value={courseForm.image}
                          onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                          placeholder="/nazwa-pliku.webp"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Opis (opcjonalnie)</label>
                      <textarea
                        value={courseForm.description}
                        onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                        rows={4}
                        placeholder="Krótki opis szkolenia..."
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="isPopular"
                        checked={courseForm.isPopular}
                        onChange={(e) => setCourseForm({ ...courseForm, isPopular: e.target.checked })}
                        className="w-4 h-4 text-brand-accent border-slate-300 rounded focus:ring-brand-accent"
                      />
                      <label htmlFor="isPopular" className="text-sm font-bold text-slate-700">
                        Oznacz jako popularne
                      </label>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-slate-200">
                      <button
                        type="submit"
                        className="px-8 py-3 bg-brand-accent text-white font-bold uppercase text-sm rounded-sm hover:bg-brand-accentHover transition-colors"
                      >
                        {editingCourseId ? 'Zapisz zmiany' : 'Dodaj szkolenie'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingCourse(false);
                          setEditingCourseId(null);
                          setIsAddingModule(false);
                          setIsAddingLesson(false);
                          setEditingLessonId(null);
                          setEditingModuleId(null);
                        }}
                        className="px-8 py-3 border-2 border-slate-300 text-slate-600 font-bold uppercase text-sm rounded-sm hover:bg-slate-50 transition-colors"
                      >
                        Anuluj
                      </button>
                    </div>

                    {/* Struktura szkolenia - Moduły i Lekcje */}
                    {editingCourseId && (
                      <div className="mt-8 pt-8 border-t-2 border-slate-200">
                        <h4 className="text-lg font-heading font-bold text-brand-dark mb-6">Struktura Szkolenia</h4>
                        
                        {isAddingModule ? (
                          // Module Add Form
                          <div className="bg-slate-50 p-6 rounded-sm border border-slate-200 mb-6">
                            <div className="flex justify-between items-center mb-4">
                              <h5 className="text-base font-bold text-brand-dark">
                                Dodaj Nowy Moduł
                              </h5>
                              <button
                                onClick={() => {
                                  setIsAddingModule(false);
                                  setModuleForm({ title: '', description: '' });
                                }}
                                className="text-slate-400 hover:text-slate-600"
                              >
                                <X size={20} />
                              </button>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Tytuł modułu</label>
                                <input
                                  type="text"
                                  value={moduleForm.title}
                                  onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                                  className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                                  placeholder="np. Podstawy obsługi wózków widłowych"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Opis modułu (opcjonalnie)</label>
                                <textarea
                                  value={moduleForm.description}
                                  onChange={(e) => setModuleForm({ ...moduleForm, description: e.target.value })}
                                  className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                                  rows={3}
                                  placeholder="Krótki opis zawartości modułu..."
                                />
                              </div>

                              <div className="flex gap-3 pt-3">
                                <button
                                  type="button"
                                  onClick={() => { console.log('Zapisano moduł', moduleForm); setIsAddingModule(false); }}
                                  className="px-6 py-2 bg-brand-accent text-white font-bold uppercase text-sm rounded-sm hover:bg-brand-accentHover transition-colors"
                                >
                                  Dodaj moduł
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setIsAddingModule(false)}
                                  className="px-6 py-2 border border-slate-300 text-slate-600 font-bold uppercase text-sm rounded-sm hover:bg-slate-50 transition-colors"
                                >
                                  Anuluj
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : isEditingModule ? (
                          // Module Edit Form
                          <div className="bg-slate-50 p-6 rounded-sm border border-slate-200 mb-6">
                            <div className="flex justify-between items-center mb-4">
                              <h5 className="text-base font-bold text-brand-dark">
                                Edytuj Moduł
                              </h5>
                              <button
                                onClick={() => {
                                  setIsEditingModule(false);
                                  setEditingModuleId(null);
                                  setModuleForm({ title: '', description: '' });
                                }}
                                className="text-slate-400 hover:text-slate-600"
                              >
                                <X size={20} />
                              </button>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Tytuł modułu</label>
                                <input
                                  type="text"
                                  value={moduleForm.title}
                                  onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                                  className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                                  placeholder="np. Podstawy obsługi wózków widłowych"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Opis modułu (opcjonalnie)</label>
                                <textarea
                                  value={moduleForm.description}
                                  onChange={(e) => setModuleForm({ ...moduleForm, description: e.target.value })}
                                  className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                                  rows={3}
                                  placeholder="Krótki opis zawartości modułu..."
                                />
                              </div>

                              <div className="flex gap-3 pt-3">
                                <button
                                  type="button"
                                  onClick={() => { console.log('Zaktualizowano moduł', editingModuleId, moduleForm); setIsEditingModule(false); setEditingModuleId(null); }}
                                  className="px-6 py-2 bg-brand-accent text-white font-bold uppercase text-sm rounded-sm hover:bg-brand-accentHover transition-colors"
                                >
                                  Zapisz zmiany
                                </button>
                                <button
                                  type="button"
                                  onClick={() => { setIsEditingModule(false); setEditingModuleId(null); }}
                                  className="px-6 py-2 border border-slate-300 text-slate-600 font-bold uppercase text-sm rounded-sm hover:bg-slate-50 transition-colors"
                                >
                                  Anuluj
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : isAddingLesson ? (
                          // Lesson Add Form
                          <div className="bg-slate-50 p-6 rounded-sm border border-slate-200 mb-6">
                            <div className="flex justify-between items-center mb-4">
                              <h5 className="text-base font-bold text-brand-dark">
                                Dodaj Nową Lekcję
                              </h5>
                              <button
                                onClick={() => {
                                  setIsAddingLesson(false);
                                  setEditingModuleId(null);
                                  setLessonForm({ title: '', duration: '', type: 'video', videoUrl: '', description: '', materials: [], questions: [] });
                                }}
                                className="text-slate-400 hover:text-slate-600"
                              >
                                <X size={20} />
                              </button>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Tytuł lekcji</label>
                                <input
                                  type="text"
                                  value={lessonForm.title}
                                  onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                                  className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                                  placeholder="np. Wprowadzenie do wózków widłowych"
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-bold text-slate-700 mb-2">Typ lekcji</label>
                                  <select
                                    value={lessonForm.type}
                                    onChange={(e) => setLessonForm({ ...lessonForm, type: e.target.value as any })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                                  >
                                    <option value="video">Wideo</option>
                                    <option value="text">Tekst</option>
                                    <option value="test">Test</option>
                                  </select>
                                </div>

                                <div>
                                  <label className="block text-sm font-bold text-slate-700 mb-2">Czas trwania</label>
                                  <input
                                    type="text"
                                    value={lessonForm.duration}
                                    onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                                    placeholder="np. 15 min"
                                  />
                                </div>
                              </div>

                              {lessonForm.type === 'video' && (
                                <div>
                                  <label className="block text-sm font-bold text-slate-700 mb-2">URL wideo</label>
                                  <input
                                    type="text"
                                    value={lessonForm.videoUrl}
                                    onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                                    placeholder="https://youtube.com/watch?v=..."
                                  />
                                </div>
                              )}

                              <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Opis lekcji</label>
                                <textarea
                                  value={lessonForm.description}
                                  onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
                                  className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                                  rows={4}
                                  placeholder="Szczegółowy opis zawartości lekcji..."
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Materiały do pobrania</label>
                                <div className="space-y-2">
                                  {lessonForm.materials.map((material, idx) => (
                                    <div key={idx} className="flex gap-2">
                                      <input
                                        type="text"
                                        value={material.name}
                                        onChange={(e) => {
                                          const newMaterials = [...lessonForm.materials];
                                          newMaterials[idx].name = e.target.value;
                                          setLessonForm({ ...lessonForm, materials: newMaterials });
                                        }}
                                        className="flex-grow px-3 py-2 border border-slate-300 rounded-sm text-sm"
                                        placeholder="Nazwa materiału"
                                      />
                                      <input
                                        type="text"
                                        value={material.url}
                                        onChange={(e) => {
                                          const newMaterials = [...lessonForm.materials];
                                          newMaterials[idx].url = e.target.value;
                                          setLessonForm({ ...lessonForm, materials: newMaterials });
                                        }}
                                        className="flex-grow px-3 py-2 border border-slate-300 rounded-sm text-sm"
                                        placeholder="URL"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const newMaterials = lessonForm.materials.filter((_, i) => i !== idx);
                                          setLessonForm({ ...lessonForm, materials: newMaterials });
                                        }}
                                        className="px-2 py-2 text-red-600 hover:bg-red-50 rounded"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => setLessonForm({ ...lessonForm, materials: [...lessonForm.materials, { name: '', url: '' }] })}
                                    className="text-brand-accent hover:text-brand-accentHover font-bold text-sm flex items-center gap-2"
                                  >
                                    + Dodaj materiał
                                  </button>
                                </div>
                              </div>

                              {lessonForm.type === 'test' && (
                                <div>
                                  <label className="block text-sm font-bold text-slate-700 mb-2">Pytania testowe</label>
                                  <div className="space-y-4">
                                    {lessonForm.questions.map((question, qIdx) => (
                                      <div key={question.id} className="border border-slate-300 rounded-sm p-4 bg-white">
                                        <div className="flex justify-between items-start mb-3">
                                          <span className="text-sm font-bold text-slate-600">Pytanie {qIdx + 1}</span>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const newQuestions = lessonForm.questions.filter((_, i) => i !== qIdx);
                                              setLessonForm({ ...lessonForm, questions: newQuestions });
                                            }}
                                            className="text-red-600 hover:bg-red-50 rounded p-1"
                                          >
                                            <Trash2 size={16} />
                                          </button>
                                        </div>
                                        
                                        <div className="space-y-3">
                                          <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Treść pytania</label>
                                            <input
                                              type="text"
                                              value={question.question}
                                              onChange={(e) => {
                                                const newQuestions = [...lessonForm.questions];
                                                newQuestions[qIdx].question = e.target.value;
                                                setLessonForm({ ...lessonForm, questions: newQuestions });
                                              }}
                                              className="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm"
                                              placeholder="Wprowadź treść pytania"
                                            />
                                          </div>

                                          <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Typ pytania</label>
                                            <select
                                              value={question.type}
                                              onChange={(e) => {
                                                const newQuestions = [...lessonForm.questions];
                                                const newType = e.target.value as 'single' | 'multiple' | 'open';
                                                newQuestions[qIdx].type = newType;
                                                if (newType === 'open') {
                                                  newQuestions[qIdx].options = undefined;
                                                  newQuestions[qIdx].correctAnswer = undefined;
                                                } else {
                                                  newQuestions[qIdx].options = ['', '', '', ''];
                                                  newQuestions[qIdx].correctAnswer = newType === 'single' ? 0 : [];
                                                }
                                                setLessonForm({ ...lessonForm, questions: newQuestions });
                                              }}
                                              className="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm"
                                            >
                                              <option value="single">Jednokrotny wybór</option>
                                              <option value="multiple">Wielokrotny wybór</option>
                                              <option value="open">Pytanie otwarte</option>
                                            </select>
                                          </div>

                                          {(question.type === 'single' || question.type === 'multiple') && (
                                            <div>
                                              <label className="block text-sm font-bold text-slate-700 mb-1">Odpowiedzi</label>
                                              <div className="space-y-2">
                                                {question.options?.map((option, optIdx) => (
                                                  <div key={optIdx} className="flex gap-2 items-center">
                                                    {question.type === 'single' ? (
                                                      <input
                                                        type="radio"
                                                        name={`question-${qIdx}-correct`}
                                                        checked={question.correctAnswer === optIdx}
                                                        onChange={() => {
                                                          const newQuestions = [...lessonForm.questions];
                                                          newQuestions[qIdx].correctAnswer = optIdx;
                                                          setLessonForm({ ...lessonForm, questions: newQuestions });
                                                        }}
                                                        className="w-4 h-4"
                                                      />
                                                    ) : (
                                                      <input
                                                        type="checkbox"
                                                        checked={Array.isArray(question.correctAnswer) && question.correctAnswer.includes(optIdx)}
                                                        onChange={(e) => {
                                                          const newQuestions = [...lessonForm.questions];
                                                          let currentAnswers = Array.isArray(newQuestions[qIdx].correctAnswer) 
                                                            ? [...newQuestions[qIdx].correctAnswer as number[]] 
                                                            : [];
                                                          if (e.target.checked) {
                                                            currentAnswers.push(optIdx);
                                                          } else {
                                                            currentAnswers = currentAnswers.filter(a => a !== optIdx);
                                                          }
                                                          newQuestions[qIdx].correctAnswer = currentAnswers;
                                                          setLessonForm({ ...lessonForm, questions: newQuestions });
                                                        }}
                                                        className="w-4 h-4"
                                                      />
                                                    )}
                                                    <input
                                                      type="text"
                                                      value={option}
                                                      onChange={(e) => {
                                                        const newQuestions = [...lessonForm.questions];
                                                        if (newQuestions[qIdx].options) {
                                                          newQuestions[qIdx].options![optIdx] = e.target.value;
                                                          setLessonForm({ ...lessonForm, questions: newQuestions });
                                                        }
                                                      }}
                                                      className="flex-grow px-3 py-2 border border-slate-300 rounded-sm text-sm"
                                                      placeholder={`Odpowiedź ${optIdx + 1}`}
                                                    />
                                                    {question.options && question.options.length > 2 && (
                                                      <button
                                                        type="button"
                                                        onClick={() => {
                                                          const newQuestions = [...lessonForm.questions];
                                                          newQuestions[qIdx].options = newQuestions[qIdx].options?.filter((_, i) => i !== optIdx);
                                                          if (question.type === 'single' && question.correctAnswer === optIdx) {
                                                            newQuestions[qIdx].correctAnswer = 0;
                                                          } else if (question.type === 'multiple' && Array.isArray(question.correctAnswer)) {
                                                            newQuestions[qIdx].correctAnswer = (question.correctAnswer as number[])
                                                              .filter(a => a !== optIdx)
                                                              .map(a => a > optIdx ? a - 1 : a);
                                                          }
                                                          setLessonForm({ ...lessonForm, questions: newQuestions });
                                                        }}
                                                        className="px-2 py-2 text-red-600 hover:bg-red-50 rounded"
                                                      >
                                                        <Trash2 size={14} />
                                                      </button>
                                                    )}
                                                  </div>
                                                ))}
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    const newQuestions = [...lessonForm.questions];
                                                    if (newQuestions[qIdx].options) {
                                                      newQuestions[qIdx].options!.push('');
                                                    }
                                                    setLessonForm({ ...lessonForm, questions: newQuestions });
                                                  }}
                                                  className="text-brand-accent hover:text-brand-accentHover font-bold text-xs"
                                                >
                                                  + Dodaj odpowiedź
                                                </button>
                                              </div>
                                            </div>
                                          )}

                                          {question.type === 'open' && (
                                            <div className="bg-slate-50 p-3 rounded text-sm text-slate-600">
                                              Pytanie otwarte - uczestnik wpisze odpowiedź własnymi słowami. Wymaga ręcznej oceny.
                                            </div>
                                          )}

                                          <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Wyjaśnienie (opcjonalne)</label>
                                            <textarea
                                              value={question.explanation || ''}
                                              onChange={(e) => {
                                                const newQuestions = [...lessonForm.questions];
                                                newQuestions[qIdx].explanation = e.target.value;
                                                setLessonForm({ ...lessonForm, questions: newQuestions });
                                              }}
                                              className="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm"
                                              rows={2}
                                              placeholder="Wyjaśnienie poprawnej odpowiedzi (wyświetlane po rozwiązaniu testu)"
                                            />
                                          </div>

                                          <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Załącznik multimedialny (opcjonalnie)</label>
                                            <div className="space-y-2">
                                              <input
                                                type="text"
                                                value={question.mediaUrl || ''}
                                                onChange={(e) => {
                                                  const newQuestions = [...lessonForm.questions];
                                                  newQuestions[qIdx].mediaUrl = e.target.value;
                                                  setLessonForm({ ...lessonForm, questions: newQuestions });
                                                }}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm"
                                                placeholder="URL do zdjęcia lub filmu"
                                              />
                                              <select
                                                value={question.mediaType || 'image'}
                                                onChange={(e) => {
                                                  const newQuestions = [...lessonForm.questions];
                                                  newQuestions[qIdx].mediaType = e.target.value as 'image' | 'video';
                                                  setLessonForm({ ...lessonForm, questions: newQuestions });
                                                }}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm"
                                              >
                                                <option value="image">Zdjęcie/Obrazek</option>
                                                <option value="video">Film wideo</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                    
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newQuestion = {
                                          id: `q-${Date.now()}`,
                                          question: '',
                                          type: 'single' as const,
                                          options: ['', '', '', ''],
                                          correctAnswer: 0,
                                          explanation: ''
                                        };
                                        setLessonForm({ ...lessonForm, questions: [...lessonForm.questions, newQuestion] });
                                      }}
                                      className="text-brand-accent hover:text-brand-accentHover font-bold text-sm flex items-center gap-2"
                                    >
                                      + Dodaj pytanie
                                    </button>
                                  </div>
                                </div>
                              )}

                              <div className="flex gap-3 pt-3">
                                <button
                                  type="button"
                                  onClick={() => { 
                                    console.log('Zapisano lekcję do modułu', editingModuleId, lessonForm); 
                                    setIsAddingLesson(false);
                                    setEditingModuleId(null);
                                  }}
                                  className="px-6 py-2 bg-brand-accent text-white font-bold uppercase text-sm rounded-sm hover:bg-brand-accentHover transition-colors"
                                >
                                  Dodaj lekcję
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsAddingLesson(false);
                                    setEditingModuleId(null);
                                  }}
                                  className="px-6 py-2 border border-slate-300 text-slate-600 font-bold uppercase text-sm rounded-sm hover:bg-slate-50 transition-colors"
                                >
                                  Anuluj
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : editingLessonId ? (
                          // Lesson Edit Form
                          <div className="bg-slate-50 p-6 rounded-sm border border-slate-200">
                            <div className="flex justify-between items-center mb-4">
                              <h5 className="text-base font-bold text-brand-dark">
                                Edytuj Lekcję
                              </h5>
                              <button
                                onClick={() => {
                                  setEditingLessonId(null);
                                  setLessonForm({ title: '', duration: '', type: 'video', videoUrl: '', description: '', materials: [], questions: [] });
                                }}
                                className="text-slate-400 hover:text-slate-600"
                              >
                                <X size={20} />
                              </button>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Tytuł lekcji</label>
                                <input
                                  type="text"
                                  value={lessonForm.title}
                                  onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                                  className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                                  placeholder="np. Wprowadzenie do wózków widłowych"
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-bold text-slate-700 mb-2">Typ lekcji</label>
                                  <select
                                    value={lessonForm.type}
                                    onChange={(e) => setLessonForm({ ...lessonForm, type: e.target.value as any })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                                  >
                                    <option value="video">Wideo</option>
                                    <option value="text">Tekst</option>
                                    <option value="test">Test</option>
                                  </select>
                                </div>

                                <div>
                                  <label className="block text-sm font-bold text-slate-700 mb-2">Czas trwania</label>
                                  <input
                                    type="text"
                                    value={lessonForm.duration}
                                    onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                                    placeholder="np. 15 min"
                                  />
                                </div>
                              </div>

                              {lessonForm.type === 'video' && (
                                <div>
                                  <label className="block text-sm font-bold text-slate-700 mb-2">URL wideo</label>
                                  <input
                                    type="text"
                                    value={lessonForm.videoUrl}
                                    onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                                    placeholder="https://youtube.com/watch?v=..."
                                  />
                                </div>
                              )}

                              <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Opis lekcji</label>
                                <textarea
                                  value={lessonForm.description}
                                  onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
                                  className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:outline-none focus:border-brand-accent"
                                  rows={4}
                                  placeholder="Szczegółowy opis zawartości lekcji..."
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Materiały do pobrania</label>
                                <div className="space-y-2">
                                  {lessonForm.materials.map((material, idx) => (
                                    <div key={idx} className="flex gap-2">
                                      <input
                                        type="text"
                                        value={material.name}
                                        onChange={(e) => {
                                          const newMaterials = [...lessonForm.materials];
                                          newMaterials[idx].name = e.target.value;
                                          setLessonForm({ ...lessonForm, materials: newMaterials });
                                        }}
                                        className="flex-grow px-3 py-2 border border-slate-300 rounded-sm text-sm"
                                        placeholder="Nazwa materiału"
                                      />
                                      <input
                                        type="text"
                                        value={material.url}
                                        onChange={(e) => {
                                          const newMaterials = [...lessonForm.materials];
                                          newMaterials[idx].url = e.target.value;
                                          setLessonForm({ ...lessonForm, materials: newMaterials });
                                        }}
                                        className="flex-grow px-3 py-2 border border-slate-300 rounded-sm text-sm"
                                        placeholder="URL"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const newMaterials = lessonForm.materials.filter((_, i) => i !== idx);
                                          setLessonForm({ ...lessonForm, materials: newMaterials });
                                        }}
                                        className="px-2 py-2 text-red-600 hover:bg-red-50 rounded"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => setLessonForm({ ...lessonForm, materials: [...lessonForm.materials, { name: '', url: '' }] })}
                                    className="text-brand-accent hover:text-brand-accentHover font-bold text-sm flex items-center gap-2"
                                  >
                                    + Dodaj materiał
                                  </button>
                                </div>
                              </div>

                              {lessonForm.type === 'test' && (
                                <div>
                                  <label className="block text-sm font-bold text-slate-700 mb-2">Pytania testowe</label>
                                  <div className="space-y-4">
                                    {lessonForm.questions.map((question, qIdx) => (
                                      <div key={question.id} className="border border-slate-300 rounded-sm p-4 bg-white">
                                        <div className="flex justify-between items-start mb-3">
                                          <span className="text-sm font-bold text-slate-600">Pytanie {qIdx + 1}</span>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const newQuestions = lessonForm.questions.filter((_, i) => i !== qIdx);
                                              setLessonForm({ ...lessonForm, questions: newQuestions });
                                            }}
                                            className="text-red-600 hover:bg-red-50 rounded p-1"
                                          >
                                            <Trash2 size={16} />
                                          </button>
                                        </div>
                                        
                                        <div className="space-y-3">
                                          <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Treść pytania</label>
                                            <input
                                              type="text"
                                              value={question.question}
                                              onChange={(e) => {
                                                const newQuestions = [...lessonForm.questions];
                                                newQuestions[qIdx].question = e.target.value;
                                                setLessonForm({ ...lessonForm, questions: newQuestions });
                                              }}
                                              className="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm"
                                              placeholder="Wprowadź treść pytania"
                                            />
                                          </div>

                                          <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Typ pytania</label>
                                            <select
                                              value={question.type}
                                              onChange={(e) => {
                                                const newQuestions = [...lessonForm.questions];
                                                const newType = e.target.value as 'single' | 'multiple' | 'open';
                                                newQuestions[qIdx].type = newType;
                                                if (newType === 'open') {
                                                  newQuestions[qIdx].options = undefined;
                                                  newQuestions[qIdx].correctAnswer = undefined;
                                                } else {
                                                  newQuestions[qIdx].options = ['', '', '', ''];
                                                  newQuestions[qIdx].correctAnswer = newType === 'single' ? 0 : [];
                                                }
                                                setLessonForm({ ...lessonForm, questions: newQuestions });
                                              }}
                                              className="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm"
                                            >
                                              <option value="single">Jednokrotny wybór</option>
                                              <option value="multiple">Wielokrotny wybór</option>
                                              <option value="open">Pytanie otwarte</option>
                                            </select>
                                          </div>

                                          {(question.type === 'single' || question.type === 'multiple') && (
                                            <div>
                                              <label className="block text-sm font-bold text-slate-700 mb-1">Odpowiedzi</label>
                                              <div className="space-y-2">
                                                {question.options?.map((option, optIdx) => (
                                                  <div key={optIdx} className="flex gap-2 items-center">
                                                    {question.type === 'single' ? (
                                                      <input
                                                        type="radio"
                                                        name={`question-${qIdx}-correct`}
                                                        checked={question.correctAnswer === optIdx}
                                                        onChange={() => {
                                                          const newQuestions = [...lessonForm.questions];
                                                          newQuestions[qIdx].correctAnswer = optIdx;
                                                          setLessonForm({ ...lessonForm, questions: newQuestions });
                                                        }}
                                                        className="w-4 h-4"
                                                      />
                                                    ) : (
                                                      <input
                                                        type="checkbox"
                                                        checked={Array.isArray(question.correctAnswer) && question.correctAnswer.includes(optIdx)}
                                                        onChange={(e) => {
                                                          const newQuestions = [...lessonForm.questions];
                                                          let currentAnswers = Array.isArray(newQuestions[qIdx].correctAnswer) 
                                                            ? [...newQuestions[qIdx].correctAnswer as number[]] 
                                                            : [];
                                                          if (e.target.checked) {
                                                            currentAnswers.push(optIdx);
                                                          } else {
                                                            currentAnswers = currentAnswers.filter(a => a !== optIdx);
                                                          }
                                                          newQuestions[qIdx].correctAnswer = currentAnswers;
                                                          setLessonForm({ ...lessonForm, questions: newQuestions });
                                                        }}
                                                        className="w-4 h-4"
                                                      />
                                                    )}
                                                    <input
                                                      type="text"
                                                      value={option}
                                                      onChange={(e) => {
                                                        const newQuestions = [...lessonForm.questions];
                                                        if (newQuestions[qIdx].options) {
                                                          newQuestions[qIdx].options![optIdx] = e.target.value;
                                                          setLessonForm({ ...lessonForm, questions: newQuestions });
                                                        }
                                                      }}
                                                      className="flex-grow px-3 py-2 border border-slate-300 rounded-sm text-sm"
                                                      placeholder={`Odpowiedź ${optIdx + 1}`}
                                                    />
                                                    {question.options && question.options.length > 2 && (
                                                      <button
                                                        type="button"
                                                        onClick={() => {
                                                          const newQuestions = [...lessonForm.questions];
                                                          newQuestions[qIdx].options = newQuestions[qIdx].options?.filter((_, i) => i !== optIdx);
                                                          if (question.type === 'single' && question.correctAnswer === optIdx) {
                                                            newQuestions[qIdx].correctAnswer = 0;
                                                          } else if (question.type === 'multiple' && Array.isArray(question.correctAnswer)) {
                                                            newQuestions[qIdx].correctAnswer = (question.correctAnswer as number[])
                                                              .filter(a => a !== optIdx)
                                                              .map(a => a > optIdx ? a - 1 : a);
                                                          }
                                                          setLessonForm({ ...lessonForm, questions: newQuestions });
                                                        }}
                                                        className="px-2 py-2 text-red-600 hover:bg-red-50 rounded"
                                                      >
                                                        <Trash2 size={14} />
                                                      </button>
                                                    )}
                                                  </div>
                                                ))}
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    const newQuestions = [...lessonForm.questions];
                                                    if (newQuestions[qIdx].options) {
                                                      newQuestions[qIdx].options!.push('');
                                                    }
                                                    setLessonForm({ ...lessonForm, questions: newQuestions });
                                                  }}
                                                  className="text-brand-accent hover:text-brand-accentHover font-bold text-xs"
                                                >
                                                  + Dodaj odpowiedź
                                                </button>
                                              </div>
                                            </div>
                                          )}

                                          {question.type === 'open' && (
                                            <div className="bg-slate-50 p-3 rounded text-sm text-slate-600">
                                              Pytanie otwarte - uczestnik wpisze odpowiedź własnymi słowami. Wymaga ręcznej oceny.
                                            </div>
                                          )}

                                          <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Wyjaśnienie (opcjonalne)</label>
                                            <textarea
                                              value={question.explanation || ''}
                                              onChange={(e) => {
                                                const newQuestions = [...lessonForm.questions];
                                                newQuestions[qIdx].explanation = e.target.value;
                                                setLessonForm({ ...lessonForm, questions: newQuestions });
                                              }}
                                              className="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm"
                                              rows={2}
                                              placeholder="Wyjaśnienie poprawnej odpowiedzi (wyświetlane po rozwiązaniu testu)"
                                            />
                                          </div>

                                          <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Załącznik multimedialny (opcjonalnie)</label>
                                            <div className="space-y-2">
                                              <input
                                                type="text"
                                                value={question.mediaUrl || ''}
                                                onChange={(e) => {
                                                  const newQuestions = [...lessonForm.questions];
                                                  newQuestions[qIdx].mediaUrl = e.target.value;
                                                  setLessonForm({ ...lessonForm, questions: newQuestions });
                                                }}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm"
                                                placeholder="URL do zdjęcia lub filmu"
                                              />
                                              <select
                                                value={question.mediaType || 'image'}
                                                onChange={(e) => {
                                                  const newQuestions = [...lessonForm.questions];
                                                  newQuestions[qIdx].mediaType = e.target.value as 'image' | 'video';
                                                  setLessonForm({ ...lessonForm, questions: newQuestions });
                                                }}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm"
                                              >
                                                <option value="image">Zdjęcie/Obrazek</option>
                                                <option value="video">Film wideo</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                    
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newQuestion = {
                                          id: `q-${Date.now()}`,
                                          question: '',
                                          type: 'single' as const,
                                          options: ['', '', '', ''],
                                          correctAnswer: 0,
                                          explanation: ''
                                        };
                                        setLessonForm({ ...lessonForm, questions: [...lessonForm.questions, newQuestion] });
                                      }}
                                      className="text-brand-accent hover:text-brand-accentHover font-bold text-sm flex items-center gap-2"
                                    >
                                      + Dodaj pytanie
                                    </button>
                                  </div>
                                </div>
                              )}

                              <div className="flex gap-3 pt-3">
                                <button
                                  type="button"
                                  onClick={() => { console.log('Zapisano lekcję', lessonForm); setEditingLessonId(null); }}
                                  className="px-6 py-2 bg-brand-accent text-white font-bold uppercase text-sm rounded-sm hover:bg-brand-accentHover transition-colors"
                                >
                                  Zapisz lekcję
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingLessonId(null)}
                                  className="px-6 py-2 border border-slate-300 text-slate-600 font-bold uppercase text-sm rounded-sm hover:bg-slate-50 transition-colors"
                                >
                                  Anuluj
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Modules and Lessons List
                          <div className="space-y-4">
                            {COURSE_CURRICULUM.map((module, moduleIdx) => (
                              <div key={module.id} className="bg-white rounded-sm border border-slate-200 overflow-hidden">
                                <div className="bg-brand-primary/5 p-4 border-b border-slate-200">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h5 className="text-base font-bold text-brand-dark">
                                        Moduł {moduleIdx + 1}: {module.title}
                                      </h5>
                                      <p className="text-sm text-slate-600">{module.lessons.length} lekcji</p>
                                    </div>
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => {
                                          setIsEditingModule(true);
                                          setEditingModuleId(module.id);
                                          setModuleForm({ title: module.title, description: module.description || '' });
                                        }}
                                        className="px-3 py-1.5 text-brand-accent hover:bg-brand-accent/10 rounded font-bold text-sm flex items-center gap-2"
                                      >
                                        <Edit size={14} /> Edytuj moduł
                                      </button>
                                      <button className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded font-bold text-sm flex items-center gap-2">
                                        <Trash2 size={14} /> Usuń
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                <div className="p-4 space-y-2">
                                  {module.lessons.map((lesson, lessonIdx) => (
                                    <div key={lesson.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-sm hover:bg-slate-100 transition-colors">
                                      <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent font-bold text-xs">
                                          {lessonIdx + 1}
                                        </div>
                                        <div>
                                          <h6 className="font-bold text-brand-dark text-sm">{lesson.title}</h6>
                                          <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <span className="flex items-center gap-1">
                                              <Clock size={12} /> {lesson.duration}
                                            </span>
                                            <span className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-bold uppercase">
                                              {lesson.type === 'video' ? 'Wideo' : lesson.type === 'test' ? 'Test' : 'Tekst'}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex gap-2">
                                        <button
                                          onClick={() => {
                                            setIsFromAdmin(true);
                                            setAdminEditingCourseId(editingCourseId);
                                            setView('LESSON_PLAYER');
                                          }}
                                          className="px-2 py-1.5 text-brand-primary hover:bg-brand-primary/10 rounded font-bold text-xs flex items-center gap-1"
                                        >
                                          <Eye size={14} /> Podgląd
                                        </button>
                                        <button
                                          onClick={() => {
                                            setEditingLessonId(lesson.id);
                                            setEditingModuleId(module.id);
                                            setLessonForm({
                                              title: lesson.title,
                                              duration: lesson.duration,
                                              type: lesson.type,
                                              videoUrl: '',
                                              description: '',
                                              materials: [],
                                              questions: lesson.questions || []
                                            });
                                          }}
                                          className="px-2 py-1.5 text-blue-600 hover:bg-blue-50 rounded font-bold text-xs flex items-center gap-1"
                                        >
                                          <Edit size={14} /> Edytuj
                                        </button>
                                        <button className="px-2 py-1.5 text-red-600 hover:bg-red-50 rounded font-bold text-xs flex items-center gap-1">
                                          <Trash2 size={14} /> Usuń
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                  
                                  <button 
                                    onClick={() => {
                                      setIsAddingLesson(true);
                                      setEditingModuleId(module.id);
                                      setLessonForm({ title: '', duration: '', type: 'video', videoUrl: '', description: '', materials: [] });
                                    }}
                                    className="w-full p-3 border-2 border-dashed border-slate-300 rounded-sm text-brand-accent hover:border-brand-accent hover:bg-brand-accent/5 transition-colors font-bold text-sm flex items-center justify-center gap-2"
                                  >
                                    + Dodaj lekcję do modułu
                                  </button>
                                </div>
                              </div>
                            ))}

                            <button 
                              onClick={() => {
                                setIsAddingModule(true);
                                setModuleForm({ title: '', description: '' });
                              }}
                              className="w-full p-4 border-2 border-dashed border-brand-accent rounded-sm text-brand-accent hover:bg-brand-accent/5 transition-colors font-bold flex items-center justify-center gap-2"
                            >
                              <GraduationCap size={20} /> Dodaj nowy moduł
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>
          )}

          {/* Students List Tab */}
          {activeTab === 'students' && (
            <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-brand-dark mb-2">
                    {selectedCompany ? `Kursanci z firmy: ${selectedCompany}` : 'Lista wszystkich kursantów'}
                  </h3>
                  <p className="text-slate-500">
                    {selectedCompany 
                      ? 'Kliknij przycisk poniżej, aby zobaczyć wszystkich kursantów'
                      : 'Przegląd wszystkich zarejestrowanych uczestników i ich postępów w szkoleniach'}
                  </p>
                  {selectedCompany && (
                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={() => setSelectedCompany(null)}
                        className="px-4 py-2.5 bg-slate-200 text-slate-700 font-bold text-sm rounded hover:bg-slate-300 transition-colors"
                      >
                        Pokaż wszystkich kursantów
                      </button>
                      <button
                        onClick={() => {
                          // Zbierz wszystkich studentów z wybranej firmy
                          const companyStudents = ADMIN_STUDENTS.filter(s => s.company === selectedCompany);
                          
                          // Grupuj po unikalnych osobach
                          const studentsMap = new Map<string, typeof ADMIN_STUDENTS>();
                          companyStudents.forEach(student => {
                            const key = `${student.name}-${student.email}`;
                            if (!studentsMap.has(key)) {
                              studentsMap.set(key, []);
                            }
                            studentsMap.get(key)!.push(student);
                          });
                          
                          // Generuj raport
                          let reportContent = `RAPORT ZBIORCZY - ${selectedCompany}\n`;
                          reportContent += `Data wygenerowania: ${new Date().toLocaleDateString('pl-PL')}\n`;
                          reportContent += `Liczba kursantów: ${studentsMap.size}\n\n`;
                          reportContent += `${'='.repeat(80)}\n\n`;
                          
                          Array.from(studentsMap.entries()).forEach(([key, enrollments], index) => {
                            const firstEnrollment = enrollments[0];
                            reportContent += `${index + 1}. ${firstEnrollment.name}\n`;
                            reportContent += `   Email: ${firstEnrollment.email}\n`;
                            reportContent += `   Firma: ${firstEnrollment.company || 'Nie przypisano'}\n`;
                            reportContent += `   Liczba szkoleń: ${enrollments.length}\n\n`;
                            
                            enrollments.forEach((enrollment, idx) => {
                              const course = COURSES.find(c => c.id === enrollment.course);
                              reportContent += `   ${idx + 1}. ${course?.title || 'Nieznany kurs'}\n`;
                              reportContent += `      Postęp: ${enrollment.progress}%\n`;
                              reportContent += `      Status: ${enrollment.status === 'active' ? 'Aktywny' : enrollment.status === 'completed' ? 'Ukończony' : 'Wygasły'}\n`;
                              reportContent += `      Ważność: ${enrollment.expirationDays} dni\n`;
                              reportContent += `      Ukończone lekcje: ${enrollment.completedLessons}/${course?.lessons.length || 0}\n\n`;
                            });
                            
                            reportContent += `${'-'.repeat(80)}\n\n`;
                          });
                          
                          // Pobierz raport jako plik tekstowy
                          const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
                          const url = window.URL.createObjectURL(blob);
                          const link = document.createElement('a');
                          link.href = url;
                          link.download = `raport_${selectedCompany.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          window.URL.revokeObjectURL(url);
                          
                          alert(`Raport zbiorczy dla firmy "${selectedCompany}" został wygenerowany i pobrany.`);
                        }}
                        className="px-4 py-2.5 bg-brand-primary text-white font-bold text-sm rounded hover:bg-brand-primaryHover transition-colors flex items-center gap-2"
                      >
                        <Printer size={16} /> Generuj raport zbiorczy
                      </button>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-3xl font-heading font-black text-brand-primary">
                    {(() => {
                      const filteredStudents = selectedCompany 
                        ? ADMIN_STUDENTS.filter(s => s.company === selectedCompany)
                        : ADMIN_STUDENTS;
                      
                      // Grupuj po name+email aby liczyć unikalne osoby
                      const uniqueStudents = new Set(
                        filteredStudents.map(s => `${s.name}-${s.email}`)
                      );
                      
                      return uniqueStudents.size;
                    })()}
                  </p>
                  <p className="text-xs text-slate-500 font-bold uppercase">Kursantów</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-600">
                  <thead className="text-xs text-slate-400 uppercase bg-slate-50 border-b-2 border-slate-200">
                    <tr>
                      <th className="px-4 py-3 font-bold tracking-wider">Imię i Nazwisko</th>
                      <th className="px-4 py-3 font-bold tracking-wider">Email</th>
                      <th className="px-4 py-3 font-bold tracking-wider">Firma</th>
                      <th className="px-4 py-3 font-bold tracking-wider">Szkolenia</th>
                      <th className="px-4 py-3 font-bold tracking-wider text-center">Akcje</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(() => {
                      // Filtruj kursantów po firmie jeśli wybrana
                      const filteredStudents = selectedCompany 
                        ? ADMIN_STUDENTS.filter(s => s.company === selectedCompany)
                        : ADMIN_STUDENTS;
                      
                      // Grupuj kursantów po ID (unikalny email/imię)
                      const studentsMap = new Map<string, typeof ADMIN_STUDENTS>();
                      
                      filteredStudents.forEach(student => {
                        const key = `${student.name}-${student.email}`;
                        if (!studentsMap.has(key)) {
                          studentsMap.set(key, []);
                        }
                        studentsMap.get(key)!.push(student);
                      });

                      return Array.from(studentsMap.entries()).map(([key, enrollments]) => {
                        const firstEnrollment = enrollments[0];
                        
                        return (
                          <tr key={key} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-4">
                              <button
                                onClick={() => {
                                  setViewingStudentId(firstEnrollment.id);
                                  setView('STUDENT_DETAIL');
                                }}
                                className="font-bold text-brand-dark hover:text-brand-accent transition-colors"
                              >
                                {firstEnrollment.name}
                              </button>
                            </td>
                            <td className="px-4 py-4 text-slate-500">{firstEnrollment.email}</td>
                            <td className="px-4 py-4">
                              <button
                                onClick={() => setSelectedCompany(firstEnrollment.company || null)}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-bold hover:bg-brand-primary hover:text-white transition-colors cursor-pointer"
                              >
                                {firstEnrollment.company || 'Brak danych'}
                              </button>
                            </td>
                            <td className="px-4 py-4">
                              <div className="space-y-2">
                                {enrollments.map((enrollment, idx) => {
                                  const course = COURSES.find(c => c.id === enrollment.course);
                                  if (!course) return null;

                                  return (
                                    <div key={idx} className="flex items-center gap-3">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="font-bold text-slate-700 text-sm">{course.title}</span>
                                          <span className="px-2 py-0.5 bg-brand-secondary/10 text-brand-secondary rounded font-bold uppercase text-xs">
                                            {course.category}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                          <span className="px-2 py-1 bg-brand-primary text-white font-bold rounded">{enrollment.progress}%</span>
                                          <span className="text-slate-300">•</span>
                                          {enrollment.expirationDays > 5 ? (
                                            <span className="text-green-600 font-bold">
                                              {enrollment.expirationDays} dni dostępu
                                            </span>
                                          ) : enrollment.expirationDays > 0 ? (
                                            <span className="inline-flex items-center gap-1 text-yellow-600 font-bold">
                                              <AlertCircle size={12}/> {enrollment.expirationDays} dni
                                            </span>
                                          ) : (
                                            <span className="text-red-600 font-bold">
                                              Wygasł
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <button
                                onClick={() => {
                                  setViewingStudentId(firstEnrollment.id);
                                  setView('STUDENT_DETAIL');
                                }}
                                className="px-3 py-1.5 bg-brand-accent text-white font-bold text-xs rounded hover:bg-brand-accentHover transition-colors inline-flex items-center gap-1"
                              >
                                <Eye size={14} /> Zobacz profil
                              </button>
                            </td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  };

  const LMSView = () => (
    <div className="min-h-[calc(100vh-200px)] bg-slate-50 py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl font-heading font-bold text-brand-primary mb-2">Panel Uczestnika</h2>
            <p className="text-slate-500">Witaj ponownie, Jan. Kontynuuj naukę.</p>
          </div>
          <div className="mt-4 md:mt-0 bg-white px-4 py-2 rounded shadow-sm border border-slate-100 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-sm font-bold text-slate-700">Status konta: Aktywne</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Course Content */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-brand-dark flex items-center gap-2">
              <Play size={20} className="text-brand-accent" /> Moje Aktywne Szkolenia
            </h3>
            
            {MY_COURSES.map((userCourse) => {
              const courseDetails = COURSES.find(c => c.id === userCourse.courseId);
              if (!courseDetails) return null;

              return (
                <div key={userCourse.id} className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-brand-accent">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-heading font-bold text-lg text-brand-dark">{courseDetails.title}</h4>
                      <p className="text-sm text-slate-500 mt-1">Ostatnia lekcja: {userCourse.nextLesson}</p>
                    </div>
                    {userCourse.status === 'completed' ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase flex items-center gap-1"><CheckCircle size={12}/> Ukończony</span>
                    ) : (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded uppercase">W toku</span>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                      <span>Postęp</span>
                      <span>{userCourse.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-brand-accent h-2 rounded-full transition-all duration-1000" style={{ width: `${userCourse.progress}%` }}></div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        setIsFromAdmin(false);
                        setView('LESSON_PLAYER');
                      }}
                      className="flex-1 bg-brand-primary text-white py-2 text-sm font-bold rounded-sm hover:bg-brand-dark transition-colors"
                    >
                      {userCourse.status === 'completed' ? 'Powtórz materiał' : 'Kontynuuj naukę'}
                    </button>
                    {userCourse.status === 'completed' && (
                       <button className="flex-1 border border-brand-primary text-brand-primary rounded-sm hover:bg-brand-surface flex items-center justify-center gap-2 py-2 text-sm font-bold">
                         <Download size={18} /> Pobierz certyfikat
                       </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
             <div className="bg-brand-primary text-white p-6 rounded-sm shadow-lg">
                <div className="mb-6">
                   <div className="font-bold text-lg">Jan Kowalski</div>
                   <div className="text-sm text-slate-300">ABC Transport Sp. z o.o.</div>
                </div>
                <div className="space-y-3">
                   <div className="flex justify-between text-sm py-2 border-b border-white/10">
                     <span className="text-slate-300">Ukończone szkolenia</span>
                     <span className="font-bold">2</span>
                   </div>
                   <div className="flex justify-between text-sm py-2 border-b border-white/10">
                     <span className="text-slate-300">Certyfikaty</span>
                     <span className="font-bold">1</span>
                   </div>
                   <div className="flex justify-between text-sm py-2">
                     <span className="text-slate-300">Ważność uprawnień</span>
                     <span className="font-bold text-green-400">2026</span>
                   </div>
                </div>
             </div>

             <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-100">
               <h4 className="font-bold text-brand-dark mb-4 flex items-center gap-2"><Star size={16} className="text-yellow-500"/> Polecane dla Ciebie</h4>
               <div className="space-y-4">
                 <div className="flex gap-3 items-start cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors">
                   <div className="w-10 h-10 bg-slate-200 rounded flex-shrink-0 overflow-hidden">
                     <img src="https://picsum.photos/100/100?random=8" className="w-full h-full object-cover"/>
                   </div>
                   <div>
                     <div className="text-sm font-bold text-brand-dark leading-tight">Szkolenie pierwszej pomocy</div>
                     <div className="text-xs text-brand-accent mt-1">4h • Online</div>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactView = () => (
    <div className="py-12 bg-brand-surface animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <SectionHeader title="Skontaktuj się" subtitle="Jesteśmy do dyspozycji" />
        
        <div className="bg-white shadow-xl rounded-sm overflow-hidden flex flex-col md:flex-row">
           <div className="md:w-1/3 bg-brand-dark p-8 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-heading font-bold mb-6">Dane kontaktowe</h3>
                <div className="space-y-6 text-base">
                  <div>
                    <span className="text-brand-accent block text-xs uppercase font-bold mb-1">Infolinia</span>
                    <span className="text-lg">+48 730 101 000</span>
                  </div>
                  <div>
                    <span className="text-brand-accent block text-xs uppercase font-bold mb-1">Email</span>
                    <span>biuro@multiserwis.pl</span>
                  </div>
                  <div>
                    <span className="text-brand-accent block text-xs uppercase font-bold mb-1">Adres</span>
                    <span>ul. Siemieradzkiego 18<br/>99-300 Kutno</span>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                 <div className="w-full h-32 bg-slate-700 rounded opacity-50 flex items-center justify-center text-xs">
                    [Mapa Google]
                 </div>
              </div>
           </div>
           
           <div className="md:w-2/3 p-8">
             <h3 className="text-xl font-heading font-bold text-brand-dark mb-6">Napisz do nas</h3>
             <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Imię</label>
                   <input type="text" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-sm focus:outline-none focus:border-brand-accent transition-colors text-base" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nazwisko</label>
                   <input type="text" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-sm focus:outline-none focus:border-brand-accent transition-colors text-base" />
                 </div>
               </div>
               <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
                   <input type="email" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-sm focus:outline-none focus:border-brand-accent transition-colors text-base" />
               </div>
               <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Wiadomość</label>
                   <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-sm focus:outline-none focus:border-brand-accent transition-colors text-base"></textarea>
               </div>
               <button className="px-8 py-3 bg-brand-primary text-white font-bold uppercase tracking-wider rounded-sm hover:bg-brand-secondary transition-colors">
                 Wyślij wiadomość
               </button>
             </form>
           </div>
        </div>
      </div>
    </div>
  );

  const StudentDetailView = () => {
    if (!viewingStudentId) return null;
    
    const student = ADMIN_STUDENTS.find(s => s.id === viewingStudentId);
    if (!student) return null;

    // Stany dla edycji czasu dostępu
    const [editingAccessFor, setEditingAccessFor] = useState<string | null>(null); // enrollment.id
    const [accessEditMode, setAccessEditMode] = useState<'add' | 'set'>('add'); // 'add' = dodaj dni, 'set' = ustaw datę
    const [daysToAdd, setDaysToAdd] = useState<number>(30);
    const [targetDate, setTargetDate] = useState<string>('');

    // Pobierz wszystkie kursy dla tego studenta (po name + email)
    const allStudentEnrollments = ADMIN_STUDENTS.filter(s => 
      s.name === student.name && s.email === student.email
    );
    const course = COURSES.find(c => c.id === student.course);

    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <button
            onClick={() => {
              if (selectedCompany) {
                // Jeśli jest aktywny filtr firmy, wróć do listy kursantów z tym filtrem
                setView('ADMIN');
                setViewingStudentId(null);
                setAdminActiveTab('students');
              } else {
                // W przeciwnym razie wróć do głównego panelu
                setView('ADMIN');
                setViewingStudentId(null);
              }
            }}
            className="mb-6 flex items-center gap-2 text-brand-primary hover:text-brand-accent transition-colors font-bold"
          >
            <ChevronRight className="rotate-180" size={20} />
            {selectedCompany ? 'Powrót do listy kursantów' : 'Powrót do panelu'}
          </button>

          <div className="bg-white rounded-sm shadow-sm border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-primary to-brand-dark text-white p-8">
              <div>
                <h1 className="text-3xl font-heading font-bold mb-2">{student.name}</h1>
                <p className="text-white/80 flex items-center gap-2 mb-2">
                  <span>{student.email}</span>
                </p>
                {student.company && (
                  <p className="text-white/70 flex items-center gap-2 text-sm">
                    <span className="px-3 py-1 bg-white/20 rounded-sm font-bold">{student.company}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Student Courses */}
            <div className="p-8">
              <h2 className="text-2xl font-heading font-bold text-brand-dark mb-6">Przypisane szkolenia ({allStudentEnrollments.length})</h2>
              
              <div className="space-y-4">
                {allStudentEnrollments.map((enrollment) => {
                  const enrolledCourse = COURSES.find(c => c.id === enrollment.course);
                  if (!enrolledCourse) return null;

                  // Get curriculum for this course to show lesson progress
                  const courseCurriculum = COURSE_CURRICULUM.filter(m => m.courseId === enrolledCourse.id);
                  const totalLessons = courseCurriculum.reduce((sum, module) => sum + module.lessons.length, 0);
                  const completedLessons = enrollment.completedLessons.length;

                  return (
                    <div key={`${enrollment.id}-${enrollment.course}`} className="border border-slate-200 rounded-sm overflow-hidden">
                      <div className="flex items-start">
                        {/* Course Image */}
                        <div className="w-32 h-48 bg-slate-200 flex-shrink-0">
                          <img src={enrolledCourse.image} alt={enrolledCourse.title} className="w-full h-full object-cover" />
                        </div>

                        {/* Course Info */}
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-heading font-bold text-brand-dark mb-2">{enrolledCourse.title}</h3>
                              <div className="flex items-center gap-3 text-sm text-slate-600">
                                <span className="px-2 py-0.5 bg-brand-secondary/10 text-brand-secondary rounded font-bold uppercase text-xs">
                                  {enrolledCourse.category}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock size={14} /> {enrolledCourse.duration}
                                </span>
                              </div>
                            </div>

                            {/* Status Badge and Access Time Edit */}
                            <div className="flex items-center gap-3">
                              <div>
                                {enrollment.expirationDays > 5 ? (
                                  <span className="inline-flex items-center gap-1 text-green-600 font-bold text-sm bg-green-50 px-3 py-1.5 rounded">
                                    Ważne przez {enrollment.expirationDays} dni
                                  </span>
                                ) : enrollment.expirationDays > 0 ? (
                                  <span className="inline-flex items-center gap-1 text-yellow-600 font-bold text-sm bg-yellow-50 px-3 py-1.5 rounded">
                                    <AlertCircle size={14}/> Wygasa za {enrollment.expirationDays} dni
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-red-600 font-bold text-sm bg-red-50 px-3 py-1.5 rounded">
                                    Wygasł
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingAccessFor(enrollment.id);
                                  // Ustaw domyślną datę na 30 dni od teraz
                                  const futureDate = new Date();
                                  futureDate.setDate(futureDate.getDate() + 30);
                                  setTargetDate(futureDate.toISOString().split('T')[0]);
                                }}
                                className="p-2 text-slate-400 hover:text-brand-accent hover:bg-slate-50 rounded transition-colors"
                                title="Edytuj czas dostępu"
                              >
                                <Edit size={16} />
                              </button>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-bold text-slate-700">Postęp w szkoleniu</span>
                              <span className="text-sm font-bold text-brand-primary">{enrollment.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-brand-primary to-brand-accent h-3 rounded-full transition-all duration-300"
                                style={{ width: `${enrollment.progress}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Stats Grid */}
                          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 mb-4">
                            <div className="text-center">
                              <p className="text-2xl font-heading font-black text-brand-primary">{enrollment.progress}%</p>
                              <p className="text-xs text-slate-500 font-bold">Ukończone</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-heading font-black text-slate-600">
                                {enrollment.expirationDays > 0 ? enrollment.expirationDays : 0}
                              </p>
                              <p className="text-xs text-slate-500 font-bold">Dni dostępu</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-heading font-black text-teal-600">
                                {completedLessons}/{totalLessons}
                              </p>
                              <p className="text-xs text-slate-500 font-bold">Lekcji ukończono</p>
                            </div>
                          </div>

                          {/* Lesson Progress Details */}
                          <details className="group">
                            <summary className="cursor-pointer list-none flex items-center justify-between py-2 px-3 bg-slate-50 hover:bg-slate-100 rounded transition-colors">
                              <span className="font-bold text-sm text-brand-dark flex items-center gap-2">
                                <BookOpen size={16} />
                                Szczegółowe postępy ({completedLessons}/{totalLessons} lekcji)
                              </span>
                              <ChevronRight size={16} className="text-slate-400 group-open:rotate-90 transition-transform" />
                            </summary>
                            <div className="mt-3 space-y-3">
                              {courseCurriculum.map((module, moduleIndex) => (
                                <div key={module.id} className="border border-slate-200 rounded-sm overflow-hidden">
                                  <div className="bg-slate-50 px-4 py-2 font-bold text-sm text-brand-dark">
                                    Moduł {moduleIndex + 1}: {module.title}
                                  </div>
                                  <div className="p-3 space-y-2">
                                    {module.lessons.map((lesson, lessonIndex) => {
                                      // Check if this specific lesson is completed
                                      const isCompleted = enrollment.completedLessons.includes(lesson.id);
                                      
                                      return (
                                        <div key={lesson.id} className="flex items-center gap-3 text-sm py-1">
                                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            isCompleted ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
                                          }`}>
                                            {isCompleted ? '✓' : '○'}
                                          </div>
                                          <span className={`flex-grow ${isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                                            {lesson.title}
                                          </span>
                                          <span className="text-xs text-slate-400">{lesson.duration}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </details>

                          {/* Action Buttons */}
                          <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                            <button
                              onClick={() => {
                                console.log('Generowanie raportu dla:', { student: enrollment.id, course: enrollment.course });
                                alert(`Generowanie raportu PDF dla:\nKursant: ${student.name}\nSzkolenie: ${enrolledCourse.title}\nPostęp: ${enrollment.progress}%\nW pełnej wersji zostanie wygenerowany i pobrany plik PDF`);
                              }}
                              className="flex-1 px-4 py-2 bg-brand-primary text-white font-bold text-sm rounded hover:bg-brand-dark transition-colors flex items-center justify-center gap-2"
                            >
                              <Printer size={16} />
                              Generuj raport PDF
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {ADMIN_STUDENTS.filter(s => s.id === viewingStudentId).length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  <BookOpen size={48} className="mx-auto mb-3 text-slate-300" />
                  <p>Brak przypisanych szkoleń</p>
                </div>
              )}
            </div>
          </div>

          {/* Modal edycji czasu dostępu */}
          {editingAccessFor && (() => {
            const enrollment = allStudentEnrollments.find(e => e.id === editingAccessFor);
            if (!enrollment) return null;
            const enrollmentCourse = COURSES.find(c => c.id === enrollment.course);
            
            return (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                  <div className="p-6 border-b border-slate-200">
                    <h3 className="text-xl font-heading font-bold text-brand-dark">Edytuj czas dostępu</h3>
                    <p className="text-sm text-slate-500 mt-1">{enrollmentCourse?.title}</p>
                    <p className="text-xs text-slate-400 mt-1">Aktualnie: {enrollment.expirationDays} dni</p>
                  </div>
                  
                  <div className="p-6">
                    {/* Wybór trybu */}
                    <div className="mb-6">
                      <label className="block text-sm font-bold text-slate-700 mb-3">Wybierz sposób edycji:</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-colors hover:bg-slate-50"
                          style={{ borderColor: accessEditMode === 'add' ? '#003d4d' : '#e2e8f0' }}>
                          <input 
                            type="radio" 
                            name="editMode" 
                            checked={accessEditMode === 'add'}
                            onChange={() => setAccessEditMode('add')}
                            className="w-4 h-4 text-brand-primary"
                          />
                          <div>
                            <div className="font-bold text-slate-800">Dodaj dni</div>
                            <div className="text-xs text-slate-500">Dodaj określoną liczbę dni do obecnego czasu dostępu</div>
                          </div>
                        </label>
                        
                        <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-colors hover:bg-slate-50"
                          style={{ borderColor: accessEditMode === 'set' ? '#003d4d' : '#e2e8f0' }}>
                          <input 
                            type="radio" 
                            name="editMode" 
                            checked={accessEditMode === 'set'}
                            onChange={() => setAccessEditMode('set')}
                            className="w-4 h-4 text-brand-primary"
                          />
                          <div>
                            <div className="font-bold text-slate-800">Ustaw datę końcową</div>
                            <div className="text-xs text-slate-500">Wybierz konkretną datę, do której kurs będzie ważny</div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Pole wyboru w zależności od trybu */}
                    {accessEditMode === 'add' ? (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Liczba dni do dodania:</label>
                        <input 
                          type="number" 
                          min="1"
                          max="3650"
                          value={daysToAdd}
                          onChange={(e) => setDaysToAdd(parseInt(e.target.value) || 0)}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
                          placeholder="Wpisz liczbę dni"
                        />
                        <p className="text-xs text-slate-500 mt-2">
                          Nowy czas dostępu: {enrollment.expirationDays + daysToAdd} dni
                        </p>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Data ważności (do końca dnia):</label>
                        {(() => {
                          const polishMonths = [
                            'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
                            'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
                          ];
                          
                          const today = new Date();
                          const [day, month, year] = targetDate ? targetDate.split('-').map(Number) : [today.getDate(), today.getMonth() + 1, today.getFullYear()];
                          
                          const daysInMonth = new Date(year || today.getFullYear(), month || today.getMonth() + 1, 0).getDate();
                          
                          const handleDateChange = (type: 'day' | 'month' | 'year', value: string) => {
                            const currentDate = targetDate ? new Date(targetDate) : today;
                            let newDay = currentDate.getDate();
                            let newMonth = currentDate.getMonth() + 1;
                            let newYear = currentDate.getFullYear();
                            
                            if (type === 'day') newDay = parseInt(value);
                            if (type === 'month') newMonth = parseInt(value);
                            if (type === 'year') newYear = parseInt(value);
                            
                            // Sprawdź czy dzień jest poprawny dla wybranego miesiąca
                            const maxDay = new Date(newYear, newMonth, 0).getDate();
                            if (newDay > maxDay) newDay = maxDay;
                            
                            const newDate = `${newYear}-${String(newMonth).padStart(2, '0')}-${String(newDay).padStart(2, '0')}`;
                            setTargetDate(newDate);
                          };
                          
                          return (
                            <div className="grid grid-cols-3 gap-3">
                              {/* Dzień */}
                              <div>
                                <label className="block text-xs text-slate-500 mb-1">Dzień</label>
                                <select
                                  value={day}
                                  onChange={(e) => handleDateChange('day', e.target.value)}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-primary transition-colors bg-white"
                                >
                                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
                                    <option key={d} value={d}>{d}</option>
                                  ))}
                                </select>
                              </div>
                              
                              {/* Miesiąc */}
                              <div>
                                <label className="block text-xs text-slate-500 mb-1">Miesiąc</label>
                                <select
                                  value={month}
                                  onChange={(e) => handleDateChange('month', e.target.value)}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-primary transition-colors bg-white"
                                >
                                  {polishMonths.map((monthName, index) => (
                                    <option key={index + 1} value={index + 1}>{monthName}</option>
                                  ))}
                                </select>
                              </div>
                              
                              {/* Rok */}
                              <div>
                                <label className="block text-xs text-slate-500 mb-1">Rok</label>
                                <select
                                  value={year}
                                  onChange={(e) => handleDateChange('year', e.target.value)}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-primary transition-colors bg-white"
                                >
                                  {Array.from({ length: 11 }, (_, i) => today.getFullYear() + i).map(y => (
                                    <option key={y} value={y}>{y}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          );
                        })()}
                        {targetDate && (
                          <p className="text-xs text-slate-500 mt-3">
                            Kurs będzie ważny do końca dnia: {new Date(targetDate + 'T23:59:59').toLocaleDateString('pl-PL', { day: '2-digit', month: 'long', year: 'numeric' })}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-6 border-t border-slate-200 flex gap-3 justify-end">
                    <button
                      onClick={() => {
                        setEditingAccessFor(null);
                        setDaysToAdd(30);
                        setAccessEditMode('add');
                      }}
                      className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-bold transition-colors"
                    >
                      Anuluj
                    </button>
                    <button
                      onClick={() => {
                        if (accessEditMode === 'add') {
                          console.log('Dodaj dni:', { 
                            studentId: enrollment.id, 
                            courseId: enrollment.course, 
                            currentDays: enrollment.expirationDays,
                            daysToAdd: daysToAdd,
                            newTotal: enrollment.expirationDays + daysToAdd
                          });
                          alert(`W pełnej wersji dodano by ${daysToAdd} dni. Nowy czas dostępu: ${enrollment.expirationDays + daysToAdd} dni.`);
                        } else {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          const target = new Date(targetDate + 'T23:59:59');
                          const diffTime = target.getTime() - today.getTime();
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                          
                          console.log('Ustaw datę:', { 
                            studentId: enrollment.id, 
                            courseId: enrollment.course,
                            targetDate: targetDate,
                            calculatedDays: diffDays
                          });
                          alert(`W pełnej wersji ustawiono by datę ważności do ${new Date(targetDate + 'T23:59:59').toLocaleDateString('pl-PL')} (${diffDays} dni).`);
                        }
                        setEditingAccessFor(null);
                        setDaysToAdd(30);
                        setAccessEditMode('add');
                      }}
                      className="px-6 py-2 bg-brand-primary text-white rounded-lg font-bold hover:bg-brand-secondary transition-colors"
                    >
                      Zapisz
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    );
  };

  return (
    <Layout currentView={currentView} setView={setView} language={language} setLanguage={setLanguage} setCatalogCategory={setCatalogCategory}>
      {currentView === 'HOME' && <HomeView />}
      {currentView === 'CATALOG' && <CatalogView />}
      {currentView === 'COURSE_DETAIL' && <CourseDetailView />}
      {currentView === 'LMS' && <LMSView />}
      {currentView === 'LESSON_PLAYER' && <LessonPlayerView />}
      {currentView === 'RENTALS' && <RentalsView />}
      {currentView === 'MACHINE_DETAIL' && <MachineDetailView />}
      {currentView === 'SERVICES' && <ServicesView />}
      {currentView === 'CONTACT' && <ContactView />}
      {currentView === 'ADMIN' && <AdminView />}
      {currentView === 'STUDENT_DETAIL' && <StudentDetailView />}
    </Layout>
  );
};

export default App;