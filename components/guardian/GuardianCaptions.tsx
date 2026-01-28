import React from 'react';

export const GuardianCaptions: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
      <h1 className="text-2xl font-bold text-slate-900">Napisy</h1>
      <p className="text-sm text-slate-500 mt-1">
        Panel zarządzania napisami/treściami pomocniczymi (widok roboczy).
      </p>
      <div className="mt-6 text-sm text-slate-600">
        Ten ekran zostawiam jako placeholder — podepnę konkretne funkcje, gdy ustalimy zakres (np. tłumaczenia UI, napisy do wideo, teksty lekcji).
      </div>
    </div>
  );
};
