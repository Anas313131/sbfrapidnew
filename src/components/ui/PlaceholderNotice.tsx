import type { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

type PlaceholderNoticeProps = {
  title: string;
  children?: ReactNode;
};

export function PlaceholderNotice({ title, children }: PlaceholderNoticeProps) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-navy-200 bg-sky-100 p-6 sm:flex-row sm:items-center">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-red-600 shadow-card">
        <AlertTriangle className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <p className="font-semibold text-navy-900">{title}</p>
        <p className="mt-1 text-sm text-slate-600">
          Placeholder – replace with approved SBF content.
          {children ? ` ${children}` : ''}
        </p>
      </div>
    </div>
  );
}
