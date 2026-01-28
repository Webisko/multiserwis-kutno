import React from 'react';

export const PanelFooter: React.FC = () => {
  return (
    <div className="mt-10 pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between gap-4">
      <span>© {new Date().getFullYear()} Multiserwis Profesjonalne Szkolenia. Wszelkie prawa zastrzeżone.</span>
      <span>
        Realizacja:{' '}
        <a
          href="https://webisko.pl/"
          target="_blank"
          rel="noreferrer"
          className="text-slate-600 hover:text-brand-primary transition font-semibold"
        >
          Webisko.pl
        </a>
      </span>
    </div>
  );
};
