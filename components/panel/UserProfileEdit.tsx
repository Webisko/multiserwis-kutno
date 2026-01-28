import React from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { ADMIN_STUDENTS } from '../../constants';
import type { UserOverrides } from './UserProfileView';

interface UserProfileEditProps {
  email: string;
  overrides?: Record<string, UserOverrides>;
  onSaveOverrides: (email: string, overrides: UserOverrides) => void;
  onBack: () => void;
}

export const UserProfileEdit: React.FC<UserProfileEditProps> = ({ email, overrides, onSaveOverrides, onBack }) => {
  const base = ADMIN_STUDENTS.find((s) => s.email === email);
  const existing = overrides?.[email];

  const [name, setName] = React.useState(existing?.name || base?.name || '');
  const [company, setCompany] = React.useState(existing?.company || base?.company || '');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 font-semibold">Użytkownicy / Edycja</div>
          <h1 className="text-2xl font-bold text-slate-900">Edycja użytkownika</h1>
        </div>
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
          <ArrowLeft size={16} /> Wróć
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">E-mail</label>
          <input className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50" value={email} readOnly />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Imię i nazwisko</label>
            <input
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Firma</label>
            <input
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              onSaveOverrides(email, { name, company });
              onBack();
            }}
            className="flex items-center gap-2 bg-brand-accent text-white px-4 py-2 rounded-lg shadow hover:bg-brand-accentHover transition font-semibold"
          >
            <Save size={16} /> Zapisz zmiany
          </button>
        </div>
      </div>
    </div>
  );
};
