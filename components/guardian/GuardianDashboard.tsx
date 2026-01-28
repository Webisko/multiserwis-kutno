import React from 'react';
import { Building2, Users, GraduationCap } from 'lucide-react';

interface GuardianDashboardProps {
  companyName?: string;
  employeesCount?: number;
  trainingsCount?: number;
}

export const GuardianDashboard: React.FC<GuardianDashboardProps> = ({
  companyName = 'Twoja firma',
  employeesCount = 0,
  trainingsCount = 0
}) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Strefa opiekuna firmy</h1>
          <p className="text-sm text-slate-500 mt-1">Zarządzanie pracownikami i dostępem do szkoleń.</p>
        </div>
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-700 shadow-sm">
          <Building2 size={16} className="text-slate-500" />
          <span className="font-semibold">{companyName}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pracownicy</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{employeesCount}</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users size={18} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-500">Łączna liczba pracowników w systemie.</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Szkolenia</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{trainingsCount}</h3>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <GraduationCap size={18} className="text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-500">Katalog dostępnych szkoleń.</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Skróty</p>
              <h3 className="text-lg font-bold text-slate-900 mt-2">Najczęstsze akcje</h3>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg">
              <Building2 size={18} className="text-slate-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-500">Użyj menu po lewej, aby przejść do Szkolenia/Pracownicy.</div>
        </div>
      </div>
    </div>
  );
};
