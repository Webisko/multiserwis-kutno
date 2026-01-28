import React from 'react';
import {
  Users,
  GraduationCap,
  Building2,
  TrendingUp,
  ArrowUpRight,
  FileText,
  Settings
} from 'lucide-react';
import { ADMIN_STUDENTS, POPULARITY_DATA } from '../../constants';
import type { Course } from '../../types';
import type { ManagerSectionId } from './ManagerPanelLayout';

interface ManagerDashboardProps {
  courses: Course[];
  onNavigate: (section: ManagerSectionId) => void;
}

const parsePrice = (price: string) => {
  const cleaned = price.replace(/[^0-9]/g, '');
  return cleaned ? Number(cleaned) : 0;
};

const formatCurrency = (value: number) =>
  value.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 });

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ courses, onNavigate }) => {
  const uniqueUsers = new Set(ADMIN_STUDENTS.map((student) => student.email)).size;

  const companyCounts = ADMIN_STUDENTS.reduce<Record<string, number>>((acc, student) => {
    const key = student.company || 'Indywidualny';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const totalCompanies = Object.keys(companyCounts).length;

  const priceMap = courses.reduce<Record<string, number>>((acc, course) => {
    acc[course.id] = parsePrice(course.price);
    return acc;
  }, {});

  const totalRevenue = ADMIN_STUDENTS.reduce((sum, student) => sum + (priceMap[student.course] || 0), 0);

  const topCompanies = Object.entries(companyCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  const activeEnrollments = ADMIN_STUDENTS.filter((student) => student.status === 'active').length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Panel menedżera</h1>
          <p className="text-sm text-slate-500 mt-1">
            Nadzór nad szkoleniami, użytkownikami i raportami.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 transition text-sm font-medium">
            <FileText size={16} />
            Eksportuj raport
          </button>
          <button
            className="flex items-center gap-2 bg-brand-accent text-white px-4 py-2 rounded-lg shadow hover:bg-brand-accentHover transition text-sm font-medium"
            onClick={() => onNavigate('courses')}
          >
            <ArrowUpRight size={16} />
            Dodaj szkolenie
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-500 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Użytkownicy</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{uniqueUsers}</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users size={18} className="text-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-slate-500 font-medium">Aktywne zapisy: {activeEnrollments}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Szkolenia</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{courses.length}</h3>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <GraduationCap size={18} className="text-green-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-slate-500 font-medium">Katalog aktualny</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-500 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Firmy</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{totalCompanies}</h3>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <Building2 size={18} className="text-purple-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-slate-500 font-medium">Najwięcej zapisów: {topCompanies[0]?.name || '-'}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-brand-accent hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Przychód</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{formatCurrency(totalRevenue)}</h3>
            </div>
            <div className="p-2 bg-orange-50 rounded-lg">
              <TrendingUp size={18} className="text-brand-accent" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-slate-500 font-medium">Podgląd na podstawie zapisów</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Popularność kursów</h2>
            <span className="text-xs text-slate-500">Zestawienie wg kategorii</span>
          </div>
          <div className="relative h-64 w-full flex items-end justify-between px-2 pt-10 pb-4">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-4 pt-10">
              <div className="w-full border-t border-slate-100 border-dashed"></div>
              <div className="w-full border-t border-slate-100 border-dashed"></div>
              <div className="w-full border-t border-slate-100 border-dashed"></div>
              <div className="w-full border-t border-slate-100 border-dashed"></div>
              <div className="w-full border-b border-slate-200"></div>
            </div>
            {POPULARITY_DATA.map((item) => (
              <div key={item.name} className="relative flex flex-col items-center group w-1/6">
                <div className="w-full mx-2 bg-brand-primary/20 h-40 rounded-t-sm group-hover:bg-brand-primary/30 transition-all relative">
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-t-sm transition-all"
                    style={{ height: `${item.value * 1.8}px`, backgroundColor: item.color }}
                  ></div>
                </div>
                <span className="text-xs text-slate-500 mt-2">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Najaktywniejsze firmy</h2>
            <button
              className="text-xs text-brand-accent hover:text-brand-accentHover font-medium"
              onClick={() => onNavigate('companies')}
            >
              Zobacz wszystkie
            </button>
          </div>
          <ul className="space-y-4">
            {topCompanies.map((company) => (
              <li key={company.name} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">{company.name}</p>
                  <p className="text-xs text-slate-500">{company.count} zapisów</p>
                </div>
                <span className="text-sm font-semibold text-slate-700">#{company.count}</span>
              </li>
            ))}

            {topCompanies.length === 0 && (
              <li className="text-sm text-slate-500">Brak danych do wyświetlenia.</li>
            )}
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4">Zarządzanie systemem</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('users')}
            className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200 hover:border-brand-accent group transition shadow-sm"
          >
            <span className="p-2 bg-slate-100 rounded-lg group-hover:bg-orange-50 transition">
              <Users size={16} className="text-slate-600 group-hover:text-brand-accent" />
            </span>
            <span className="font-medium text-sm text-slate-700">Zarządzaj użytkownikami</span>
          </button>
          <button
            onClick={() => onNavigate('courses')}
            className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200 hover:border-brand-accent group transition shadow-sm"
          >
            <span className="p-2 bg-slate-100 rounded-lg group-hover:bg-orange-50 transition">
              <GraduationCap size={16} className="text-slate-600 group-hover:text-brand-accent" />
            </span>
            <span className="font-medium text-sm text-slate-700">Zarządzaj szkoleniami</span>
          </button>
          <button
            onClick={() => onNavigate('companies')}
            className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200 hover:border-brand-accent group transition shadow-sm"
          >
            <span className="p-2 bg-slate-100 rounded-lg group-hover:bg-orange-50 transition">
              <Building2 size={16} className="text-slate-600 group-hover:text-brand-accent" />
            </span>
            <span className="font-medium text-sm text-slate-700">Zarządzaj firmami</span>
          </button>
          <button
            onClick={() => onNavigate('settings')}
            className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200 hover:border-brand-accent group transition shadow-sm"
          >
            <span className="p-2 bg-slate-100 rounded-lg group-hover:bg-orange-50 transition">
              <Settings size={16} className="text-slate-600 group-hover:text-brand-accent" />
            </span>
            <span className="font-medium text-sm text-slate-700">Ustawienia systemu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
