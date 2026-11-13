import type { ReactNode } from 'react';

export function PageIntro({ label, title, children }: { label?: ReactNode; title: string; children?: ReactNode }) {
  return <header className="page-intro">
    {label && <div className="eyebrow">{label}</div>}
    <h1>{title}</h1>
    {children && <p className="lead">{children}</p>}
  </header>;
}
