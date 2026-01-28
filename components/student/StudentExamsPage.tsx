import React from 'react';
import { ClipboardCheck, CheckCircle2, XCircle, CalendarDays, FileText, ArrowLeft, ListChecks } from 'lucide-react';
import type { StudentUser } from '../../types';

interface StudentExamsPageProps {
  studentUser: StudentUser;
}

const formatDateTime = (value: string) => {
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleString('pl-PL');
  } catch {
    return value;
  }
};

export const StudentExamsPage: React.FC<StudentExamsPageProps> = ({ studentUser }) => {
  const history = studentUser.examHistory || [];
  const [selectedExamId, setSelectedExamId] = React.useState<string | null>(null);

  const selectedExam = React.useMemo(() => {
    return selectedExamId ? history.find((h) => h.id === selectedExamId) || null : null;
  }, [history, selectedExamId]);

  if (selectedExam) {
    const scorePercent = selectedExam.maxScore
      ? Math.round((selectedExam.score / selectedExam.maxScore) * 100)
      : 0;
    const correctCount = selectedExam.questionsAnswered?.filter((q) => q.isCorrect).length || 0;
    const totalCount = selectedExam.questionsAnswered?.length || 0;

    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Szczegóły egzaminu</h1>
            <p className="text-sm text-slate-500 mt-1">Podsumowanie podejścia i odpowiedzi.</p>
          </div>
          <button
            onClick={() => setSelectedExamId(null)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition"
          >
            <ArrowLeft size={16} /> Wróć
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Szkolenie</div>
              <div className="mt-1 text-lg font-bold text-slate-900">{selectedExam.courseName}</div>
              {selectedExam.moduleName && <div className="text-sm text-slate-600 mt-1">Moduł: {selectedExam.moduleName}</div>}
              <div className="text-sm text-slate-600 mt-2 inline-flex items-center gap-2">
                <CalendarDays size={14} className="text-slate-400" /> {formatDateTime(selectedExam.date)}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${
                  selectedExam.passed
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}
              >
                {selectedExam.passed ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                {selectedExam.passed ? 'Zaliczony' : 'Niezaliczony'}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border bg-sky-50 text-sky-700 border-sky-200">
                Wynik: {selectedExam.score}/{selectedExam.maxScore} ({scorePercent}%)
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border bg-slate-50 text-slate-700 border-slate-200">
                <ListChecks size={14} /> {correctCount}/{totalCount} poprawnych
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardCheck size={18} className="text-brand-primary" />
              <span className="font-bold text-slate-900">Odpowiedzi</span>
            </div>
            <div className="text-sm text-slate-500">{totalCount} pytań</div>
          </div>
          <div className="divide-y divide-slate-100">
            {(selectedExam.questionsAnswered || []).map((qa, idx) => (
              <div key={`${qa.questionId}_${idx}`} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pytanie {idx + 1}</div>
                    <div className="mt-1 font-semibold text-slate-900">{qa.question}</div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${
                      qa.isCorrect
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}
                  >
                    {qa.isCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                    {qa.isCorrect ? 'Poprawnie' : 'Błędnie'}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Twoja odpowiedź</div>
                    <div className="mt-1 text-slate-800">
                      {Array.isArray(qa.selectedAnswer) ? qa.selectedAnswer.join(', ') : String(qa.selectedAnswer)}
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Poprawna odpowiedź</div>
                    <div className="mt-1 text-slate-800">
                      {Array.isArray(qa.correctAnswer) ? qa.correctAnswer.join(', ') : String(qa.correctAnswer)}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {(selectedExam.questionsAnswered || []).length === 0 && (
              <div className="p-6 text-slate-600">Brak zapisanych odpowiedzi dla tego egzaminu.</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Egzaminy</h1>
        <p className="text-sm text-slate-500 mt-1">Historia podejść i wyniki.</p>
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-slate-600">
          Brak historii egzaminów.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardCheck size={18} className="text-brand-primary" />
              <span className="font-bold text-slate-900">Historia egzaminów</span>
            </div>
            <div className="text-sm text-slate-500">{history.length} wpisów</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3">Szkolenie</th>
                  <th className="px-4 py-3">Typ</th>
                  <th className="px-4 py-3">Wynik</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3 text-right">Szczegóły</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => {
                  const scorePercent = item.maxScore ? Math.round((item.score / item.maxScore) * 100) : 0;
                  return (
                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{item.courseName}</div>
                        <div className="text-xs text-slate-500">{item.moduleName || ''}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{item.examType === 'final' ? 'Końcowy' : 'Moduł'}</td>
                      <td className="px-4 py-3 text-slate-700">{scorePercent}%</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${
                            item.passed
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-red-50 text-red-700 border-red-200'
                          }`}
                        >
                          {item.passed ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                          {item.passed ? 'Zaliczony' : 'Niezaliczony'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays size={14} className="text-slate-400" /> {formatDateTime(item.date)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setSelectedExamId(item.id)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition"
                        >
                          <FileText size={16} /> Szczegóły
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
