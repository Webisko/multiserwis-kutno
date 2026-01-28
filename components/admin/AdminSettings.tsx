import React from 'react';
import { Save } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Ustawienia</h1>
        <p className="text-sm text-slate-500 mt-1">Konfiguracja platformy i powiadomień.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-2">Dane organizacji</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nazwa</label>
              <input
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                defaultValue="Multiserwis Profesjonalne Szkolenia"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email kontaktowy</label>
              <input
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                defaultValue="biuro@multiserwis.pl"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-2">Powiadomienia</h2>
          <div className="space-y-3">
            {[
              { id: 'email', label: 'Powiadomienia email dla kursantów' },
              { id: 'sms', label: 'Powiadomienia SMS dla firm' },
              { id: 'reports', label: 'Automatyczne raporty tygodniowe' }
            ].map((item) => (
              <label key={item.id} className="flex items-center gap-3 text-sm text-slate-700">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-brand-accent" />
                {item.label}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 bg-brand-accent text-white px-4 py-2 rounded-lg shadow hover:bg-brand-accentHover transition">
            <Save size={16} />
            Zapisz ustawienia
          </button>
        </div>
      </div>
    </div>
  );
};
