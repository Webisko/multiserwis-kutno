import React from 'react';

interface PanelBreadcrumbsProps {
  segments: string[];
}

export const PanelBreadcrumbs: React.FC<PanelBreadcrumbsProps> = ({ segments }) => {
  if (!segments || segments.length === 0) return null;

  return (
    <div className="text-xs text-slate-500 font-semibold">
      {segments.map((seg, idx) => (
        <React.Fragment key={`${seg}-${idx}`}>
          {idx > 0 && <span className="mx-1">/</span>}
          <span>{seg}</span>
        </React.Fragment>
      ))}
    </div>
  );
};
