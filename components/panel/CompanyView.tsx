import React from 'react';
import { ArrowLeft, Edit, Mail, Users, Phone, User } from 'lucide-react';
import { ADMIN_STUDENTS } from '../../constants';
import type { Course } from '../../types';
import type { UserOverrides } from './UserProfileView';

export interface CompanyOverrides {
  name?: string;
  contactUserEmail?: string;
  nip?: string;
  logoUrl?: string;
}

interface CompanyViewProps {
  companyName: string;
  courses: Course[];
  overrides?: Record<string, CompanyOverrides>;
  userOverrides?: Record<string, UserOverrides>;
  onBack: () => void;
  onEdit: () => void;
}

const initials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] || 'F') + (parts[1]?.[0] || parts[0]?.[1] || '');
};

export const CompanyView: React.FC<CompanyViewProps> = ({ companyName, courses, overrides, userOverrides, onBack, onEdit }) => {
  const enrollments = ADMIN_STUDENTS.filter((s) => (s.company || 'Indywidualny') === companyName);
  const uniqueUsers = Array.from(new Set(enrollments.map((e) => e.email)));
  const uniqueCourses = Array.from(new Set(enrollments.map((e) => e.course)));

  const averageProgress = enrollments.length
    ? Math.round(enrollments.reduce((sum, s) => sum + s.progress, 0) / enrollments.length)
    : 0;

  const fallbackContact = enrollments[0]?.email || '';
  const contactEmail = overrides?.[companyName]?.contactUserEmail || fallbackContact;
  const contactBase = ADMIN_STUDENTS.find((s) => s.email === contactEmail);
  const contactOverride = userOverrides?.[contactEmail];
  const contactName = contactOverride?.name || contactBase?.name || contactEmail || '—';
  const contactPhone = contactOverride?.phone || '—';
  const contactDisplayEmail = contactOverride?.email || contactEmail || '—';
  const companyLogo = overrides?.[companyName]?.logoUrl;
  const companyNip = overrides?.[companyName]?.nip;
  const companyDisplayName = overrides?.[companyName]?.name || companyName;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profil firmy</h1>
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
          {companyLogo ? (
            <img
              src={companyLogo}
              alt={companyDisplayName}
              className="h-12 w-12 rounded-lg object-cover border border-slate-100"
              loading="lazy"
            />
          ) : (
            <div className="h-12 w-12 rounded-lg bg-slate-200 border border-slate-100 flex items-center justify-center font-bold text-slate-700">
              {initials(companyDisplayName).toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <div className="text-lg font-bold text-slate-900">{companyDisplayName}</div>
            <div className="text-sm text-slate-500 flex items-center gap-2 mt-1">
              <User size={14} /> {contactName}
            </div>
            <div className="text-sm text-slate-500 flex items-center gap-2 mt-1">
              <Mail size={14} /> {contactDisplayEmail}
            </div>
            <div className="text-sm text-slate-500 flex items-center gap-2 mt-1">
              <Phone size={14} /> {contactPhone}
            </div>
            {companyNip && (
              <div className="text-sm text-slate-500 mt-1">NIP: {companyNip}</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="text-xs font-semibold text-slate-500 uppercase">Użytkownicy</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{uniqueUsers.length}</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="text-xs font-semibold text-slate-500 uppercase">Szkolenia</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{uniqueCourses.length}</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="text-xs font-semibold text-slate-500 uppercase">Średni postęp</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{averageProgress}%</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Wykupione szkolenia</h2>
          <p className="text-sm text-slate-500 mt-1">Lista szkoleń przypisanych do pracowników firmy.</p>
        </div>
        <div className="p-6 space-y-3">
          {uniqueCourses.length === 0 ? (
            <div className="text-sm text-slate-500">Brak szkoleń.</div>
          ) : (
            uniqueCourses.map((courseId) => {
              const course = courses.find((c) => c.id === courseId);
              return (
                <div key={courseId} className="border border-slate-200 rounded-lg p-4">
                  <div className="font-semibold text-slate-800">{course?.title || courseId}</div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Użytkownicy firmy</h2>
            <p className="text-sm text-slate-500 mt-1">Lista pracowników z przypisanymi szkoleniami.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
            <Users size={14} /> {uniqueUsers.length}
          </div>
        </div>
        <div className="p-6 space-y-2">
          {uniqueUsers.map((u) => (
            <div key={u} className="border border-slate-200 rounded-lg p-4 text-sm text-slate-700">
              {u}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
