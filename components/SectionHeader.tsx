import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<Props> = ({ title, subtitle }) => (
  <div className="mb-10">
    <div className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-2">
      {subtitle}
    </div>
    <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-brand-dark">
      {title}
    </h2>
  </div>
);

export default SectionHeader;
