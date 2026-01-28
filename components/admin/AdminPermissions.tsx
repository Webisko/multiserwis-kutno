import React from 'react';
import { ShieldCheck } from 'lucide-react';

const roles = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Pełny dostęp do zarządzania platformą.'
  },
  {
    id: 'manager',
    name: 'Menedżer',
    description: 'Dostęp do kursów, raportów i użytkowników.'
  },
  {
    id: 'guardian',
    name: 'Opiekun firmy',
    description: 'Zarządzanie pracownikami i raporty postępów.'
  }
];

export const AdminPermissions: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Uprawnienia</h1>
        <p className="text-sm text-slate-500 mt-1">Konfiguruj role i zakresy dostępu.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 space-y-4">
        {roles.map((role) => (
          <div key={role.id} className="flex items-start gap-4 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
            <span className="p-2 bg-slate-100 rounded-lg">
              <ShieldCheck size={18} className="text-brand-accent" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-800">{role.name}</p>
              <p className="text-xs text-slate-500">{role.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
