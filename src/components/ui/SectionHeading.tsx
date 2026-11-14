import type { ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start';
  return (
    <div className={`flex max-w-3xl flex-col ${alignment}`}>
      <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
        <span className="h-px w-8 bg-red-600" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-bold text-navy-900 sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base text-slate-600 sm:text-lg">{description}</p>}
    </div>
  );
}
