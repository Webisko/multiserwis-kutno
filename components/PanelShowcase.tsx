import React, { useEffect, useState } from 'react';
import {
  PanelHeader,
  PanelTabs,
  StatCard,
  PanelTable,
  PanelLayout,
  SectionHeader
} from './PanelComponents';
import { Users, GraduationCap, TrendingUp, Clock, Edit, Trash2, Eye } from 'lucide-react';

/**
 * SHOWCASE NOWEGO DESIGNU PANELI
 * Porównanie komponentów przed refaktorem
 */

interface PanelShowcaseProps {
  onClose?: () => void;
  initialVariant?: 'admin' | 'client';
  initialPanelLabel?: string;
  focusLayout?: boolean;
}

export const PanelShowcase: React.FC<PanelShowcaseProps> = ({ onClose, initialVariant = 'admin', initialPanelLabel, focusLayout }) => {
  const [activeVariant, setActiveVariant] = useState<'admin' | 'client'>(initialVariant);
  const [activeTab, setActiveTab] = useState('overview');
  const layoutRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setActiveVariant(initialVariant);
  }, [initialVariant]);

  useEffect(() => {
    if (focusLayout && layoutRef.current) {
      layoutRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [focusLayout]);

  // Mock data dla tabel
  const mockStudents = [
    { id: 1, name: 'Jan Kowalski', email: 'jan@test.pl', course: 'Wózki widłowe', progress: 75, status: 'active' },
    { id: 2, name: 'Anna Nowak', email: 'anna@test.pl', course: 'Ładowarki teleskopowe', progress: 45, status: 'active' },
    { id: 3, name: 'Piotr Wiśniewski', email: 'piotr@test.pl', course: 'BHP Podstawowe', progress: 100, status: 'completed' }
  ];

  const mockCourses = [
    { id: 1, title: 'Obsługa wózków jezdniowych', students: 25, category: 'Wózki widłowe', status: 'active' },
    { id: 2, title: 'Ładowarki teleskopowe', students: 15, category: 'Ładowarki', status: 'active' },
    { id: 3, title: 'BHP - podstawy', students: 40, category: 'BHP', status: 'draft' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Przełącznik wariantu */}
      <div className="bg-white border-b border-slate-200 py-4 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold text-brand-dark">
            🎨 Showcase Nowego Designu
          </h1>
          {initialPanelLabel && (
            <span className="px-3 py-1 text-xs font-bold bg-brand-accent text-white rounded-sm shadow-sm">
              Podgląd: {initialPanelLabel}
            </span>
          )}
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setActiveVariant('admin')}
              className={`px-4 py-2 font-bold text-sm rounded-sm transition-colors ${
                activeVariant === 'admin'
                  ? 'bg-brand-accent text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Panel Obsługowy (Admin/Manager)
            </button>
            <button
              onClick={() => setActiveVariant('client')}
              className={`px-4 py-2 font-bold text-sm rounded-sm transition-colors ${
                activeVariant === 'client'
                  ? 'bg-brand-accent text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Panel Kliencki (Kursant/Opiekun)
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="ml-4 px-4 py-2 font-bold text-sm rounded-sm bg-slate-200 text-slate-700 hover:bg-red-100 hover:text-red-700 transition-colors"
              >
                ✕ Zamknij Showcase
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PRZYKŁAD 1: PANEL HEADER */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-xl font-bold mb-4 text-slate-700">1. Panel Header - Wspólny nagłówek</h2>
          <div className="border border-slate-200 rounded-sm overflow-hidden">
            <PanelHeader
              sections={[
                { label: 'Dashboard', onClick: () => {} },
                { label: 'Kursy', onClick: () => {} },
                { label: 'Użytkownicy', onClick: () => {} },
                { label: 'Raporty', onClick: () => {} }
              ]}
              onNotifications={() => alert('Powiadomienia')}
              onProfile={() => alert('Profil')}
              profileEmail="admin@multiserwis.pl"
              notificationCount={3}
            />
          </div>
          <p className="text-sm text-slate-500 mt-2">
            ✅ Sticky header z logo, sekcjami, notyfikacjami i profilem (dropdown)
          </p>
        </div>
      </section>

      {/* PRZYKŁAD 2: PANEL TABS */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-xl font-bold mb-4 text-slate-700">2. Panel Tabs - Ustandaryzowane zakładki</h2>
          <div className="border border-slate-200 rounded-sm overflow-hidden">
            <PanelTabs
              tabs={[
                { id: 'overview', label: 'Przegląd' },
                { id: 'details', label: 'Szczegóły' },
                { id: 'reports', label: 'Raporty' },
                { id: 'settings', label: 'Ustawienia' }
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
              variant={activeVariant}
            />
            <div className="p-6 bg-slate-50">
              <p className="text-slate-600">Zawartość zakładki: <strong>{activeTab}</strong></p>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-2">
            ✅ Spójny design z border-bottom indicator i hover states
          </p>
        </div>
      </section>

      {/* PRZYKŁAD 3: STAT CARDS */}
      <section className="bg-slate-50 py-6">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-xl font-bold mb-4 text-slate-700">3. Stat Cards - Karty statystyk</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title={activeVariant === 'admin' ? 'Kursanci' : 'Moje Kursy'}
              value={activeVariant === 'admin' ? '247' : '5'}
              subtitle={activeVariant === 'admin' ? 'Aktywnych użytkowników' : 'W trakcie nauki'}
              icon={<Users size={24} />}
              borderColor="blue"
              variant={activeVariant}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title={activeVariant === 'admin' ? 'Kursy' : 'Certyfikaty'}
              value={activeVariant === 'admin' ? '18' : '3'}
              subtitle={activeVariant === 'admin' ? 'Dostępnych szkoleń' : 'Zdobyte'}
              icon={<GraduationCap size={24} />}
              borderColor="green"
              variant={activeVariant}
            />
            <StatCard
              title={activeVariant === 'admin' ? 'Ukończenia' : 'Postęp'}
              value={activeVariant === 'admin' ? '89%' : '67%'}
              subtitle={activeVariant === 'admin' ? 'Średni wskaźnik' : 'Średnia postępu'}
              icon={<TrendingUp size={24} />}
              borderColor="purple"
              variant={activeVariant}
              trend={{ value: activeVariant === 'admin' ? 5 : 8, isPositive: true }}
            />
            <StatCard
              title={activeVariant === 'admin' ? 'Oczekujące' : 'Wygasające'}
              value={activeVariant === 'admin' ? '12' : '2'}
              subtitle={activeVariant === 'admin' ? 'Do zatwierdzenia' : 'Wkrótce'}
              icon={<Clock size={24} />}
              borderColor="orange"
              variant={activeVariant}
            />
          </div>
          <p className="text-sm text-slate-500 mt-4">
            ✅ Border-left color indicator + ikona + wartość + trend (opcjonalnie)
          </p>
        </div>
      </section>

      {/* PRZYKŁAD 4: SECTION HEADER */}
      <section className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-xl font-bold mb-4 text-slate-700">4. Section Header - Nagłówek sekcji</h2>
          <div className="border border-slate-200 rounded-sm p-6">
            <SectionHeader
              title="Zarządzanie Użytkownikami"
              subtitle="Lista wszystkich kursantów w systemie"
              action={{
                label: 'Dodaj użytkownika',
                onClick: () => alert('Dodaj'),
                icon: <Users size={16} />
              }}
            />
          </div>
          <p className="text-sm text-slate-500 mt-2">
            ✅ Tytuł + subtitle + opcjonalny przycisk akcji
          </p>
        </div>
      </section>

      {/* PRZYKŁAD 5: PANEL TABLE - KURSANCI */}
      <section className="bg-slate-50 py-6">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-xl font-bold mb-4 text-slate-700">5. Panel Table - Tabela kursantów</h2>
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
            <PanelTable
              columns={[
                {
                  id: 'name',
                  label: 'Imię i nazwisko',
                  render: (row) => (
                    <div className="font-bold text-brand-dark">{row.name}</div>
                  )
                },
                {
                  id: 'email',
                  label: 'Email',
                  render: (row) => (
                    <div className="text-slate-600">{row.email}</div>
                  )
                },
                {
                  id: 'course',
                  label: 'Kurs',
                  render: (row) => (
                    <div className="text-sm">{row.course}</div>
                  )
                },
                {
                  id: 'progress',
                  label: 'Postęp',
                  align: 'center',
                  render: (row) => (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-20 bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-brand-accent h-2 rounded-full"
                          style={{ width: `${row.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-600">{row.progress}%</span>
                    </div>
                  )
                },
                {
                  id: 'status',
                  label: 'Status',
                  render: (row) => (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        row.status === 'active'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {row.status === 'active' ? 'Aktywny' : 'Ukończony'}
                    </span>
                  )
                }
              ]}
              data={mockStudents}
              actions={[
                {
                  label: 'Podgląd',
                  onClick: (row) => alert(`Podgląd: ${row.name}`),
                  icon: <Eye size={16} />
                },
                {
                  label: 'Edytuj',
                  onClick: (row) => alert(`Edycja: ${row.name}`),
                  icon: <Edit size={16} />
                },
                {
                  label: 'Usuń',
                  onClick: (row) => alert(`Usuń: ${row.name}`),
                  icon: <Trash2 size={16} />
                }
              ]}
            />
          </div>
          <p className="text-sm text-slate-500 mt-2">
            ✅ Unified header (bg-slate-50, uppercase) + hover rows + actions column
          </p>
        </div>
      </section>

      {/* PRZYKŁAD 6: PANEL TABLE - KURSY */}
      <section className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-xl font-bold mb-4 text-slate-700">6. Panel Table - Tabela kursów</h2>
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
            <PanelTable
              columns={[
                {
                  id: 'title',
                  label: 'Tytuł kursu',
                  render: (row) => (
                    <div>
                      <div className="font-bold text-brand-dark">{row.title}</div>
                      <div className="text-xs text-slate-500">{row.category}</div>
                    </div>
                  )
                },
                {
                  id: 'students',
                  label: 'Kursanci',
                  align: 'center',
                  render: (row) => (
                    <div className="text-slate-600 font-bold">{row.students}</div>
                  )
                },
                {
                  id: 'status',
                  label: 'Status',
                  render: (row) => (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        row.status === 'active'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {row.status === 'active' ? 'Aktywny' : 'Szkic'}
                    </span>
                  )
                }
              ]}
              data={mockCourses}
              actions={[
                {
                  label: 'Edytuj',
                  onClick: (row) => alert(`Edycja: ${row.title}`),
                  icon: <Edit size={16} />
                }
              ]}
            />
          </div>
          <p className="text-sm text-slate-500 mt-2">
            ✅ Elastyczna struktura kolumn z custom renderami
          </p>
        </div>
      </section>

      {/* PRZYKŁAD 7: PEŁNY LAYOUT */}
      <section className="bg-slate-50 py-6 border-t-4 border-brand-accent" ref={layoutRef}>
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-xl font-bold mb-4 text-slate-700">7. Panel Layout - Kompletny układ (Interaktywny)</h2>
          <p className="text-sm text-slate-600 mb-4">
            Kliknij na przycisk wariantu powyżej, aby zobaczyć zmianę całego panelu. Strukturą się zmienia w zależności od roli.
          </p>
          <div className="border-2 border-slate-300 rounded-sm overflow-hidden">
            <PanelLayout
              header={
                <PanelHeader
                  sections={
                    activeVariant === 'admin'
                      ? [
                          { label: 'Dashboard', onClick: () => {} },
                          { label: 'Kursy', onClick: () => {} },
                          { label: 'Użytkownicy', onClick: () => {} },
                          { label: 'Raporty', onClick: () => {} }
                        ]
                      : [
                          { label: 'Moje Kursy', onClick: () => {} },
                          { label: 'Certyfikaty', onClick: () => {} },
                          { label: 'Historia', onClick: () => {} },
                          { label: 'Ustawienia', onClick: () => {} }
                        ]
                  }
                  onNotifications={() => {}}
                  onProfile={() => {}}
                  profileEmail={activeVariant === 'admin' ? 'admin@multiserwis.pl' : 'student@multiserwis.pl'}
                  notificationCount={activeVariant === 'admin' ? 5 : 2}
                />
              }
            >
              {/* Top Stats Section */}
              <div className="bg-white rounded-sm shadow-sm p-6 mb-6">
                <SectionHeader
                  title={activeVariant === 'admin' ? 'Dashboard - Przegląd' : 'Twoja Edukacja'}
                  subtitle={activeVariant === 'admin' ? 'Kluczowe metryki platformy' : 'Postęp nauki i certyfikaty'}
                />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <StatCard
                    title={activeVariant === 'admin' ? 'Kursanci' : 'Kursy'}
                    value={activeVariant === 'admin' ? '247' : '5'}
                    subtitle={activeVariant === 'admin' ? 'Aktywnych' : 'W trakcie'}
                    icon={<Users size={20} />}
                    borderColor="blue"
                    variant={activeVariant}
                  />
                  <StatCard
                    title={activeVariant === 'admin' ? 'Kursy' : 'Certyfikaty'}
                    value={activeVariant === 'admin' ? '18' : '3'}
                    subtitle={activeVariant === 'admin' ? 'Dostępne' : 'Zdobyte'}
                    icon={<GraduationCap size={20} />}
                    borderColor="green"
                    variant={activeVariant}
                  />
                  <StatCard
                    title={activeVariant === 'admin' ? 'Zdawalność' : 'Średni Postęp'}
                    value={activeVariant === 'admin' ? '89%' : '68%'}
                    icon={<TrendingUp size={20} />}
                    borderColor="purple"
                    variant={activeVariant}
                    trend={{ value: activeVariant === 'admin' ? 3 : 12, isPositive: true }}
                  />
                  <StatCard
                    title={activeVariant === 'admin' ? 'Oczekujące' : 'Wygasające'}
                    value={activeVariant === 'admin' ? '12' : '1'}
                    subtitle={activeVariant === 'admin' ? 'Zatwierdzenia' : 'Za 30 dni'}
                    icon={<Clock size={20} />}
                    borderColor="orange"
                    variant={activeVariant}
                  />
                </div>
              </div>

              {/* Main Content Grid with Sidebar */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Main Section */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-sm shadow-sm overflow-hidden">
                    <PanelTabs
                      tabs={
                        activeVariant === 'admin'
                          ? [
                              { id: 'list', label: 'Lista Kursantów' },
                              { id: 'stats', label: 'Statystyki' },
                              { id: 'reports', label: 'Raporty' }
                            ]
                          : [
                              { id: 'active', label: 'Aktywne' },
                              { id: 'completed', label: 'Ukończone' },
                              { id: 'certificates', label: 'Certyfikaty' }
                            ]
                      }
                      activeTab={activeTab}
                      onChange={setActiveTab}
                      variant={activeVariant}
                    />
                    <div className="p-6">
                      <PanelTable
                        columns={
                          activeVariant === 'admin'
                            ? [
                                {
                                  id: 'name',
                                  label: 'Imię i Nazwisko',
                                  render: (row) => <div className="font-bold text-brand-dark">{row.name}</div>
                                },
                                {
                                  id: 'email',
                                  label: 'Email',
                                  render: (row) => <div className="text-slate-600 text-sm">{row.email}</div>
                                },
                                {
                                  id: 'course',
                                  label: 'Kurs',
                                  render: (row) => <div className="text-slate-700">{row.course}</div>
                                },
                                {
                                  id: 'progress',
                                  label: 'Postęp',
                                  render: (row) => (
                                    <div className="flex items-center gap-2">
                                      <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-brand-accent" style={{ width: `${row.progress}%` }}></div>
                                      </div>
                                      <span className="text-xs font-bold">{row.progress}%</span>
                                    </div>
                                  )
                                }
                              ]
                            : [
                                {
                                  id: 'course',
                                  label: 'Kurs',
                                  render: (row) => <div className="font-bold text-green-700">{row.course}</div>
                                },
                                {
                                  id: 'progress',
                                  label: 'Postęp',
                                  render: (row) => (
                                    <div className="flex items-center gap-2">
                                      <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500" style={{ width: `${row.progress}%` }}></div>
                                      </div>
                                      <span className="text-xs font-bold">{row.progress}%</span>
                                    </div>
                                  )
                                },
                                {
                                  id: 'status',
                                  label: 'Status',
                                  render: (row) => (
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                      row.status === 'completed' 
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-blue-100 text-blue-700'
                                    }`}>
                                      {row.status === 'completed' ? '✓ Ukończony' : 'W trakcie'}
                                    </span>
                                  )
                                }
                              ]
                        }
                        data={mockStudents}
                        actions={
                          activeVariant === 'admin'
                            ? [
                                {
                                  label: 'Podgląd',
                                  onClick: (row) => alert(`Podgląd: ${row.name}`),
                                  icon: <Eye size={16} />
                                },
                                {
                                  label: 'Edytuj',
                                  onClick: (row) => alert(`Edycja: ${row.name}`),
                                  icon: <Edit size={16} />
                                }
                              ]
                            : undefined
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="bg-white rounded-sm shadow-sm p-6">
                  <h3 className="font-bold text-lg text-brand-dark mb-4">
                    {activeVariant === 'admin' ? 'Ostatnia Aktywność' : 'Szybkie Info'}
                  </h3>
                  <div className="space-y-3">
                    {activeVariant === 'admin'
                      ? [
                          { time: '2 min temu', action: 'Jan Kowalski ukończył kurs' },
                          { time: '1 godzinę temu', action: 'Nowy student: Anna Nowak' },
                          { time: '3 godziny temu', action: 'Raport wygenerowany' }
                        ].map((item, i) => (
                          <div key={i} className="text-sm border-l-2 border-brand-accent pl-3">
                            <p className="text-slate-600">{item.action}</p>
                            <p className="text-xs text-slate-400">{item.time}</p>
                          </div>
                        ))
                      : [
                          { label: 'Następny termin', value: 'Wózki Widłowe - 15 marca' },
                          { label: 'Ostatni login', value: 'Dziś o 14:30' },
                          { label: 'Wsparcie', value: 'support@multiserwis.pl' }
                        ].map((item, i) => (
                          <div key={i} className="text-sm">
                            <p className="text-xs text-slate-500">{item.label}</p>
                            <p className="text-slate-700 font-semibold">{item.value}</p>
                          </div>
                        ))}
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="bg-white rounded-sm shadow-sm p-6">
                <h3 className="font-bold text-lg text-brand-dark mb-4">
                  {activeVariant === 'admin' ? 'Dostępne Kursy' : 'Rekomendowane'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockCourses.slice(0, 2).map((course) => (
                    <div key={course.id} className="border border-slate-200 rounded-sm p-4 hover:shadow-md transition-shadow">
                      <h4 className={`font-bold ${activeVariant === 'admin' ? 'text-brand-dark' : 'text-green-700'}`}>
                        {course.title}
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">{course.category}</p>
                      <p className="text-xs text-slate-500 mt-2">
                        {activeVariant === 'admin' ? `${course.students} uczestników` : 'Rekomendowane dla Ciebie'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </PanelLayout>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            ✅ Kompletny layout ze wszystkimi 6 komponentami integrującymi się razem. Zmienia się w zależności od wybranego wariantu!
          </p>
        </div>
      </section>

      {/* PODSUMOWANIE */}
      <section className="bg-brand-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-2xl font-bold mb-4">✨ Korzyści z nowego designu:</h2>
          <ul className="space-y-2 text-slate-200">
            <li>✅ Spójna struktura wszystkich paneli (Admin, Manager, Kursant, Opiekun)</li>
            <li>✅ Reusable komponenty - łatwa konserwacja</li>
            <li>✅ Responsywność na mobile/tablet/desktop</li>
            <li>✅ Accessibility (ARIA labels, keyboard navigation)</li>
            <li>✅ Unified color scheme i typography</li>
            <li>✅ Elastyczne API komponentów (props)</li>
          </ul>
          <div className="mt-6 p-4 bg-white/10 rounded-sm">
            <p className="text-sm">
              <strong>Następny krok:</strong> Porównaj ten showcase z obecnymi panelami i zdecyduj, 
              które elementy chcesz zastąpić jako pierwsze. Mamy backup na GitHub - możemy bezpiecznie 
              wprowadzać zmiany stopniowo.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
