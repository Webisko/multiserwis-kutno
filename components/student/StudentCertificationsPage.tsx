import React from 'react';
import { BadgeCheck, AlertTriangle, Download, CalendarClock } from 'lucide-react';
import type { StudentUser } from '../../types';

interface StudentCertificationsPageProps {
  studentUser: StudentUser;
}

const formatDate = (value: string) => {
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString('pl-PL');
  } catch {
    return value;
  }
};

const statusPill = (status: string) => {
  if (status === 'active') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (status === 'expiring-soon') return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-red-50 text-red-700 border-red-200';
};

const statusLabel = (status: string) => {
  if (status === 'active') return 'Aktywne';
  if (status === 'expiring-soon') return 'Wygasa wkrótce';
  return 'Wygasło';
};

export const StudentCertificationsPage: React.FC<StudentCertificationsPageProps> = ({ studentUser }) => {
  const certifications = studentUser.certifications || [];

  const expiringSoon = React.useMemo(() => {
    const now = new Date();
    return certifications.filter((cert) => {
      const expirationDate = new Date(cert.expirationDate);
      const daysUntilExpiration = Math.ceil((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiration <= 180 && daysUntilExpiration > 0;
    });
  }, [certifications]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Uprawnienia</h1>
        <p className="text-sm text-slate-500 mt-1">Lista Twoich certyfikatów i terminów ważności.</p>
      </div>

      {expiringSoon.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-700 mt-0.5" />
            <div>
              <div className="font-bold text-amber-900">Przypomnienie</div>
              <div className="text-sm text-amber-800 mt-1">
                Masz {expiringSoon.length} uprawnienia wygasające w ciągu 6 miesięcy.
              </div>
            </div>
          </div>
        </div>
      )}

      {certifications.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-slate-600">
          Brak certyfikatów do wyświetlenia.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BadgeCheck size={18} className="text-brand-primary" />
              <span className="font-bold text-slate-900">Twoje certyfikaty</span>
            </div>
            <div className="text-sm text-slate-500">{certifications.length} pozycji</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3">Uprawnienie</th>
                  <th className="px-4 py-3">Wydane</th>
                  <th className="px-4 py-3">Wygasa</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Akcje</th>
                </tr>
              </thead>
              <tbody>
                {certifications.map((cert) => (
                  <tr key={cert.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">{cert.name}</div>
                      <div className="text-xs text-slate-500">{cert.courseName}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{formatDate(cert.issueDate)}</td>
                    <td className="px-4 py-3 text-slate-700">
                      <span className="inline-flex items-center gap-2">
                        <CalendarClock size={14} className="text-slate-400" />
                        {formatDate(cert.expirationDate)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${statusPill(cert.status)}`}>
                        {statusLabel(cert.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {cert.certificateUrl ? (
                        <a
                          href={cert.certificateUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-accent text-white font-semibold hover:bg-brand-accentHover transition"
                        >
                          <Download size={16} /> Pobierz
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400">Brak pliku</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
