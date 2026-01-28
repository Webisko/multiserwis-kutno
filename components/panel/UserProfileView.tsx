import React from 'react';
import { ArrowLeft, Edit, Mail, Building2 } from 'lucide-react';
import { ADMIN_STUDENTS } from '../../constants';
import type { Course, Student } from '../../types';

export interface UserOverrides {
  email?: string;
  name?: string;
  company?: string;
  phone?: string;
  address?: string;
  idNumber?: string;
  pesel?: string;
  avatarUrl?: string;
}

interface UserProfileViewProps {
  email: string;
  courses: Course[];
  overrides?: Record<string, UserOverrides>;
  onBack: () => void;
  onEdit: () => void;
  students?: Student[];
  entityLabel?: string;
}

const initials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] || 'U') + (parts[1]?.[0] || parts[0]?.[1] || '');
};

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  email,
  courses,
  overrides,
  onBack,
  onEdit,
  students = ADMIN_STUDENTS,
  entityLabel = 'użytkownika'
}) => {
  const enrollments = students.filter((s) => s.email === email);
  const base = enrollments[0];

  const override = overrides?.[email];
  const displayName = override?.name || base?.name || email;
  const displayEmail = override?.email || email;
  const displayCompany = override?.company || base?.company || 'Indywidualny';

  const coursesCount = enrollments.length;
  const averageProgress = coursesCount
    ? Math.round(enrollments.reduce((sum, s) => sum + s.progress, 0) / coursesCount)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profil {entityLabel}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 font-semibold"
          >
            <Edit size={16} /> Edytuj
          </button>
          <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <ArrowLeft size={16} /> Wróć
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-lg bg-slate-200 border border-slate-100 flex items-center justify-center font-bold text-slate-700">
            {initials(displayName).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="text-lg font-bold text-slate-900">{displayName}</div>
            <div className="text-sm text-slate-500 flex items-center gap-2 mt-1">
              <Mail size={14} /> {displayEmail}
            </div>
            <div className="text-sm text-slate-500 flex items-center gap-2 mt-1">
              <Building2 size={14} /> {displayCompany}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="text-xs font-semibold text-slate-500 uppercase">Szkolenia</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{coursesCount}</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="text-xs font-semibold text-slate-500 uppercase">Średni postęp</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{averageProgress}%</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="text-xs font-semibold text-slate-500 uppercase">Status</div>
            <div className="text-sm font-bold text-green-700 mt-2">Aktywny</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Szkolenia użytkownika</h2>
          <p className="text-sm text-slate-500 mt-1">Lista przypisanych szkoleń i postęp.</p>
        </div>
        <div className="p-6 space-y-3">
          {enrollments.length === 0 ? (
            <div className="text-sm text-slate-500">Brak przypisanych szkoleń.</div>
          ) : (
            enrollments.map((e) => {
              const course = courses.find((c) => c.id === e.course);
              return (
                <div key={e.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-slate-800">{course?.title || e.course}</div>
                    <div className="text-sm font-bold text-slate-700">{e.progress}%</div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div className="bg-brand-accent h-2 rounded-full" style={{ width: `${e.progress}%` }} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
