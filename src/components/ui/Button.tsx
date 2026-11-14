import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'outline' | 'light' | 'ghost';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-red-600 text-white shadow-[0_8px_20px_-6px_rgba(215,25,45,0.55)] hover:bg-red-700 hover:-translate-y-0.5',
  outline: 'border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white',
  light: 'bg-white text-navy-900 shadow-card hover:shadow-lift hover:-translate-y-0.5',
  ghost: 'text-navy-900 hover:bg-navy-50',
};

export function buttonClasses(variant: Variant = 'primary', extra = '') {
  return [
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold',
    'transition duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-60',
    VARIANT_CLASSES[variant],
    extra,
  ].join(' ');
}

type ButtonLinkProps = {
  to: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ to, variant = 'primary', className = '', children }: ButtonLinkProps) {
  return (
    <Link to={to} className={buttonClasses(variant, className)}>
      {children}
    </Link>
  );
}

type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant };

export function SubmitButton({ variant = 'primary', className = '', children, ...rest }: SubmitButtonProps) {
  return (
    <button type="submit" className={buttonClasses(variant, className)} {...rest}>
      {children}
    </button>
  );
}
