import React from 'react';
import { Edit, Plus, Search, Eye } from 'lucide-react';
import { COURSES } from '../../constants';
import type { Course } from '../../types';

interface AdminCoursesProps {
  onEditCourse: (courseId: string) => void;
}

export const AdminCourses: React.FC<AdminCoursesProps> = ({ onEditCourse }) => {
  const courses = COURSES as Course[];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Katalog szkoleń</h1>
          <p className="text-sm text-slate-500 mt-1">Zarządzaj szkoleniami i modułami szkoleniowymi.</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-accent text-white px-4 py-2 rounded-lg shadow hover:bg-brand-accentHover transition text-sm font-medium">
          <Plus size={16} />
          Dodaj szkolenie
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
              placeholder="Szukaj szkoleń..."
              type="text"
            />
          </div>
          <div className="text-sm text-slate-500">Łącznie: {courses.length} szkoleń</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Szkolenie</th>
                <th className="px-4 py-3">Kategoria</th>
                <th className="px-4 py-3">Czas trwania</th>
                <th className="px-4 py-3">Cena</th>
                <th className="px-4 py-3 text-right">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="px-4 py-4">
                    <div className="font-semibold text-slate-800">{course.title}</div>
                    <div className="text-xs text-slate-500">{course.description || 'Brak opisu'}</div>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{course.category}</td>
                  <td className="px-4 py-4 text-slate-600">{course.duration}</td>
                  <td className="px-4 py-4 text-slate-700 font-semibold">{course.price}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition">
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onEditCourse(course.id)}
                        className="p-2 text-brand-accent hover:text-brand-accentHover hover:bg-orange-50 rounded-lg transition"
                      >
                        <Edit size={16} />
                      </button>
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
