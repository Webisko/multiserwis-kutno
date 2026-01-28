import React from 'react';
import { Search, Plus, Eye, Edit, Trash2, Check, X } from 'lucide-react';
import { ADMIN_STUDENTS } from '../../constants';
import type { CompanyOverrides } from '../panel/CompanyView';

interface CompanySummary {
  key: string;
  name: string;
  enrollments: number;
  coursesCount: number;
  averageProgress: number;
  uniqueUsers: number;
  contactUserEmail: string;
  status: 'active' | 'expiring' | 'inactive';
  expiresInDays: number | null;
}

const buildCompanies = () => {
  const companyMap = new Map<
    string,
    {
      enrollments: number;
      totalProgress: number;
      users: Set<string>;
      courses: Set<string>;
      firstEmail: string;
      minActiveExpirationDays: number | null;
    }
  >();

  ADMIN_STUDENTS.forEach((student) => {
    const name = student.company || 'Indywidualny';
    const existing = companyMap.get(name);
    if (!existing) {
      companyMap.set(name, {
        enrollments: 1,
        totalProgress: student.progress,
        users: new Set([student.email]),
        courses: new Set([student.course]),
        firstEmail: student.email,
        minActiveExpirationDays: student.expirationDays > 0 ? student.expirationDays : null
      });
    } else {
      existing.enrollments += 1;
      existing.totalProgress += student.progress;
      existing.users.add(student.email);
      existing.courses.add(student.course);
      if (student.expirationDays > 0) {
        existing.minActiveExpirationDays =
          existing.minActiveExpirationDays === null
            ? student.expirationDays
            : Math.min(existing.minActiveExpirationDays, student.expirationDays);
      }
    }
  });

  return Array.from(companyMap.entries())
    .map(([name, data]) => {
      const status: CompanySummary['status'] =
        data.minActiveExpirationDays === null
          ? 'inactive'
          : data.minActiveExpirationDays <= 7
            ? 'expiring'
            : 'active';

      return {
      key: name,
      name,
      enrollments: data.enrollments,
      coursesCount: data.courses.size,
      averageProgress: Math.round(data.totalProgress / data.enrollments),
      uniqueUsers: data.users.size,
      contactUserEmail: data.firstEmail,
      status,
      expiresInDays: data.minActiveExpirationDays
    };
    })
    .sort((a, b) => b.enrollments - a.enrollments);
};

interface AdminCompaniesProps {
  onViewCompany?: (companyName: string) => void;
  onEditCompany?: (companyName: string) => void;
  onDeleteCompany?: (companyName: string) => void;
  onAddClick?: () => void;
  overrides?: Record<string, CompanyOverrides>;
  hiddenCompanies?: string[];
}

const initials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] || 'F') + (parts[1]?.[0] || parts[0]?.[1] || '');
};

