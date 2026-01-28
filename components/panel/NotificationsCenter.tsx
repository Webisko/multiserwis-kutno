import React from 'react';
import { CheckCircle, Filter, Settings, Trash2 } from 'lucide-react';

export type NotificationStatus = 'read' | 'unread';
export type NotificationType = 'system' | 'users' | 'sales' | 'training';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  status: NotificationStatus;
  type: NotificationType;
  tag?: string;
}

const mockNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Nowy użytkownik zarejestrowany',
    message: 'Krzysztof Nowak (k.nowak@example.com) dołączył do platformy.',
    time: '14:32',
    status: 'unread',
    type: 'users',
    tag: 'Użytkownicy'
  },
  {
    id: 'n2',
    title: 'Błąd płatności',
    message: 'Nieudana próba obciążenia karty dla subskrypcji Firmy XYZ. Kod błędu: #ERR-402.',
    time: '12:15',
    status: 'unread',
    type: 'system',
    tag: 'Pilne'
  },
  {
    id: 'n3',
    title: 'Zakup kursu: BHP Wstępne',
    message: 'Nowe zamówienie kursu od klienta indywidualnego.',
    time: '10:45',
    status: 'read',
    type: 'sales',
    tag: 'Sprzedaż'
  },
  {
    id: 'n4',
    title: 'Nowe zapytanie od firmy',
    message: 'Firma Budimex S.A. dodała 5 nowych pracowników do szkolenia.',
    time: '08:10',
    status: 'read',
    type: 'training',
    tag: 'Szkolenia'
  }
];

const typeLabels: Record<NotificationType, string> = {
  system: 'Systemowe',
  users: 'Użytkownicy',
  sales: 'Sprzedaż',
  training: 'Szkolenia'
};

const typeStyles: Record<NotificationType, string> = {
  system: 'border-l-red-500 bg-red-50',
  users: 'border-l-blue-500 bg-blue-50',
  sales: 'border-l-green-500 bg-green-50',
  training: 'border-l-teal-500 bg-teal-50'
};

export const NotificationsCenter: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState<'all' | NotificationType>('all');
  const [statusFilter, setStatusFilter] = React.useState<'all' | NotificationStatus>('all');
  const selectClassName =
    'w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white appearance-none pr-10 text-sm';

  const filtered = mockNotifications.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 font-semibold">System / Powiadomienia</div>
          <h1 className="text-2xl font-bold text-slate-900">Centrum powiadomień</h1>
          <p className="text-sm text-slate-500 mt-1">Zarządzaj i przeglądaj historię zdarzeń w systemie.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-semibold px-3 py-2 rounded-lg hover:bg-slate-100">
            <Settings size={16} /> Ustawienia
          </button>
          <button className="flex items-center gap-2 bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 text-sm font-semibold">
            <CheckCircle size={16} /> Oznacz wszystkie jako przeczytane
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/60">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <label className="sr-only" htmlFor="typeFilter">Typ</label>
              <div className="relative">
                <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  id="typeFilter"
                  className={`${selectClassName} pl-8`}
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
                >
                  <option value="all">Typ: Wszystkie</option>
                  {Object.entries(typeLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</div>
              </div>
            </div>
            <div className="relative">
              <label className="sr-only" htmlFor="statusFilter">Status</label>
              <div className="relative">
                <select
                  id="statusFilter"
                  className={selectClassName}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                >
                  <option value="all">Status: Wszystkie</option>
                  <option value="unread">Nieprzeczytane</option>
                  <option value="read">Przeczytane</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</div>
              </div>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Szukaj powiadomienia..."
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
          <button className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1">
            <Trash2 size={14} /> Usuń wszystkie powiadomienia
          </button>
        </div>

        <div className="px-6 py-3 border-b border-slate-100 bg-white">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Dzisiaj</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="px-6 py-10 text-center text-slate-500 text-sm">Brak powiadomień dla wybranych filtrów.</div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className={`px-6 py-4 flex gap-4 group hover:bg-slate-50 transition-colors border-l-4 ${
                  typeStyles[item.type]
                } ${item.status === 'unread' ? 'font-semibold' : 'opacity-80'}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-sm text-slate-900">{item.title}</p>
                    <span className="text-xs text-slate-500 whitespace-nowrap">{item.time}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{item.message}</p>
                  <div className="mt-2 flex gap-2">
                    {item.tag && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700">
                        {item.tag}
                      </span>
                    )}
                    {item.status === 'unread' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-brand-accent/10 text-brand-accent">
                        Nowe
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
