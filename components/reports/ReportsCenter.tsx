import React from 'react';
import {
  BarChart3,
  Calendar,
  ChevronDown,
  Download,
  FileText,
  LineChart,
  Mail,
  Printer,
  RefreshCcw,
  Search,
  Share2,
  Users,
  User,
  Layers,
  Trophy,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { COURSE_CURRICULUM } from '../../constants';
import type { Course, Module, Student } from '../../types';

type ReportsRole = 'admin' | 'manager' | 'guardian';

type ReportsView =
  | 'picker'
  | 'individual'
  | 'group'
  | 'course'
  | 'compare'
  | 'scheduled';

type DatePreset = '7' | '30' | '90' | 'custom';

type IndividualSection =
  | 'summary'
  | 'daily-activity'
  | 'lessons'
  | 'tests'
  | 'certificates'
  | 'charts';

type GroupSection = 'summary' | 'users' | 'courses' | 'charts';

type ScheduledSection = 'automations' | 'templates';

const formatDate = (d: Date) =>
  d.toLocaleDateString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' });

const formatDateTime = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleString('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatMinutes = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${String(m).padStart(2, '0')}m`;
};

const hashString = (input: string) => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
};

const stableRand = (seed: string) => {
  const h = hashString(seed);
  return (h % 1000) / 1000;
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

const toCsv = (rows: Array<Record<string, string | number | boolean | null | undefined>>) => {
  const headers = rows.length ? Object.keys(rows[0]) : [];
  const escape = (value: unknown) => {
    const text = String(value ?? '');
    const needsQuotes = /[;\n\r\"]/g.test(text);
    const escaped = text.replace(/\"/g, '""');
    return needsQuotes ? `"${escaped}"` : escaped;
  };

  const lines = [headers.join(';')];
  for (const row of rows) {
    lines.push(headers.map((h) => escape(row[h])).join(';'));
  }
  return lines.join('\r\n');
};

const Card: React.FC<{ title?: string; children: React.ReactNode; className?: string; right?: React.ReactNode }> = ({
  title,
  children,
  className,
  right,
}) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 ${className ?? ''}`}>
    {title ? (
      <div className="px-6 pt-5 pb-3 flex items-center justify-between gap-4">
        <h2 className="text-base font-bold text-slate-800">{title}</h2>
        {right}
      </div>
    ) : null}
    <div className={title ? 'px-6 pb-6' : 'p-6'}>{children}</div>
  </div>
);

const TabButton: React.FC<{
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}> = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold border-b-2 transition-colors ${
      active
        ? 'border-brand-accent text-brand-accent'
        : 'border-transparent text-slate-500 hover:text-slate-800'
    }`}
  >
    <span className={active ? 'text-brand-accent' : 'text-slate-400'}>{icon}</span>
    {label}
  </button>
);

const Chip: React.FC<{ tone: 'green' | 'amber' | 'red' | 'slate'; children: React.ReactNode }> = ({
  tone,
  children,
}) => {
  const styles: Record<typeof tone, string> = {
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-rose-50 text-rose-700 border-rose-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-semibold ${styles[tone]}`}>
      {children}
    </span>
  );
};

const ReportHeader: React.FC<{
  title: string;
  subtitle: string;
  rangeLabel: string;
  generatedAt: string;
  onBack?: () => void;
  onExportCsv?: () => void;
  onPrint?: () => void;
  onSchedule?: () => void;
  onShare?: () => void;
}> = ({ title, subtitle, rangeLabel, generatedAt, onBack, onExportCsv, onPrint, onSchedule, onShare }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    <div>
      <div className="flex items-center gap-3">
        {onBack ? (
          <button
            onClick={onBack}
            className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            ← Wróć
          </button>
        ) : null}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4 text-xs">
        <Chip tone="slate">
          <Calendar size={14} /> {rangeLabel}
        </Chip>
        <Chip tone="slate">
          <RefreshCcw size={14} /> Wygenerowano: {generatedAt}
        </Chip>
      </div>
    </div>

    <div className="flex flex-wrap gap-2 justify-end">
      {onExportCsv ? (
        <button
          onClick={onExportCsv}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Download size={16} /> Eksportuj CSV
        </button>
      ) : null}
      {onPrint ? (
        <button
          onClick={onPrint}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Printer size={16} /> Drukuj
        </button>
      ) : null}
      {onSchedule ? (
        <button
          onClick={onSchedule}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Mail size={16} /> Zaplanuj
        </button>
      ) : null}
      {onShare ? (
        <button
          onClick={onShare}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-accent text-white text-sm font-semibold hover:bg-orange-600"
        >
          <Share2 size={16} /> Udostępnij
        </button>
      ) : null}
    </div>
  </div>
);

const ReportPicker: React.FC<{
  role: ReportsRole;
  onPick: (next: ReportsView) => void;
}> = ({ role, onPick }) => {
  const tiles: Array<{ id: ReportsView; title: string; desc: string; icon: React.ReactNode; disabled?: boolean; hidden?: boolean }> = [
    {
      id: 'individual',
      title: 'Raport indywidualny użytkownika',
      desc: 'Szczegółowa analiza aktywności, postępu, testów i certyfikatów.',
      icon: <User size={20} className="text-brand-accent" />,
    },
    {
      id: 'group',
      title: 'Raport grupowy (firma / dział)',
      desc: 'Zestawienia dla firm i zespołów: aktywność, postępy, ryzyka.',
      icon: <Users size={20} className="text-violet-600" />,
    },
    {
      id: 'course',
      title: 'Raport szkolenia / lekcji',
      desc: 'Popularność, ukończenia i szczegóły aktywności w szkoleniu.',
      icon: <Layers size={20} className="text-blue-600" />,
    },
    {
      id: 'compare',
      title: 'Raport porównawczy',
      desc: 'Porównanie okresów, grup i benchmark (anonimizowany).',
      icon: <LineChart size={20} className="text-emerald-600" />,
    },
    {
      id: 'scheduled',
      title: 'Raporty zaplanowane',
      desc: 'Automatyczne generowanie i wysyłka email + szablony.',
      icon: <BarChart3 size={20} className="text-slate-700" />,
    },
  ];

  const visible = tiles.filter((t) => !t.hidden);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Centrum Raportów</h1>
        <p className="text-sm text-slate-500 mt-1">
          Wybierz typ raportu, aby rozpocząć analizę lub zarządzać zaplanowanymi zadaniami.
          {role === 'guardian' ? ' (Dostęp tylko do pracowników Twojej firmy)' : ''}
        </p>
      </div>

      <Card title="Wybierz typ raportu">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {visible.map((t) => (
            <button
              key={t.id}
              onClick={() => !t.disabled && onPick(t.id)}
              className={`text-left p-5 rounded-2xl border transition group ${
                t.disabled
                  ? 'border-slate-200 bg-slate-50 cursor-not-allowed'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
              title={t.disabled ? 'W przygotowaniu' : undefined}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                    {t.icon}
                  </span>
                  <div>
                    <div className="font-bold text-slate-800">{t.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{t.desc}</div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-brand-accent group-hover:underline">
                  {t.disabled ? 'Wkrótce' : 'Rozpocznij →'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      <Card title="Raporty zaplanowane">
        <div className="text-sm text-slate-600">
          W tej sekcji znajdziesz automatyczne raporty cykliczne, odbiorców oraz szybkie szablony.
        </div>
      </Card>
    </div>
  );
};

const DateRangePicker: React.FC<{
  preset: DatePreset;
  setPreset: (v: DatePreset) => void;
  from: string;
  to: string;
  setFrom: (v: string) => void;
  setTo: (v: string) => void;
}> = ({ preset, setPreset, from, to, setFrom, setTo }) => (
  <div className="flex flex-wrap items-end gap-3">
    <div>
      <label className="text-xs font-semibold text-slate-500">Zakres</label>
      <select
        value={preset}
        onChange={(e) => setPreset(e.target.value as DatePreset)}
        className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white"
      >
        <option value="7">Ostatnie 7 dni</option>
        <option value="30">Ostatnie 30 dni</option>
        <option value="90">Ostatnie 90 dni</option>
        <option value="custom">Własny</option>
      </select>
    </div>

    <div>
      <label className="text-xs font-semibold text-slate-500">Od</label>
      <input
        type="date"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={preset !== 'custom'}
        className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm disabled:bg-slate-50"
      />
    </div>

    <div>
      <label className="text-xs font-semibold text-slate-500">Do</label>
      <input
        type="date"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={preset !== 'custom'}
        className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm disabled:bg-slate-50"
      />
    </div>

    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-accent text-white text-sm font-semibold hover:bg-orange-600">
      <RefreshCcw size={16} /> Odśwież
    </button>
  </div>
);

const buildCandidateUsers = (
  courses: Course[],
  students: Student[],
  forcedCompany?: string
): Array<{ key: string; name: string; email: string; company?: string; progressAvg: number }> => {
  const filtered = forcedCompany ? students.filter((s) => (s.company || 'Indywidualny') === forcedCompany) : students;

  const byEmail = filtered.reduce<Record<string, Student[]>>((acc, s) => {
    acc[s.email] = acc[s.email] ? [...acc[s.email], s] : [s];
    return acc;
  }, {});

  return Object.entries(byEmail)
    .map(([email, list]) => {
      const name = list[0]?.name ?? email;
      const company = list[0]?.company;
      const progressAvg = list.length ? Math.round(list.reduce((sum, x) => sum + x.progress, 0) / list.length) : 0;
      return { key: email, name, email, company, progressAvg };
    })
    .sort((a, b) => b.progressAvg - a.progressAvg);
};

const IndividualReport: React.FC<{
  role: ReportsRole;
  courses: Course[];
  students: Student[];
  forcedCompany?: string;
  onBack: () => void;
}> = ({ role, courses, students, forcedCompany, onBack }) => {
  const candidates = React.useMemo(
    () => buildCandidateUsers(courses, students, forcedCompany),
    [courses, students, forcedCompany]
  );

  const [query, setQuery] = React.useState('');
  const [selectedEmail, setSelectedEmail] = React.useState<string | null>(candidates[0]?.email ?? null);
  const [preset, setPreset] = React.useState<DatePreset>('30');
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [selectedCourses, setSelectedCourses] = React.useState<string[]>([]);
  const [section, setSection] = React.useState<IndividualSection>('summary');

  const selectedUser = candidates.find((c) => c.email === selectedEmail) ?? null;

  const matchedCandidates = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return candidates;
    return candidates.filter((c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
  }, [candidates, query]);

  const now = new Date();
  const range = React.useMemo(() => {
    if (preset !== 'custom') {
      const days = Number(preset);
      const start = new Date(now);
      start.setDate(now.getDate() - days + 1);
      return { start, end: now };
    }
    const start = from ? new Date(`${from}T00:00:00`) : new Date(now);
    const end = to ? new Date(`${to}T23:59:59`) : now;
    return { start, end };
  }, [preset, from, to]);

  const rangeLabel = React.useMemo(() => {
    if (preset !== 'custom') return `Zakres: ostatnie ${preset} dni`;
    if (!from || !to) return 'Zakres: własny';
    return `Zakres: ${from} – ${to}`;
  }, [preset, from, to]);

  const generatedAt = formatDateTime(new Date().toISOString());

  const userCourses = React.useMemo(() => {
    if (!selectedEmail) return [];
    const list = students.filter((s) => s.email === selectedEmail);
    const allowed = selectedCourses.length ? list.filter((s) => selectedCourses.includes(s.course)) : list;
    return allowed;
  }, [students, selectedEmail, selectedCourses]);

  const summary = React.useMemo(() => {
    const totalMinutes = Math.round(userCourses.reduce((sum, s) => sum + (15 + Math.floor(stableRand(`${s.id}`) * 90)), 0));
    const sessionAvg = 10 + Math.round(stableRand(`${selectedEmail}-session`) * 50);
    const lastLogin = new Date(now);
    lastLogin.setDate(now.getDate() - Math.floor(stableRand(`${selectedEmail}-last`) * 10));
    const completion = userCourses.length
      ? Math.round(userCourses.reduce((sum, s) => sum + Math.min(100, s.progress), 0) / userCourses.length)
      : 0;

    return {
      totalMinutes,
      sessionAvg,
      lastLogin: lastLogin.toISOString(),
      completion,
      activeDays: 18 + Math.floor(stableRand(`${selectedEmail}-active`) * 10),
      inactiveDays: 12,
    };
  }, [userCourses, selectedEmail]);

  const exportCsv = () => {
    if (!selectedUser) return;
    const csv = toCsv(
      userCourses.map((s) => {
        const courseTitle = courses.find((c) => c.id === s.course)?.title ?? s.course;
        return {
          'Imię i nazwisko': selectedUser.name,
          Email: selectedUser.email,
          Firma: selectedUser.company ?? '',
          Szkolenie: courseTitle,
          Postęp: `${s.progress}%`,
          'Status dostępu': s.status,
          'Dni do wygaśnięcia': s.expirationDays,
        };
      })
    );
    downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8' }), `raport-uzytkownika-${selectedUser.email}.csv`);
  };

  return (
    <div className="space-y-6">
      <ReportHeader
        title="Raport indywidualny użytkownika"
        subtitle={selectedUser ? `${selectedUser.name} • ${selectedUser.email}` : 'Wybierz użytkownika'}
        rangeLabel={rangeLabel}
        generatedAt={generatedAt}
        onBack={onBack}
        onExportCsv={exportCsv}
        onPrint={() => window.print()}
        onSchedule={() => alert('Planowanie raportów: demo UI')}
        onShare={() => alert('Udostępnianie raportów: demo UI')}
      />

      <Card title="Filtry górne" right={<Chip tone="slate">Widok: {role === 'guardian' ? 'Opiekun firmy' : role === 'admin' ? 'Admin' : 'Manager'}</Chip>}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-1">
            <label className="text-xs font-semibold text-slate-500">Wyszukaj użytkownika</label>
            <div className="mt-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Imię, email lub ID..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/30"
              />
            </div>
            <div className="mt-2">
              <select
                value={selectedEmail ?? ''}
                onChange={(e) => setSelectedEmail(e.target.value || null)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white"
              >
                {matchedCandidates.map((c) => (
                  <option key={c.key} value={c.email}>
                    {c.name} ({c.email})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="xl:col-span-1">
            <DateRangePicker preset={preset} setPreset={setPreset} from={from} to={to} setFrom={setFrom} setTo={setTo} />
          </div>

          <div className="xl:col-span-1">
            <label className="text-xs font-semibold text-slate-500">Szkolenia</label>
            <div className="mt-1 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCourses([])}
                className={`px-3 py-2 rounded-lg border text-sm font-semibold ${
                  selectedCourses.length === 0 ? 'border-brand-accent bg-orange-50/40 text-brand-accent' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Wszystkie
              </button>
              {courses.slice(0, 4).map((c) => {
                const active = selectedCourses.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() =>
                      setSelectedCourses((prev) =>
                        active ? prev.filter((x) => x !== c.id) : [...prev, c.id]
                      )
                    }
                    className={`px-3 py-2 rounded-lg border text-sm font-semibold ${
                      active ? 'border-brand-accent bg-orange-50/40 text-brand-accent' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                    title={c.title}
                  >
                    {c.title.length > 18 ? `${c.title.slice(0, 18)}…` : c.title}
                  </button>
                );
              })}
            </div>
            <div className="text-xs text-slate-500 mt-2">(UI demo) Docelowo będzie pełna lista + multiselect.</div>
          </div>
        </div>
      </Card>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-wrap items-center gap-2 px-4">
          <TabButton active={section === 'summary'} icon={<BarChart3 size={16} />} label="Podsumowanie" onClick={() => setSection('summary')} />
          <TabButton active={section === 'daily-activity'} icon={<Calendar size={16} />} label="Aktywność dzienna" onClick={() => setSection('daily-activity')} />
          <TabButton active={section === 'lessons'} icon={<Layers size={16} />} label="Lekcje" onClick={() => setSection('lessons')} />
          <TabButton active={section === 'tests'} icon={<FileText size={16} />} label="Testy i quizy" onClick={() => setSection('tests')} />
          <TabButton active={section === 'certificates'} icon={<Trophy size={16} />} label="Certyfikaty" onClick={() => setSection('certificates')} />
          <TabButton active={section === 'charts'} icon={<LineChart size={16} />} label="Wykresy" onClick={() => setSection('charts')} />
        </div>
      </div>

      {section === 'summary' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Czas całkowity</div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{formatMinutes(summary.totalMinutes)}</div>
            <div className="text-xs text-emerald-600 mt-2">+{Math.round(stableRand('delta') * 15)}% vs poprzedni okres</div>
          </Card>
          <Card>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Średnia sesja</div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{summary.sessionAvg}m</div>
            <div className="text-xs text-slate-500 mt-2">Stabilnie</div>
          </Card>
          <Card>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ukończenie szkoleń</div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{summary.completion}%</div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden mt-3">
              <div className="h-full bg-brand-accent" style={{ width: `${summary.completion}%` }} />
            </div>
          </Card>
          <Card>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ostatnie logowanie</div>
            <div className="text-sm font-bold text-slate-900 mt-2">{formatDateTime(summary.lastLogin)}</div>
            <div className="text-xs text-slate-500 mt-2">Online</div>
          </Card>

          <Card title="Aktywność (heatmap)" className="md:col-span-2">
            <div className="grid grid-cols-14 gap-1">
              {Array.from({ length: 56 }).map((_, i) => {
                const level = Math.floor(stableRand(`${selectedEmail}-heat-${i}`) * 4);
                const bg = ['bg-slate-100', 'bg-emerald-100', 'bg-emerald-300', 'bg-emerald-500'][level];
                return <div key={i} className={`w-4 h-4 rounded ${bg}`} title={`Dzień ${i + 1}`} />;
              })}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 mt-3">
              <span>Mniej</span>
              <span className="flex items-center gap-1">
                <span className="w-4 h-4 bg-slate-100 rounded" />
                <span className="w-4 h-4 bg-emerald-100 rounded" />
                <span className="w-4 h-4 bg-emerald-300 rounded" />
                <span className="w-4 h-4 bg-emerald-500 rounded" />
              </span>
              <span>Więcej</span>
            </div>
          </Card>

          <Card title="Postęp w czasie" className="md:col-span-2">
            <div className="text-xs text-slate-500 mb-3">Ilość ukończonych lekcji w ostatnich 30 dniach (demo).</div>
            <div className="h-44 bg-slate-50 rounded-xl flex items-end gap-2 p-4">
              {Array.from({ length: 12 }).map((_, i) => {
                const v = 10 + Math.round(stableRand(`${selectedEmail}-line-${i}`) * 80);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-slate-100 rounded-lg overflow-hidden h-28 flex items-end">
                      <div className="w-full bg-brand-accent" style={{ height: `${v}%` }} />
                    </div>
                    <div className="text-[10px] text-slate-400">{i + 1}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      ) : null}

      {section === 'daily-activity' ? (
        <Card title="Szczegółowa aktywność dzienna">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 text-left">Data</th>
                  <th className="py-3 text-left">Logowanie</th>
                  <th className="py-3 text-left">Wylogowanie</th>
                  <th className="py-3 text-left">Czas online</th>
                  <th className="py-3 text-left">Aktywność</th>
                  <th className="py-3 text-left">Postęp</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }).map((_, i) => {
                  const day = new Date(range.end);
                  day.setDate(range.end.getDate() - i);
                  const login = new Date(day);
                  login.setHours(8 + Math.floor(stableRand(`${selectedEmail}-login-${i}`) * 4));
                  login.setMinutes(10);
                  const logout = new Date(login);
                  logout.setHours(login.getHours() + 1 + Math.floor(stableRand(`${selectedEmail}-logout-${i}`) * 3));
                  const minutes = 20 + Math.floor(stableRand(`${selectedEmail}-minutes-${i}`) * 160);
                  const progress = 10 + Math.floor(stableRand(`${selectedEmail}-p-${i}`) * 90);
                  return (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="py-3 font-semibold text-slate-800 whitespace-nowrap">{formatDate(day)}</td>
                      <td className="py-3 text-slate-600 whitespace-nowrap">{formatDateTime(login.toISOString())}</td>
                      <td className="py-3 text-slate-600 whitespace-nowrap">{formatDateTime(logout.toISOString())}</td>
                      <td className="py-3 text-slate-700 whitespace-nowrap">{formatMinutes(minutes)}</td>
                      <td className="py-3 text-slate-700">Otworzył szkolenia i lekcje ({1 + (i % 3)})</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${progress}%` }} />
                          </div>
                          <div className="text-xs font-semibold text-slate-600">{progress}%</div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}

      {section === 'lessons' ? (
        <Card title="Ukończone lekcje">
          <div className="text-sm text-slate-600 mb-4">
            (UI demo) Docelowo dane będą zbierane z playera/quizów oraz logów LMS.
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 text-left">Data</th>
                  <th className="py-3 text-left">Szkolenie</th>
                  <th className="py-3 text-left">Lekcja / moduł</th>
                  <th className="py-3 text-left">Czas</th>
                  <th className="py-3 text-left">Status</th>
                  <th className="py-3 text-left">Postęp</th>
                </tr>
              </thead>
              <tbody>
                {userCourses.slice(0, 8).map((s, idx) => {
                  const courseTitle = courses.find((c) => c.id === s.course)?.title ?? s.course;
                  const status: 'done' | 'in-progress' | 'not-started' = idx % 3 === 0 ? 'done' : idx % 3 === 1 ? 'in-progress' : 'not-started';
                  return (
                    <tr key={`${s.id}-${idx}`} className="border-b border-slate-100">
                      <td className="py-3 text-slate-600 whitespace-nowrap">{formatDateTime(new Date().toISOString())}</td>
                      <td className="py-3 font-semibold text-slate-800">{courseTitle}</td>
                      <td className="py-3 text-slate-700">Lekcja {idx + 1}</td>
                      <td className="py-3 text-slate-700 whitespace-nowrap">{formatMinutes(10 + idx * 6)}</td>
                      <td className="py-3">
                        {status === 'done' ? (
                          <Chip tone="green"><CheckCircle2 size={14} /> Ukończona</Chip>
                        ) : status === 'in-progress' ? (
                          <Chip tone="amber"><AlertTriangle size={14} /> W trakcie</Chip>
                        ) : (
                          <Chip tone="slate"><XCircle size={14} /> Nierozpoczęta</Chip>
                        )}
                      </td>
                      <td className="py-3 text-slate-700">{Math.min(100, s.progress)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}

      {section === 'tests' ? (
        <Card title="Wyniki testów i quizów" right={<button className="text-sm font-semibold text-slate-600 hover:text-slate-800">Filtry <ChevronDown size={16} className="inline" /></button>}>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 text-left">Test</th>
                  <th className="py-3 text-left">Data</th>
                  <th className="py-3 text-left">Wynik</th>
                  <th className="py-3 text-left">Status</th>
                  <th className="py-3 text-left">Próby</th>
                  <th className="py-3 text-left">Czas</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => {
                  const score = 40 + Math.round(stableRand(`${selectedEmail}-test-${i}`) * 60);
                  const passed = score >= 70;
                  return (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="py-3 font-semibold text-slate-800">Test {i + 1}</td>
                      <td className="py-3 text-slate-600 whitespace-nowrap">{formatDate(new Date())}</td>
                      <td className="py-3 font-bold text-slate-800">{score}%</td>
                      <td className="py-3">
                        {passed ? <Chip tone="green">ZALICZONY</Chip> : <Chip tone="red">NIEZALICZONY</Chip>}
                      </td>
                      <td className="py-3 text-slate-700">{1 + (i % 3)}</td>
                      <td className="py-3 text-slate-700">{10 + i * 3}m</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}

      {section === 'certificates' ? (
        <Card title="Certyfikaty i osiągnięcia">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-bold text-slate-800">Certyfikaty</div>
              <div className="mt-3 space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-slate-800">Certyfikat #{i + 1}</div>
                      <Chip tone="green">Aktywny</Chip>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Wydano: {formatDate(new Date())}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-800">Osiągnięcia</div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {['Pierwszy test', '7 dni z rzędu', '100% szkolenia', 'Top 10%'].map((label) => (
                  <div key={label} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="text-sm font-semibold text-slate-800">{label}</div>
                    <div className="text-xs text-slate-500 mt-1">Odznaka</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ) : null}

      {section === 'charts' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Wykres postępu">
            <div className="h-56 bg-slate-50 rounded-xl p-4 flex items-end gap-2">
              {Array.from({ length: 14 }).map((_, i) => {
                const v = 15 + Math.round(stableRand(`${selectedEmail}-chart-${i}`) * 80);
                return (
                  <div key={i} className="flex-1 bg-slate-100 rounded-lg overflow-hidden flex items-end">
                    <div className="w-full bg-brand-accent" style={{ height: `${v}%` }} />
                  </div>
                );
              })}
            </div>
          </Card>
          <Card title="Porównanie z planem">
            <div className="text-sm text-slate-600">
              Placeholder pod: deadline’y, plan nauki, porównania okresów i alerty.
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
};

const GroupReport: React.FC<{
  role: ReportsRole;
  courses: Course[];
  students: Student[];
  forcedCompany?: string;
  onBack: () => void;
}> = ({ role, courses, students, forcedCompany, onBack }) => {
  const companies = React.useMemo(() => {
    const set = new Set(students.map((s) => s.company || 'Indywidualny'));
    const list = Array.from(set).sort();
    return forcedCompany ? list.filter((c) => c === forcedCompany) : list;
  }, [students, forcedCompany]);

  const [company, setCompany] = React.useState<string>(forcedCompany ?? companies[0] ?? 'Indywidualny');
  const [department, setDepartment] = React.useState('Wszyscy');
  const [preset, setPreset] = React.useState<DatePreset>('30');
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [section, setSection] = React.useState<GroupSection>('summary');

  const filteredStudents = React.useMemo(() => {
    return students.filter((s) => (s.company || 'Indywidualny') === company);
  }, [students, company]);

  const byEmail = React.useMemo(() => {
    return filteredStudents.reduce<Record<string, Student[]>>((acc, s) => {
      acc[s.email] = acc[s.email] ? [...acc[s.email], s] : [s];
      return acc;
    }, {});
  }, [filteredStudents]);

  const users = React.useMemo(() => {
    return Object.entries(byEmail)
      .map(([email, list]) => {
        const name = list[0]?.name ?? email;
        const progressAvg = list.length ? Math.round(list.reduce((sum, x) => sum + x.progress, 0) / list.length) : 0;
        const lastActivityDays = Math.floor(stableRand(`${email}-last`) * 30);
        const status = lastActivityDays > 14 ? 'zagrożony' : lastActivityDays > 7 ? 'uwaga' : 'aktywny';
        return {
          email,
          name,
          progressAvg,
          assigned: list.length,
          completed: list.filter((x) => x.progress >= 100).length,
          testAvg: 60 + Math.round(stableRand(`${email}-score`) * 35),
          totalMinutes: 120 + Math.round(stableRand(`${email}-mins`) * 1400),
          lastActivityDays,
          status,
        };
      })
      .sort((a, b) => b.totalMinutes - a.totalMinutes);
  }, [byEmail]);

  const groupSummary = React.useMemo(() => {
    const usersCount = users.length;
    const activeCount = users.filter((u) => u.lastActivityDays <= 7).length;
    const avgCompletion = usersCount ? Math.round(users.reduce((sum, u) => sum + u.progressAvg, 0) / usersCount) : 0;
    const totalMinutes = users.reduce((sum, u) => sum + u.totalMinutes, 0);
    const top5 = users.slice(0, 5);
    const risk = users.filter((u) => u.lastActivityDays > 14).slice(0, 5);

    return { usersCount, activeCount, avgCompletion, totalMinutes, top5, risk };
  }, [users]);

  const rangeLabel = preset !== 'custom' ? `Zakres: ostatnie ${preset} dni` : `Zakres: ${from || '...'} – ${to || '...'}`;
  const generatedAt = formatDateTime(new Date().toISOString());

  const exportCsv = () => {
    const csv = toCsv(
      users.map((u) => ({
        Firma: company,
        'Imię i nazwisko': u.name,
        Email: u.email,
        'Ostatnia aktywność (dni)': u.lastActivityDays,
        'Przypisane szkolenia': u.assigned,
        'Ukończone szkolenia': u.completed,
        'Średnia z testów': `${u.testAvg}%`,
        'Łączny czas nauki': formatMinutes(u.totalMinutes),
        Status: u.status,
      }))
    );
    downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8' }), `raport-grupowy-${company}.csv`);
  };

  return (
    <div className="space-y-6">
      <ReportHeader
        title="Raport grupowy (firma / dział)"
        subtitle={`${company}${department !== 'Wszyscy' ? ` • ${department}` : ''}`}
        rangeLabel={rangeLabel}
        generatedAt={generatedAt}
        onBack={onBack}
        onExportCsv={exportCsv}
        onPrint={() => window.print()}
        onSchedule={() => alert('Planowanie raportów: demo UI')}
        onShare={() => alert('Udostępnianie raportów: demo UI')}
      />

      <Card title="Filtry górne">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500">Firma</label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={!!forcedCompany}
              className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white disabled:bg-slate-50"
            >
              {companies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500">Dział</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white"
            >
              <option>Wszyscy</option>
              <option>Logistyka</option>
              <option>Sprzedaż</option>
              <option>HR</option>
            </select>
          </div>

          <DateRangePicker preset={preset} setPreset={setPreset} from={from} to={to} setFrom={setFrom} setTo={setTo} />
        </div>
      </Card>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-wrap items-center gap-2 px-4">
          <TabButton active={section === 'summary'} icon={<BarChart3 size={16} />} label="Podsumowanie" onClick={() => setSection('summary')} />
          <TabButton active={section === 'users'} icon={<Users size={16} />} label="Użytkownicy" onClick={() => setSection('users')} />
          <TabButton active={section === 'courses'} icon={<Layers size={16} />} label="Statystyki szkoleń" onClick={() => setSection('courses')} />
          <TabButton active={section === 'charts'} icon={<LineChart size={16} />} label="Wykresy" onClick={() => setSection('charts')} />
        </div>
      </div>

      {section === 'summary' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Liczba użytkowników</div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{groupSummary.usersCount}</div>
            <div className="text-xs text-emerald-600 mt-2">+{Math.round(stableRand(`${company}-new`) * 12)} w tym miesiącu</div>
          </Card>
          <Card>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Aktywni teraz</div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{groupSummary.activeCount}</div>
            <div className="text-xs text-slate-500 mt-2">Logowanie w ostatnich 7 dniach</div>
          </Card>
          <Card>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Średnie ukończenie</div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{groupSummary.avgCompletion}%</div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden mt-3">
              <div className="h-full bg-brand-accent" style={{ width: `${groupSummary.avgCompletion}%` }} />
            </div>
          </Card>
          <Card>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Czas nauki (suma)</div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{formatMinutes(groupSummary.totalMinutes)}</div>
            <div className="text-xs text-slate-500 mt-2">Średnio {formatMinutes(Math.round(groupSummary.totalMinutes / Math.max(1, groupSummary.usersCount)))} na os.</div>
          </Card>

          <Card title="Top 5 aktywnych" className="lg:col-span-2">
            <div className="space-y-3">
              {groupSummary.top5.map((u) => (
                <div key={u.email} className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-800">{u.name}</div>
                    <div className="text-xs text-slate-500">{u.email}</div>
                  </div>
                  <div className="text-sm font-bold text-slate-800">{u.progressAvg}%</div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Użytkownicy zagrożeni" className="lg:col-span-2">
            <div className="space-y-3">
              {groupSummary.risk.length ? (
                groupSummary.risk.map((u) => (
                  <div key={u.email} className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-800">{u.name}</div>
                      <div className="text-xs text-slate-500">{u.lastActivityDays} dni temu</div>
                    </div>
                    <Chip tone="red">Zagrożony</Chip>
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-500">Brak użytkowników zagrożonych.</div>
              )}
            </div>
          </Card>
        </div>
      ) : null}

      {section === 'users' ? (
        <Card title="Tabela użytkowników" right={<button className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-800">Eksport <Download size={16} /></button>}>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 text-left">Imię i nazwisko</th>
                  <th className="py-3 text-left">Email</th>
                  <th className="py-3 text-left">Ostatnia aktywność</th>
                  <th className="py-3 text-left">Szkolenia</th>
                  <th className="py-3 text-left">Ukończone</th>
                  <th className="py-3 text-left">Śr. wynik</th>
                  <th className="py-3 text-left">Czas</th>
                  <th className="py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 15).map((u) => (
                  <tr key={u.email} className="border-b border-slate-100">
                    <td className="py-3 font-semibold text-slate-800">{u.name}</td>
                    <td className="py-3 text-slate-600">{u.email}</td>
                    <td className="py-3 text-slate-700">{u.lastActivityDays} dni temu</td>
                    <td className="py-3 text-slate-700">{u.assigned}</td>
                    <td className="py-3 text-slate-700">{u.completed} ({u.progressAvg}%)</td>
                    <td className="py-3 text-slate-700">{u.testAvg}%</td>
                    <td className="py-3 text-slate-700">{formatMinutes(u.totalMinutes)}</td>
                    <td className="py-3">
                      {u.status === 'aktywny' ? <Chip tone="green">Aktywny</Chip> : u.status === 'uwaga' ? <Chip tone="amber">Uwaga</Chip> : <Chip tone="red">Zagrożony</Chip>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}

      {section === 'courses' ? (
        <Card title="Statystyki szkoleń">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 text-left">Nazwa szkolenia</th>
                  <th className="py-3 text-left">Zapisani</th>
                  <th className="py-3 text-left">Ukończyli</th>
                  <th className="py-3 text-left">Śr. postęp</th>
                  <th className="py-3 text-left">Śr. wynik</th>
                  <th className="py-3 text-left">Śr. czas</th>
                </tr>
              </thead>
              <tbody>
                {courses.slice(0, 6).map((c) => {
                  const enrolled = filteredStudents.filter((s) => s.course === c.id).length;
                  const completed = filteredStudents.filter((s) => s.course === c.id && s.progress >= 100).length;
                  const avgProg = enrolled
                    ? Math.round(filteredStudents.filter((s) => s.course === c.id).reduce((sum, s) => sum + s.progress, 0) / enrolled)
                    : 0;
                  const avgScore = 60 + Math.round(stableRand(`${company}-${c.id}-score`) * 35);
                  const avgTime = 100 + Math.round(stableRand(`${company}-${c.id}-time`) * 600);

                  return (
                    <tr key={c.id} className="border-b border-slate-100">
                      <td className="py-3 font-semibold text-slate-800">{c.title}</td>
                      <td className="py-3 text-slate-700">{enrolled}</td>
                      <td className="py-3 text-slate-700">{completed}</td>
                      <td className="py-3 text-slate-700">{avgProg}%</td>
                      <td className="py-3 text-slate-700">{avgScore}%</td>
                      <td className="py-3 text-slate-700">{formatMinutes(avgTime)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}

      {section === 'charts' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Wykresy i wizualizacje">
            <div className="text-sm text-slate-600">
              Placeholder pod: histogram wyników, porównanie działów, funnel dropout rate.
            </div>
          </Card>
          <Card title="Porównania">
            <div className="text-sm text-slate-600">
              Placeholder pod: porównania okresów i benchmark międzyfirmowy (anonimizowany).
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
};

type CourseSection = 'summary' | 'lessons' | 'users' | 'tests' | 'charts';

const getScopedStudents = (students: Student[], forcedCompany?: string) =>
  forcedCompany ? students.filter((s) => (s.company || 'Indywidualny') === forcedCompany) : students;

const DEPARTMENTS = ['Wszyscy', 'Logistyka', 'Sprzedaż', 'HR', 'Produkcja'];

const getDepartmentForEmail = (email: string) => {
  const idx = 1 + Math.floor(stableRand(`${email}-dept`) * (DEPARTMENTS.length - 1));
  return DEPARTMENTS[Math.min(DEPARTMENTS.length - 1, Math.max(1, idx))];
};

const flattenLessons = (modules: Module[]) =>
  modules.flatMap((m) => m.lessons.map((lesson) => ({ module: m, lesson })));

const countCompletedLessonsForCourse = (student: Student, lessonIds: string[]) => {
  const set = new Set(student.completedLessons || []);
  return lessonIds.reduce((acc, id) => (set.has(id) ? acc + 1 : acc), 0);
};

const CourseReport: React.FC<{
  role: ReportsRole;
  courses: Course[];
  students: Student[];
  forcedCompany?: string;
  onBack: () => void;
}> = ({ role, courses, students, forcedCompany, onBack }) => {
  const scopedStudents = React.useMemo(() => getScopedStudents(students, forcedCompany), [students, forcedCompany]);
  const [courseId, setCourseId] = React.useState<string>(courses[0]?.id ?? '');
  const [lessonId, setLessonId] = React.useState<string>('all');
  const [companyFilter, setCompanyFilter] = React.useState<string>(forcedCompany ? forcedCompany : 'Wszystkie');
  const [department, setDepartment] = React.useState<string>('Wszyscy');
  const [preset, setPreset] = React.useState<DatePreset>('30');
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [section, setSection] = React.useState<CourseSection>('summary');

  React.useEffect(() => {
    setLessonId('all');
  }, [courseId]);

  React.useEffect(() => {
    if (forcedCompany) {
      setCompanyFilter(forcedCompany);
    }
  }, [forcedCompany]);

  const course = courses.find((c) => c.id === courseId) ?? null;
  const modulesForCourse = React.useMemo(() => COURSE_CURRICULUM.filter((m) => m.courseId === courseId), [courseId]);
  const lessonsForCourse = React.useMemo(() => flattenLessons(modulesForCourse), [modulesForCourse]);
  const lessonIds = React.useMemo(() => lessonsForCourse.map((x) => x.lesson.id), [lessonsForCourse]);

  const companiesForTraining = React.useMemo(() => {
    const set = new Set(
      scopedStudents
        .filter((s) => s.course === courseId)
        .map((s) => s.company || 'Indywidualny')
    );
    return Array.from(set).sort();
  }, [scopedStudents, courseId]);

  React.useEffect(() => {
    if (forcedCompany) return;
    // if current filter becomes invalid after training switch, reset
    if (companyFilter !== 'Wszystkie' && companiesForTraining.length && !companiesForTraining.includes(companyFilter)) {
      setCompanyFilter('Wszystkie');
    }
  }, [companiesForTraining, companyFilter, forcedCompany]);

  const enrollments = React.useMemo(() => {
    let list = scopedStudents.filter((s) => s.course === courseId);
    if (forcedCompany) {
      list = list.filter((s) => (s.company || 'Indywidualny') === forcedCompany);
    } else if (companyFilter !== 'Wszystkie') {
      list = list.filter((s) => (s.company || 'Indywidualny') === companyFilter);
    }
    if (department !== 'Wszyscy') {
      list = list.filter((s) => getDepartmentForEmail(s.email) === department);
    }
    return list;
  }, [scopedStudents, courseId, forcedCompany, companyFilter, department]);
  const uniqueUsersCount = React.useMemo(() => new Set(enrollments.map((s) => s.email)).size, [enrollments]);

  const completionRate = React.useMemo(() => {
    if (!enrollments.length) return 0;
    const done = enrollments.filter((s) => s.progress >= 100).length;
    return Math.round((done / enrollments.length) * 100);
  }, [enrollments]);

  const avgProgress = React.useMemo(() => {
    if (!enrollments.length) return 0;
    return Math.round(enrollments.reduce((sum, s) => sum + Math.min(100, s.progress), 0) / enrollments.length);
  }, [enrollments]);

  const avgTimeMinutes = React.useMemo(() => {
    if (!enrollments.length) return 0;
    const total = enrollments.reduce((sum, s) => sum + (120 + Math.floor(stableRand(`${s.email}-${courseId}-mins`) * 1200)), 0);
    return Math.round(total / enrollments.length);
  }, [enrollments, courseId]);

  const tests = React.useMemo(() => {
    return lessonsForCourse
      .filter((x) => x.lesson.type === 'test')
      .map((x) => ({ id: x.lesson.id, title: x.lesson.title, moduleTitle: x.module.title }));
  }, [lessonsForCourse]);

  const lessonStats = React.useMemo(() => {
    return lessonsForCourse.map(({ module, lesson }) => {
      const completed = enrollments.filter((s) => (s.completedLessons || []).includes(lesson.id)).length;
      const rate = enrollments.length ? Math.round((completed / enrollments.length) * 100) : 0;
      const avgWatch = 4 + Math.round(stableRand(`${courseId}-${lesson.id}-watch`) * 12);
      return { moduleTitle: module.title, lesson, completed, rate, avgWatch };
    });
  }, [lessonsForCourse, enrollments, courseId]);

  const filteredLessonStats = React.useMemo(() => {
    if (lessonId === 'all') return lessonStats;
    return lessonStats.filter((x) => x.lesson.id === lessonId);
  }, [lessonStats, lessonId]);

  const rangeLabel = React.useMemo(() => {
    if (preset !== 'custom') return `Zakres: ostatnie ${preset} dni`;
    if (!from || !to) return 'Zakres: własny';
    return `Zakres: ${from} – ${to}`;
  }, [preset, from, to]);

  const exportCsv = () => {
    if (!course) return;
    const rows = enrollments.map((s) => {
      const doneLessons = countCompletedLessonsForCourse(s, lessonIds);
      return {
        Szkolenie: course.title,
        Firma: s.company ?? 'Indywidualny',
        Dział: getDepartmentForEmail(s.email),
        'Imię i nazwisko': s.name,
        Email: s.email,
        Postęp: `${Math.min(100, s.progress)}%`,
        Status: s.status,
        'Dni do wygaśnięcia': s.expirationDays,
        'Ukończone lekcje': `${doneLessons}/${lessonIds.length || 0}`,
      };
    });

    const csv = toCsv(rows);
    downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8' }), `raport-szkolenie-${course.id}.csv`);
  };

  const generatedAt = formatDateTime(new Date().toISOString());

  return (
    <div className="space-y-6">
      <ReportHeader
        title="Raport szkolenia / lekcji"
        subtitle={course ? course.title : 'Wybierz szkolenie'}
        rangeLabel={rangeLabel}
        generatedAt={generatedAt}
        onBack={onBack}
        onExportCsv={exportCsv}
        onPrint={() => window.print()}
        onSchedule={() => alert('Planowanie raportów: demo UI')}
        onShare={() => alert('Udostępnianie raportów: demo UI')}
      />

      <Card
        title="Filtry górne"
        right={<Chip tone="slate">Widok: {role === 'guardian' ? 'Opiekun firmy' : role === 'admin' ? 'Admin' : 'Manager'}</Chip>}
      >
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500">Szkolenie</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500">Firma</label>
            <select
              value={forcedCompany ? forcedCompany : companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              disabled={!!forcedCompany}
              className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white disabled:bg-slate-50"
            >
              {forcedCompany ? (
                <option value={forcedCompany}>{forcedCompany}</option>
              ) : (
                <>
                  <option value="Wszystkie">Wszystkie</option>
                  {companiesForTraining.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500">Dział</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white"
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500">Lekcja</label>
            <select
              value={lessonId}
              onChange={(e) => setLessonId(e.target.value)}
              className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white"
            >
              <option value="all">Wszystkie</option>
              {lessonsForCourse.map(({ module, lesson }) => (
                <option key={lesson.id} value={lesson.id}>
                  {module.title}: {lesson.title}
                </option>
              ))}
            </select>
          </div>

          <DateRangePicker preset={preset} setPreset={setPreset} from={from} to={to} setFrom={setFrom} setTo={setTo} />

          {forcedCompany ? <Chip tone="slate">Firma: {forcedCompany}</Chip> : null}
        </div>
      </Card>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-wrap items-center gap-2 px-4">
          <TabButton active={section === 'summary'} icon={<BarChart3 size={16} />} label="Podsumowanie" onClick={() => setSection('summary')} />
          <TabButton active={section === 'lessons'} icon={<Layers size={16} />} label="Lekcje" onClick={() => setSection('lessons')} />
          <TabButton active={section === 'users'} icon={<Users size={16} />} label="Użytkownicy" onClick={() => setSection('users')} />
          <TabButton active={section === 'tests'} icon={<FileText size={16} />} label="Testy" onClick={() => setSection('tests')} />
          <TabButton active={section === 'charts'} icon={<LineChart size={16} />} label="Wykresy" onClick={() => setSection('charts')} />
        </div>
      </div>

      {section === 'summary' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Zapisów</div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{enrollments.length}</div>
            <div className="text-xs text-slate-500 mt-2">Użytkowników (unikalne emaile): {uniqueUsersCount}</div>
          </Card>
          <Card>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ukończenie</div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{completionRate}%</div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden mt-3">
              <div className="h-full bg-brand-accent" style={{ width: `${completionRate}%` }} />
            </div>
          </Card>
          <Card>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Śr. postęp</div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{avgProgress}%</div>
            <div className="text-xs text-emerald-600 mt-2">+{Math.round(stableRand(`${courseId}-delta`) * 12)}% vs poprzedni okres</div>
          </Card>
          <Card>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Śr. czas nauki</div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{formatMinutes(avgTimeMinutes)}</div>
            <div className="text-xs text-slate-500 mt-2">na zapis</div>
          </Card>

          <Card title="Słabe punkty (lekcje z drop-off)" className="md:col-span-2">
            <div className="space-y-3">
              {lessonStats
                .slice()
                .sort((a, b) => a.rate - b.rate)
                .slice(0, 5)
                .map((x) => (
                  <div key={x.lesson.id} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{x.lesson.title}</div>
                      <div className="text-xs text-slate-500">{x.moduleTitle}</div>
                    </div>
                    <div className="text-sm font-bold text-slate-800">{x.rate}%</div>
                  </div>
                ))}
              {lessonStats.length === 0 ? <div className="text-sm text-slate-500">Brak curriculum dla szkolenia.</div> : null}
            </div>
          </Card>

          <Card title="Alerty" className="md:col-span-2">
            <div className="space-y-3">
              {enrollments
                .filter((s) => s.expirationDays <= 14 || s.status === 'expired' || s.progress < 20)
                .slice(0, 6)
                .map((s) => (
                  <div key={s.id} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{s.name}</div>
                      <div className="text-xs text-slate-500">{s.email} • {s.company ?? 'Indywidualny'}</div>
                    </div>
                    {s.status === 'expired' ? (
                      <Chip tone="red">Wygasł</Chip>
                    ) : s.expirationDays <= 14 ? (
                      <Chip tone="amber">Wygasa: {s.expirationDays} dni</Chip>
                    ) : (
                      <Chip tone="slate">Niski postęp: {Math.min(100, s.progress)}%</Chip>
                    )}
                  </div>
                ))}
              {enrollments.length === 0 ? <div className="text-sm text-slate-500">Brak zapisów dla tego szkolenia.</div> : null}
            </div>
          </Card>

          <Card title="Wnioski i rekomendacje" className="md:col-span-4">
            {(() => {
              const lowProgress = enrollments.filter((s) => s.progress < 20).length;
              const expiring = enrollments.filter((s) => s.expirationDays <= 14).length;
              const worst = lessonStats.slice().sort((a, b) => a.rate - b.rate)[0];
              const best = lessonStats.slice().sort((a, b) => b.rate - a.rate)[0];
              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="text-xs font-semibold text-slate-500">Ryzyka</div>
                    <div className="mt-2 space-y-2 text-sm">
                      <div className="flex items-center justify-between"><span>Niski postęp (&lt;20%)</span><span className="font-bold">{lowProgress}</span></div>
                      <div className="flex items-center justify-between"><span>Wygasa ≤14 dni</span><span className="font-bold">{expiring}</span></div>
                      <div className="flex items-center justify-between"><span>Status "warning/expired"</span><span className="font-bold">{enrollments.filter((s) => s.status !== 'active').length}</span></div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white">
                    <div className="text-xs font-semibold text-slate-500">Największy drop-off</div>
                    <div className="mt-2 text-sm font-bold text-slate-900">{worst ? worst.lesson.title : '—'}</div>
                    <div className="text-xs text-slate-500 mt-1">Wskaźnik ukończenia: {worst ? `${worst.rate}%` : '—'}</div>
                    <div className="text-xs text-slate-500 mt-2">Rekomendacja: skrócić/ulepszyć materiał, dodać przypomnienia.</div>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white">
                    <div className="text-xs font-semibold text-slate-500">Najlepsza lekcja</div>
                    <div className="mt-2 text-sm font-bold text-slate-900">{best ? best.lesson.title : '—'}</div>
                    <div className="text-xs text-slate-500 mt-1">Wskaźnik ukończenia: {best ? `${best.rate}%` : '—'}</div>
                    <div className="text-xs text-slate-500 mt-2">Rekomendacja: utrzymać format i przenieść wzorzec na inne lekcje.</div>
                  </div>
                </div>
              );
            })()}
          </Card>
        </div>
      ) : null}

      {section === 'lessons' ? (
        <Card title="Ukończenia lekcji" right={<Chip tone="slate">Lekcji: {filteredLessonStats.length}</Chip>}>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 text-left">Moduł</th>
                  <th className="py-3 text-left">Lekcja</th>
                  <th className="py-3 text-left">Typ</th>
                  <th className="py-3 text-left">Ukończyli</th>
                  <th className="py-3 text-left">Wskaźnik</th>
                  <th className="py-3 text-left">Śr. obejrzeń</th>
                </tr>
              </thead>
              <tbody>
                {filteredLessonStats.map((x) => (
                  <tr key={x.lesson.id} className="border-b border-slate-100">
                    <td className="py-3 text-slate-600">{x.moduleTitle}</td>
                    <td className="py-3 font-semibold text-slate-800">{x.lesson.title}</td>
                    <td className="py-3 text-slate-700">{x.lesson.type}</td>
                    <td className="py-3 text-slate-700">{x.completed} / {enrollments.length}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div className="bg-brand-accent h-2" style={{ width: `${x.rate}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-slate-600">{x.rate}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-slate-700">{x.avgWatch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}

      {section === 'users' ? (
        <Card title="Użytkownicy zapisani na szkolenie">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 text-left">Imię i nazwisko</th>
                  <th className="py-3 text-left">Email</th>
                  <th className="py-3 text-left">Firma</th>
                  <th className="py-3 text-left">Postęp</th>
                  <th className="py-3 text-left">Lekcje</th>
                  <th className="py-3 text-left">Status</th>
                  <th className="py-3 text-left">Wygasa (dni)</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.slice(0, 25).map((s) => {
                  const doneLessons = countCompletedLessonsForCourse(s, lessonIds);
                  return (
                    <tr key={s.id} className="border-b border-slate-100">
                      <td className="py-3 font-semibold text-slate-800">{s.name}</td>
                      <td className="py-3 text-slate-600">{s.email}</td>
                      <td className="py-3 text-slate-700">{s.company ?? 'Indywidualny'}</td>
                      <td className="py-3 text-slate-700">{Math.min(100, s.progress)}%</td>
                      <td className="py-3 text-slate-700">{doneLessons}/{lessonIds.length || 0}</td>
                      <td className="py-3">
                        {s.status === 'active' ? (
                          <Chip tone="green">Aktywny</Chip>
                        ) : s.status === 'warning' ? (
                          <Chip tone="amber">Uwaga</Chip>
                        ) : (
                          <Chip tone="red">Wygasł</Chip>
                        )}
                      </td>
                      <td className="py-3 text-slate-700">{s.expirationDays}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="text-xs text-slate-500 mt-3">(UI demo) Limit 25 wierszy w tabeli.</div>
        </Card>
      ) : null}

      {section === 'tests' ? (
        <Card title="Testy w szkoleniu" right={<Chip tone="slate">Testów: {tests.length}</Chip>}>
          {tests.length === 0 ? (
            <div className="text-sm text-slate-500">To szkolenie nie ma testów w curriculum.</div>
          ) : (
            <div className="space-y-4">
              {tests.map((t) => {
                const results = enrollments.map((s) => {
                  const score = 40 + Math.round(stableRand(`${s.email}-${t.id}`) * 60);
                  return { email: s.email, name: s.name, score, passed: score >= 70 };
                });
                const passed = results.filter((r) => r.passed).length;
                const passRate = results.length ? Math.round((passed / results.length) * 100) : 0;

                return (
                  <div key={t.id} className="p-4 rounded-xl border border-slate-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <div className="font-bold text-slate-800">{t.title}</div>
                        <div className="text-xs text-slate-500">{t.moduleTitle}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Chip tone={passRate >= 70 ? 'green' : passRate >= 50 ? 'amber' : 'red'}>
                          Zdawalność: {passRate}%
                        </Chip>
                        <Chip tone="slate">Uczestników: {results.length}</Chip>
                      </div>
                    </div>

                    <div className="mt-3 overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-200">
                            <th className="py-2 text-left">Użytkownik</th>
                            <th className="py-2 text-left">Email</th>
                            <th className="py-2 text-left">Wynik</th>
                            <th className="py-2 text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.slice(0, 8).map((r) => (
                            <tr key={r.email} className="border-b border-slate-100">
                              <td className="py-2 font-semibold text-slate-800">{r.name}</td>
                              <td className="py-2 text-slate-600">{r.email}</td>
                              <td className="py-2 text-slate-800 font-bold">{r.score}%</td>
                              <td className="py-2">
                                {r.passed ? <Chip tone="green">ZALICZONY</Chip> : <Chip tone="red">NIEZALICZONY</Chip>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      ) : null}

      {section === 'charts' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Wykres postępu (rozkład)" right={<Chip tone="slate">Śr.: {avgProgress}%</Chip>}>
            <div className="h-44 bg-slate-50 rounded-xl flex items-end gap-2 p-4">
              {Array.from({ length: 10 }).map((_, i) => {
                const v = 10 + Math.round(stableRand(`${courseId}-hist-${i}`) * 90);
                return (
                  <div key={i} className="flex-1 bg-slate-100 rounded-lg overflow-hidden flex items-end">
                    <div className="w-full bg-brand-accent" style={{ height: `${v}%` }} />
                  </div>
                );
              })}
            </div>
            <div className="text-xs text-slate-500 mt-3">(UI demo) Docelowo: rozkład postępu / czas / wyniki testów.</div>
          </Card>

          <Card title="Funnel ukończeń">
            <div className="space-y-3">
              {[
                { label: 'Zapisani', value: enrollments.length },
                { label: 'Rozpoczęli', value: enrollments.filter((s) => s.progress > 0).length },
                { label: '50%+', value: enrollments.filter((s) => s.progress >= 50).length },
                { label: 'Ukończyli', value: enrollments.filter((s) => s.progress >= 100).length },
              ].map((step) => {
                const rate = enrollments.length ? Math.round((step.value / enrollments.length) * 100) : 0;
                return (
                  <div key={step.label}>
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-semibold text-slate-800">{step.label}</div>
                      <div className="text-slate-700">{step.value} ({rate}%)</div>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-emerald-500" style={{ width: `${rate}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
};

type CompareMode = 'companies' | 'periods' | 'trainings';

const CompareReport: React.FC<{
  role: ReportsRole;
  courses: Course[];
  students: Student[];
  forcedCompany?: string;
  onBack: () => void;
}> = ({ role, courses, students, forcedCompany, onBack }) => {
  const scopedStudents = React.useMemo(() => getScopedStudents(students, forcedCompany), [students, forcedCompany]);
  const companies = React.useMemo(() => {
    const set = new Set(scopedStudents.map((s) => s.company || 'Indywidualny'));
    return Array.from(set).sort();
  }, [scopedStudents]);

  const [mode, setMode] = React.useState<CompareMode>(forcedCompany ? 'periods' : 'companies');
  const [companyA, setCompanyA] = React.useState<string>(companies[0] ?? 'Indywidualny');
  const [companyB, setCompanyB] = React.useState<string>(companies[1] ?? companies[0] ?? 'Indywidualny');
  const [companyPeriods, setCompanyPeriods] = React.useState<string>(forcedCompany ?? companies[0] ?? 'Indywidualny');
  const [presetA, setPresetA] = React.useState<DatePreset>('30');
  const [presetB, setPresetB] = React.useState<DatePreset>('90');

  const [trainingA, setTrainingA] = React.useState<string>('');
  const [trainingB, setTrainingB] = React.useState<string>('');
  const [trainingCompany, setTrainingCompany] = React.useState<string>(forcedCompany ?? 'Wszystkie');

  const trainingTitle = React.useCallback(
    (id: string) => courses.find((c) => c.id === id)?.title ?? id,
    [courses]
  );

  const trainingFilterByCompany = React.useCallback(
    (s: Student) => {
      if (forcedCompany) return (s.company || 'Indywidualny') === forcedCompany;
      if (trainingCompany === 'Wszystkie') return true;
      return (s.company || 'Indywidualny') === trainingCompany;
    },
    [forcedCompany, trainingCompany]
  );

  const availableTrainingIds = React.useMemo(() => {
    const ids = new Set(
      scopedStudents
        .filter(trainingFilterByCompany)
        .map((s) => s.course)
        .filter(Boolean)
    );
    return Array.from(ids);
  }, [scopedStudents, trainingFilterByCompany]);

  const trainingOptions = React.useMemo(
    () =>
      availableTrainingIds
        .map((id) => ({ id, label: trainingTitle(id) }))
        .sort((a, b) => a.label.localeCompare(b.label, 'pl')),
    [availableTrainingIds, trainingTitle]
  );

  React.useEffect(() => {
    if (!companies.length) return;
    setCompanyA((prev) => (companies.includes(prev) ? prev : companies[0]));
    setCompanyB((prev) => (companies.includes(prev) ? prev : companies[Math.min(1, companies.length - 1)]));
    setCompanyPeriods((prev) => (companies.includes(prev) ? prev : companies[0]));
  }, [companies]);

  React.useEffect(() => {
    // keep training selections valid when company scope changes
    if (!availableTrainingIds.length) {
      setTrainingA('');
      setTrainingB('');
      return;
    }

    setTrainingA((prev) => (availableTrainingIds.includes(prev) ? prev : availableTrainingIds[0]));
    setTrainingB((prev) => {
      if (availableTrainingIds.includes(prev)) return prev;
      return availableTrainingIds[1] ?? availableTrainingIds[0];
    });
  }, [availableTrainingIds]);

  const computeCompanyMetrics = React.useCallback(
    (company: string) => {
      const items = scopedStudents.filter((s) => (s.company || 'Indywidualny') === company);
      const uniqueUsers = new Set(items.map((s) => s.email));
      const users = Array.from(uniqueUsers);
      const completionRate = items.length
        ? Math.round((items.filter((s) => s.progress >= 100).length / items.length) * 100)
        : 0;
      const avgProgress = items.length
        ? Math.round(items.reduce((sum, s) => sum + Math.min(100, s.progress), 0) / items.length)
        : 0;
      const active7d = users.filter((email) => Math.floor(stableRand(`${email}-last`) * 30) <= 7).length;
      const risk = users.filter((email) => Math.floor(stableRand(`${email}-last`) * 30) > 14).length;
      const expiringSoon = items.filter((s) => s.expirationDays <= 14).length;
      return {
        company,
        enrollments: items.length,
        users: users.length,
        completionRate,
        avgProgress,
        active7d,
        risk,
        expiringSoon,
      };
    },
    [scopedStudents]
  );

  const generatedAt = formatDateTime(new Date().toISOString());

  const rangeLabel = mode === 'companies'
    ? 'Tryb: porównanie firm'
    : mode === 'trainings'
      ? 'Tryb: porównanie szkoleń'
      : `Tryb: porównanie okresów (A: ${presetA} dni, B: ${presetB} dni)`;

  const exportCsv = () => {
    if (mode === 'companies') {
      const a = computeCompanyMetrics(companyA);
      const b = computeCompanyMetrics(companyB);
      const bench = {
        ...a,
        company: 'Benchmark (anonimizowany)',
        completionRate: Math.max(0, Math.min(100, Math.round(((a.completionRate + b.completionRate) / 2) + (stableRand('bench') * 10 - 5)))),
        avgProgress: Math.max(0, Math.min(100, Math.round(((a.avgProgress + b.avgProgress) / 2) + (stableRand('bench2') * 10 - 5)))),
      };
      const csv = toCsv([
        {
          'Porównanie': 'Firmy',
          Firma: a.company,
          Użytkownicy: a.users,
          Zapisów: a.enrollments,
          'Ukończenie (%)': a.completionRate,
          'Śr. postęp (%)': a.avgProgress,
          'Aktywni 7d': a.active7d,
          'Zagrożeni (14d+)': a.risk,
          'Wygasa <=14d': a.expiringSoon,
        },
        {
          'Porównanie': 'Firmy',
          Firma: b.company,
          Użytkownicy: b.users,
          Zapisów: b.enrollments,
          'Ukończenie (%)': b.completionRate,
          'Śr. postęp (%)': b.avgProgress,
          'Aktywni 7d': b.active7d,
          'Zagrożeni (14d+)': b.risk,
          'Wygasa <=14d': b.expiringSoon,
        },
        {
          'Porównanie': 'Benchmark',
          Firma: bench.company,
          Użytkownicy: '-',
          Zapisów: '-',
          'Ukończenie (%)': bench.completionRate,
          'Śr. postęp (%)': bench.avgProgress,
          'Aktywni 7d': '-',
          'Zagrożeni (14d+)': '-',
          'Wygasa <=14d': '-',
        },
      ]);
      downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8' }), `raport-porownanie-firm.csv`);
      return;
    }

    if (mode === 'trainings') {
      const scope = forcedCompany ? forcedCompany : trainingCompany;

      const compute = (trainingId: string) => {
        const items = scopedStudents.filter((s) => s.course === trainingId).filter(trainingFilterByCompany);
        const users = new Set(items.map((s) => s.email));
        const completionRate = items.length ? Math.round((items.filter((s) => s.progress >= 100).length / items.length) * 100) : 0;
        const avgProgress = items.length ? Math.round(items.reduce((sum, s) => sum + Math.min(100, s.progress), 0) / items.length) : 0;
        const avgTime = items.length ? Math.round(items.reduce((sum, s) => sum + (120 + Math.floor(stableRand(`${s.email}-${trainingId}-mins`) * 1200)), 0) / items.length) : 0;
        const tests = COURSE_CURRICULUM.filter((m) => m.courseId === trainingId).flatMap((m) => m.lessons).filter((l) => l.type === 'test');
        const passRate = items.length
          ? Math.round(
              (items.reduce((sum, s) => sum + (tests.length ? tests.reduce((tSum, t) => tSum + (40 + Math.round(stableRand(`${s.email}-${t.id}`) * 60) >= 70 ? 1 : 0), 0) / tests.length : 0), 0) / items.length) * 100
            )
          : 0;

        return { trainingId, enrollments: items.length, users: users.size, completionRate, avgProgress, avgTime, tests: tests.length, passRate };
      };

      const a = compute(trainingA);
      const b = compute(trainingB);
      const csv = toCsv([
        {
          Porównanie: 'Szkolenia',
          Firma: scope,
          Szkolenie: trainingTitle(trainingA),
          Użytkownicy: a.users,
          Zapisów: a.enrollments,
          'Ukończenie (%)': a.completionRate,
          'Śr. postęp (%)': a.avgProgress,
          'Śr. czas': formatMinutes(a.avgTime),
          Testów: a.tests,
          'Zdawalność testów (%)': a.passRate,
        },
        {
          Porównanie: 'Szkolenia',
          Firma: scope,
          Szkolenie: trainingTitle(trainingB),
          Użytkownicy: b.users,
          Zapisów: b.enrollments,
          'Ukończenie (%)': b.completionRate,
          'Śr. postęp (%)': b.avgProgress,
          'Śr. czas': formatMinutes(b.avgTime),
          Testów: b.tests,
          'Zdawalność testów (%)': b.passRate,
        },
      ]);
      downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8' }), `raport-porownanie-szkolen.csv`);
      return;
    }

    const base = computeCompanyMetrics(companyPeriods);
    const factorA = 0.9 + stableRand(`${companyPeriods}-A-${presetA}`) * 0.25;
    const factorB = 0.9 + stableRand(`${companyPeriods}-B-${presetB}`) * 0.25;
    const a = {
      ...base,
      completionRate: Math.max(0, Math.min(100, Math.round(base.completionRate * factorA))),
      avgProgress: Math.max(0, Math.min(100, Math.round(base.avgProgress * factorA))),
      active7d: Math.round(base.active7d * factorA),
    };
    const b = {
      ...base,
      completionRate: Math.max(0, Math.min(100, Math.round(base.completionRate * factorB))),
      avgProgress: Math.max(0, Math.min(100, Math.round(base.avgProgress * factorB))),
      active7d: Math.round(base.active7d * factorB),
    };
    const csv = toCsv([
      { Okres: `A (${presetA} dni)`, Firma: companyPeriods, 'Ukończenie (%)': a.completionRate, 'Śr. postęp (%)': a.avgProgress, 'Aktywni 7d': a.active7d },
      { Okres: `B (${presetB} dni)`, Firma: companyPeriods, 'Ukończenie (%)': b.completionRate, 'Śr. postęp (%)': b.avgProgress, 'Aktywni 7d': b.active7d },
    ]);
    downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8' }), `raport-porownanie-okresow.csv`);
  };

  const aMetrics = React.useMemo(() => (mode === 'companies' ? computeCompanyMetrics(companyA) : null), [mode, computeCompanyMetrics, companyA]);
  const bMetrics = React.useMemo(() => (mode === 'companies' ? computeCompanyMetrics(companyB) : null), [mode, computeCompanyMetrics, companyB]);

  const periodMetrics = React.useMemo(() => {
    if (mode !== 'periods') return null;
    const base = computeCompanyMetrics(companyPeriods);
    const factorA = 0.9 + stableRand(`${companyPeriods}-A-${presetA}`) * 0.25;
    const factorB = 0.9 + stableRand(`${companyPeriods}-B-${presetB}`) * 0.25;
    const a = {
      completionRate: Math.max(0, Math.min(100, Math.round(base.completionRate * factorA))),
      avgProgress: Math.max(0, Math.min(100, Math.round(base.avgProgress * factorA))),
      active7d: Math.round(base.active7d * factorA),
    };
    const b = {
      completionRate: Math.max(0, Math.min(100, Math.round(base.completionRate * factorB))),
      avgProgress: Math.max(0, Math.min(100, Math.round(base.avgProgress * factorB))),
      active7d: Math.round(base.active7d * factorB),
    };
    return { base, a, b };
  }, [mode, computeCompanyMetrics, companyPeriods, presetA, presetB]);

  const TitleRight = (
    <Chip tone="slate">Widok: {role === 'guardian' ? 'Opiekun firmy' : role === 'admin' ? 'Admin' : 'Manager'}</Chip>
  );

  return (
    <div className="space-y-6">
      <ReportHeader
        title="Raport porównawczy"
        subtitle={forcedCompany ? `Firma: ${forcedCompany}` : 'Porównanie firm lub okresów'}
        rangeLabel={rangeLabel}
        generatedAt={generatedAt}
        onBack={onBack}
        onExportCsv={exportCsv}
        onPrint={() => window.print()}
        onSchedule={() => alert('Planowanie raportów: demo UI')}
        onShare={() => alert('Udostępnianie raportów: demo UI')}
      />

      <Card title="Konfiguracja porównania" right={TitleRight}>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500">Tryb</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as CompareMode)}
              className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white disabled:bg-slate-50"
            >
              {!forcedCompany ? <option value="companies">Porównanie firm</option> : null}
              <option value="periods">Porównanie okresów</option>
              <option value="trainings">Porównanie szkoleń</option>
            </select>
            {forcedCompany ? <div className="text-xs text-slate-500 mt-1">Dla opiekuna: dane tylko z Twojej firmy.</div> : null}
          </div>

          {mode === 'companies' ? (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-500">Firma A</label>
                <select value={companyA} onChange={(e) => setCompanyA(e.target.value)} className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white">
                  {companies.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Firma B</label>
                <select value={companyB} onChange={(e) => setCompanyB(e.target.value)} className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white">
                  {companies.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <Chip tone="slate">Benchmark: anonimizowany</Chip>
            </>
          ) : mode === 'periods' ? (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-500">Firma</label>
                <select
                  value={companyPeriods}
                  onChange={(e) => setCompanyPeriods(e.target.value)}
                  disabled={!!forcedCompany}
                  className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white disabled:bg-slate-50"
                >
                  {companies.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Okres A</label>
                <select value={presetA} onChange={(e) => setPresetA(e.target.value as DatePreset)} className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white">
                  <option value="7">Ostatnie 7 dni</option>
                  <option value="30">Ostatnie 30 dni</option>
                  <option value="90">Ostatnie 90 dni</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Okres B</label>
                <select value={presetB} onChange={(e) => setPresetB(e.target.value as DatePreset)} className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white">
                  <option value="7">Ostatnie 7 dni</option>
                  <option value="30">Ostatnie 30 dni</option>
                  <option value="90">Ostatnie 90 dni</option>
                </select>
              </div>
            </>
          ) : (
            <>
              {!forcedCompany ? (
                <div>
                  <label className="text-xs font-semibold text-slate-500">Firma (opcjonalnie)</label>
                  <select value={trainingCompany} onChange={(e) => setTrainingCompany(e.target.value)} className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white">
                    <option value="Wszystkie">Wszystkie</option>
                    {companies.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <Chip tone="slate">Firma: {forcedCompany}</Chip>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-500">Szkolenie A</label>
                <select value={trainingA} onChange={(e) => setTrainingA(e.target.value)} className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white">
                  {trainingOptions.map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
                {trainingA ? <div className="text-[11px] text-slate-500 mt-1">Wybrane: {trainingTitle(trainingA)}</div> : null}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500">Szkolenie B</label>
                <select value={trainingB} onChange={(e) => setTrainingB(e.target.value)} className="mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white">
                  {trainingOptions.map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
      </Card>

      {mode === 'companies' && aMetrics && bMetrics ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card title="Ukończenie">
            <div className="text-sm text-slate-500">{aMetrics.company} vs {bMetrics.company}</div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="text-xs text-slate-500">Firma A</div>
                <div className="text-2xl font-bold text-slate-900">{aMetrics.completionRate}%</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Firma B</div>
                <div className="text-2xl font-bold text-slate-900">{bMetrics.completionRate}%</div>
              </div>
            </div>
            <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-brand-accent" style={{ width: `${aMetrics.completionRate}%` }} />
            </div>
            <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: `${bMetrics.completionRate}%` }} />
            </div>
          </Card>

          <Card title="Aktywność (7 dni)">
            <div className="text-sm text-slate-500">Aktywni użytkownicy</div>
            <div className="mt-3 flex items-end justify-between">
              <div className="text-2xl font-bold text-slate-900">{aMetrics.active7d}</div>
              <div className="text-2xl font-bold text-slate-900">{bMetrics.active7d}</div>
            </div>
            <div className="text-xs text-slate-500 mt-2">(UI demo) aktywność estymowana z logów.</div>
          </Card>

          <Card title="Ryzyko">
            <div className="text-sm text-slate-500">Zagrożeni (brak aktywności 14d+)</div>
            <div className="mt-3 flex items-end justify-between">
              <div className="text-2xl font-bold text-slate-900">{aMetrics.risk}</div>
              <div className="text-2xl font-bold text-slate-900">{bMetrics.risk}</div>
            </div>
            <div className="text-xs text-slate-500 mt-2">Wygasa ≤14 dni: A {aMetrics.expiringSoon} / B {bMetrics.expiringSoon}</div>
          </Card>

          <Card title="Tabela porównawcza" className="lg:col-span-3">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 text-left">Metryka</th>
                    <th className="py-3 text-left">Firma A</th>
                    <th className="py-3 text-left">Firma B</th>
                    <th className="py-3 text-left">Różnica</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Użytkownicy', a: aMetrics.users, b: bMetrics.users },
                    { label: 'Zapisów', a: aMetrics.enrollments, b: bMetrics.enrollments },
                    { label: 'Śr. postęp (%)', a: aMetrics.avgProgress, b: bMetrics.avgProgress },
                    { label: 'Ukończenie (%)', a: aMetrics.completionRate, b: bMetrics.completionRate },
                    { label: 'Aktywni 7d', a: aMetrics.active7d, b: bMetrics.active7d },
                    { label: 'Zagrożeni (14d+)', a: aMetrics.risk, b: bMetrics.risk },
                  ].map((row) => (
                    <tr key={row.label} className="border-b border-slate-100">
                      <td className="py-3 font-semibold text-slate-800">{row.label}</td>
                      <td className="py-3 text-slate-700">{row.a}</td>
                      <td className="py-3 text-slate-700">{row.b}</td>
                      <td className="py-3 text-slate-700 font-semibold">{Number(row.b) - Number(row.a)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : null}

      {mode === 'periods' && periodMetrics ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card title="Ukończenie (A vs B)">
            <div className="text-sm text-slate-500">{companyPeriods}</div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="text-xs text-slate-500">A ({presetA} dni)</div>
                <div className="text-2xl font-bold text-slate-900">{periodMetrics.a.completionRate}%</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">B ({presetB} dni)</div>
                <div className="text-2xl font-bold text-slate-900">{periodMetrics.b.completionRate}%</div>
              </div>
            </div>
            <div className="text-xs text-slate-500 mt-2">Δ: {periodMetrics.b.completionRate - periodMetrics.a.completionRate} pp</div>
          </Card>
          <Card title="Średni postęp">
            <div className="mt-3 flex items-end justify-between">
              <div className="text-2xl font-bold text-slate-900">{periodMetrics.a.avgProgress}%</div>
              <div className="text-2xl font-bold text-slate-900">{periodMetrics.b.avgProgress}%</div>
            </div>
            <div className="text-xs text-slate-500 mt-2">Δ: {periodMetrics.b.avgProgress - periodMetrics.a.avgProgress} pp</div>
          </Card>
          <Card title="Aktywni (7 dni)">
            <div className="mt-3 flex items-end justify-between">
              <div className="text-2xl font-bold text-slate-900">{periodMetrics.a.active7d}</div>
              <div className="text-2xl font-bold text-slate-900">{periodMetrics.b.active7d}</div>
            </div>
            <div className="text-xs text-slate-500 mt-2">(UI demo) estymacja aktywności.</div>
          </Card>

          <Card title="Podsumowanie" className="lg:col-span-3">
            <div className="text-sm text-slate-600">
              Ten widok porównuje okresy dla jednej firmy. W wersji docelowej dodamy: wybór konkretnych szkoleń, KPI finansowe oraz segmenty użytkowników.
            </div>
          </Card>
        </div>
      ) : null}

      {mode === 'trainings' ? (
        <Card title="Porównanie szkoleń (podsumowanie)">
          <div className="text-sm text-slate-600">
            (UI demo) Ten tryb pokazuje porównanie dwóch szkoleń w obrębie wybranej firmy (lub wszystkich firm).
          </div>
          <div className="mt-3 text-sm text-slate-800">
            <div><span className="text-slate-500">Szkolenie A:</span> {trainingA ? trainingTitle(trainingA) : '-'}</div>
            <div><span className="text-slate-500">Szkolenie B:</span> {trainingB ? trainingTitle(trainingB) : '-'}</div>
          </div>
        </Card>
      ) : null}
    </div>
  );
};

const ScheduledReports: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [section, setSection] = React.useState<ScheduledSection>('automations');

  const automations = React.useMemo(
    () => [
      {
        id: 'a1',
        name: 'Tygodniowy Raport Sprzedaży',
        emails: ['admin@multiserwis.pl', 'zarzad@multiserwis.pl'],
        frequency: 'Poniedziałek 08:00',
        format: 'PDF',
        next: '12 Lut 2026',
        active: true,
      },
      {
        id: 'a2',
        name: 'Aktywność Użytkowników',
        emails: ['marketing@multiserwis.pl'],
        frequency: '1. dzień miesiąca',
        format: 'CSV',
        next: '01 Mar 2026',
        active: true,
      },
      {
        id: 'a3',
        name: 'Raport Prowizyjny (Wstrzymany)',
        emails: ['ksiegowosc@multiserwis.pl'],
        frequency: 'Piątek 16:00',
        format: 'PDF',
        next: '-',
        active: false,
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <ReportHeader
        title="Raporty zaplanowane i szablony"
        subtitle="Zarządzaj cyklicznymi wysyłkami raportów oraz szybkimi szablonami."
        rangeLabel="Konfiguracja"
        generatedAt={formatDateTime(new Date().toISOString())}
        onBack={onBack}
      />

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-wrap items-center gap-2 px-4">
          <TabButton active={section === 'automations'} icon={<Mail size={16} />} label="Automatyczna wysyłka" onClick={() => setSection('automations')} />
          <TabButton active={section === 'templates'} icon={<FileText size={16} />} label="Zapisane szablony" onClick={() => setSection('templates')} />
        </div>
      </div>

      {section === 'automations' ? (
        <Card title="Automatyczna wysyłka" right={<div className="flex gap-2"><Chip tone="green">3 Aktywne</Chip><Chip tone="slate">1 Wstrzymane</Chip></div>}>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 text-left">Nazwa raportu</th>
                  <th className="py-3 text-left">Odbiorcy (email)</th>
                  <th className="py-3 text-left">Częstotliwość</th>
                  <th className="py-3 text-left">Format</th>
                  <th className="py-3 text-left">Następna wysyłka</th>
                  <th className="py-3 text-left">Status</th>
                  <th className="py-3 text-left">Akcje</th>
                </tr>
              </thead>
              <tbody>
                {automations.map((a) => (
                  <tr key={a.id} className="border-b border-slate-100">
                    <td className="py-3 font-semibold text-slate-800">{a.name}</td>
                    <td className="py-3 text-slate-600">
                      {a.emails.map((e) => (
                        <div key={e}>{e}</div>
                      ))}
                    </td>
                    <td className="py-3 text-slate-700">{a.frequency}</td>
                    <td className="py-3 text-slate-700">{a.format}</td>
                    <td className="py-3 text-slate-700">{a.next}</td>
                    <td className="py-3">
                      {a.active ? <Chip tone="green">Aktywny</Chip> : <Chip tone="slate">Wstrzymany</Chip>}
                    </td>
                    <td className="py-3 text-slate-600">
                      <button className="px-2 py-1 rounded hover:bg-slate-100">✎</button>
                      <button className="px-2 py-1 rounded hover:bg-slate-100">🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}

      {section === 'templates' ? (
        <Card title="Zapisane szablony">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Pełny Audyt Szkoleń', 'Nowi Rejestrujący', 'Raport Ukończeń (B2B)'].map((name) => (
              <div key={name} className="p-5 rounded-2xl border border-slate-200 bg-white">
                <div className="font-bold text-slate-800">{name}</div>
                <div className="text-xs text-slate-500 mt-1">Ostatnie użycie: {1 + Math.floor(stableRand(name) * 7)} dni temu</div>
                <div className="mt-4 flex items-center justify-between">
                  <button className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800">
                    ▶ Uruchom
                  </button>
                  <button className="px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    Edytuj
                  </button>
                </div>
              </div>
            ))}
            <div className="p-5 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-center">
              <div className="text-3xl font-bold text-slate-400">+</div>
              <div className="font-bold text-slate-800 mt-2">Stwórz szablon</div>
              <div className="text-xs text-slate-500 mt-1">Zapisz bieżącą konfigurację raportu jako szablon.</div>
            </div>
          </div>
        </Card>
      ) : null}
    </div>
  );
};

export const ReportsCenter: React.FC<{
  role: ReportsRole;
  courses: Course[];
  students: Student[];
  forcedCompany?: string;
}> = ({ role, courses, students, forcedCompany }) => {
  const [view, setView] = React.useState<ReportsView>('picker');

  return (
    <div className="space-y-6">
      {view === 'picker' ? <ReportPicker role={role} onPick={setView} /> : null}
      {view === 'individual' ? (
        <IndividualReport role={role} courses={courses} students={students} forcedCompany={forcedCompany} onBack={() => setView('picker')} />
      ) : null}
      {view === 'group' ? (
        <GroupReport role={role} courses={courses} students={students} forcedCompany={forcedCompany} onBack={() => setView('picker')} />
      ) : null}
      {view === 'course' ? (
        <CourseReport role={role} courses={courses} students={students} forcedCompany={forcedCompany} onBack={() => setView('picker')} />
      ) : null}
      {view === 'compare' ? (
        <CompareReport role={role} courses={courses} students={students} forcedCompany={forcedCompany} onBack={() => setView('picker')} />
      ) : null}
      {view === 'scheduled' ? <ScheduledReports onBack={() => setView('picker')} /> : null}
    </div>
  );
};
