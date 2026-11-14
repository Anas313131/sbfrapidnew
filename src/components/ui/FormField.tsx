import type { ReactNode } from 'react';

export const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-slate-400 transition focus:border-navy-600 focus:outline-none focus:ring-4 focus:ring-navy-100 aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-red-100 disabled:bg-slate-100';

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export function Field({ id, label, required = false, error, hint, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-navy-900">
        {label}
        {required ? (
          <span className="ml-1 text-red-600" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-slate-500">(optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
