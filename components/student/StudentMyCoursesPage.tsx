import React from 'react';
import { GraduationCap, PlayCircle, CheckCircle2, Clock, Eye } from 'lucide-react';
import type { Course, UserCourse } from '../../types';

interface StudentMyCoursesPageProps {
  courses: Course[];
  myCourses: UserCourse[];
  onPreviewCourse: (courseId: string) => void;
  onContinueCourse?: (courseId: string) => void;
}

const statusBadge = (status: UserCourse['status']) => {
  if (status === 'completed') {
    return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
  }
  if (status === 'pending') {
    return 'bg-amber-50 text-amber-700 border border-amber-200';
  }
  return 'bg-sky-50 text-sky-700 border border-sky-200';
};

const statusLabel = (status: UserCourse['status']) => {
  if (status === 'completed') return 'Ukończone';
  if (status === 'pending') return 'Oczekuje';
  return 'W toku';
};

export const StudentMyCoursesPage: React.FC<StudentMyCoursesPageProps> = ({
  courses,
  myCourses,
  onPreviewCourse,
  onContinueCourse
}) => {
  const enriched = React.useMemo(() => {
    return myCourses
      .map((mc) => ({
        enrollment: mc,
        course: courses.find((c) => c.id === mc.courseId) || null
      }))
      .filter((row) => row.course);
  }, [courses, myCourses]);

  const active = enriched.filter((row) => row.enrollment.status === 'active');
  const pending = enriched.filter((row) => row.enrollment.status === 'pending');
  const completed = enriched.filter((row) => row.enrollment.status === 'completed');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Moje kursy</h1>
        <p className="text-sm text-slate-500 mt-1">Twoje przypisane szkolenia, postęp i status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <div className="flex items-center gap-2 text-slate-600 text-sm font-semibold">
            <PlayCircle size={18} className="text-brand-primary" /> W toku
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{active.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <div className="flex items-center gap-2 text-slate-600 text-sm font-semibold">
            <Clock size={18} className="text-brand-primary" /> Oczekuje
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{pending.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <div className="flex items-center gap-2 text-slate-600 text-sm font-semibold">
            <CheckCircle2 size={18} className="text-brand-primary" /> Ukończone
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{completed.length}</div>
        </div>
      </div>

      {enriched.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-slate-600">
          Brak przypisanych kursów.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {enriched.map(({ enrollment, course }) => {
            if (!course) return null;
            const progress = Math.max(0, Math.min(100, enrollment.progress || 0));
            return (
              <div key={enrollment.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {course.category}
                      </div>
                      <div className="mt-1 text-lg font-bold text-slate-900">{course.title}</div>
                      <div className="mt-2 text-sm text-slate-600 flex items-center gap-2">
                        <GraduationCap size={16} className="text-slate-400" />
                        Następna lekcja: <span className="font-semibold">{enrollment.nextLesson}</span>
                      </div>
                    </div>
                    <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold ${statusBadge(enrollment.status)}`}>
                      {statusLabel(enrollment.status)}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>Postęp</span>
                      <span className="text-brand-accent">{progress}%</span>
                    </div>
                    <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-brand-accent h-2 rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <div className="mt-5 flex justify-end">
                    <div className="flex flex-wrap gap-2">
                      {onContinueCourse && enrollment.status !== 'pending' && (
                        <button
                          onClick={() => onContinueCourse(course.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-accent text-white font-semibold hover:bg-brand-accentHover transition"
                        >
                          <PlayCircle size={16} /> Kontynuuj
                        </button>
                      )}
                      <button
                        onClick={() => onPreviewCourse(course.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary text-white font-semibold hover:bg-brand-primary/90 transition"
                      >
                        <Eye size={16} /> Podgląd
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