export const AdminCompanies: React.FC<AdminCompaniesProps> = ({
  onViewCompany,
  onEditCompany,
  onDeleteCompany,
  onAddClick,
  overrides,
  hiddenCompanies = []
}) => {
  const [query, setQuery] = React.useState('');
  const [pendingDeleteCompany, setPendingDeleteCompany] = React.useState<string | null>(null);

  const companies = React.useMemo(() => {
    const base = buildCompanies().map((c) => {
      const override = overrides?.[c.key];
      return {
        ...c,
        contactUserEmail: override?.contactUserEmail || c.contactUserEmail,
        name: override?.name || c.name
      };
    });

    const extraCompanies: CompanySummary[] = [];
    if (overrides) {
      Object.keys(overrides).forEach((key) => {
        if (key === 'Indywidualny') return;
        if (base.some((c) => c.key === key)) return;
        const ov = overrides[key];
        extraCompanies.push({
          key,
          name: ov?.name || key,
          enrollments: 0,
          coursesCount: 0,
          averageProgress: 0,
          uniqueUsers: 0,
          contactUserEmail: ov?.contactUserEmail || '',
          status: 'inactive',
          expiresInDays: null
        });
      });
    }

    const merged = [...base, ...extraCompanies].sort((a, b) => b.enrollments - a.enrollments);

    const visible = hiddenCompanies.length
      ? merged.filter((c) => !hiddenCompanies.includes(c.key))
      : merged;

    const q = query.trim().toLowerCase();
    if (!q) return visible;
    return visible.filter((c) => {
      const hay = `${c.name} ${c.contactUserEmail}`.toLowerCase();
      return hay.includes(q);
    });
  }, [hiddenCompanies, overrides, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Firmy</h1>
          <p className="text-sm text-slate-500 mt-1">Zestawienie firm korzystających z platformy.</p>
        </div>
        <button
          className="flex items-center gap-2 bg-brand-accent text-white px-4 py-2 rounded-lg shadow hover:bg-brand-accentHover transition text-sm font-medium"
          onClick={() => onAddClick?.()}
          disabled={!onAddClick}
        >
          <Plus size={16} />
          Dodaj firmę
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:max-w-sm">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={16} />
            </span>
            <input
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent w-full"
              placeholder="Szukaj firmy..."
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="text-right whitespace-nowrap">
            <div className="text-2xl font-bold text-slate-900 leading-none">{companies.length}</div>
            <div className="text-xs font-semibold uppercase text-slate-500 mt-1">FIRM</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Firma</th>
                <th className="px-4 py-3 text-center">Użytkownicy</th>
                <th className="px-4 py-3 text-center">Szkolenia</th>
                <th className="px-4 py-3 text-center">Średni postęp</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.key} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onViewCompany?.(company.key)}
                        className="h-16 w-16 rounded-md bg-slate-200 border border-slate-100 flex items-center justify-center font-bold text-slate-700 cursor-pointer"
                        aria-label="Podgląd firmy"
                      >
                        {initials(company.name).toUpperCase()}
                      </button>
                      <div>
                        <button
                          onClick={() => onViewCompany?.(company.key)}
                          className="font-semibold text-slate-800 hover:text-brand-primary text-left"
                          title="Podgląd firmy"
                        >
                          {company.name}
                        </button>
                        <div className="text-xs text-slate-500">{company.contactUserEmail || '—'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-600 text-center">{company.uniqueUsers}</td>
                  <td className="px-4 py-4 text-slate-600 text-center">{company.coursesCount}</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-brand-accent h-2 rounded-full"
                          style={{ width: `${company.averageProgress}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">{company.averageProgress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        company.status === 'active'
                          ? 'bg-green-50 text-green-700'
                          : company.status === 'expiring'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                      }`}
                      title={
                        company.status === 'expiring' && company.expiresInDays !== null
                          ? `Wygaśnie za ${company.expiresInDays} dni`
                          : undefined
                      }
                    >
                      {company.status === 'active'
                        ? 'Aktywny'
                        : company.status === 'expiring'
                          ? 'Wkrótce wygaśnie'
                          : 'Nieaktywny'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end">
                      <div className="relative w-32 h-10 overflow-hidden">
                        <div
                          className={`absolute inset-0 flex items-center justify-end transition-all ease-in-out ${
                            pendingDeleteCompany === company.key && onDeleteCompany
                              ? 'translate-x-0 opacity-100 duration-300'
                              : 'translate-x-full opacity-0 duration-500'
                          }`}
                        >
                          <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-2 py-1 shadow-sm">
                            <div className="relative group">
                              <button
                                onClick={() => {
                                  onDeleteCompany(company.key);
                                  setPendingDeleteCompany(null);
                                }}
                                className="p-2 text-red-700 hover:bg-red-100 rounded-md transition"
                                aria-label="Potwierdź usunięcie"
                              >
                                <Check size={16} />
                              </button>
                              <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                                Potwierdź
                              </div>
                            </div>
                            <div className="relative group">
                              <button
                                onClick={() => setPendingDeleteCompany(null)}
                                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition"
                                aria-label="Anuluj usunięcie"
                              >
                                <X size={16} />
                              </button>
                              <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                                Anuluj
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`absolute inset-0 flex items-center justify-end gap-2 transition-all ease-in-out ${
                            pendingDeleteCompany === company.key && onDeleteCompany
                              ? 'translate-x-full opacity-0 duration-300'
                              : 'translate-x-0 opacity-100 duration-500'
                          }`}
                        >
                          <div className="relative group">
                            <button
                              onClick={() => onViewCompany?.(company.key)}
                              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                              aria-label="Podgląd"
                            >
                              <Eye size={16} />
                            </button>
                            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                              Podgląd
                            </div>
                          </div>
                          <div className="relative group">
                            <button
                              onClick={() => onEditCompany?.(company.key)}
                              className="p-2 text-brand-accent hover:text-brand-accentHover hover:bg-orange-50 rounded-lg transition"
                              aria-label="Edytuj"
                            >
                              <Edit size={16} />
                            </button>
                            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                              Edytuj
                            </div>
                          </div>
                          <div className="relative group">
                            <button
                              onClick={() => setPendingDeleteCompany(company.key)}
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                              aria-label="Usuń"
                            >
                              <Trash2 size={16} />
                            </button>
                            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                              Usuń
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
