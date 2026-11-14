import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  breadcrumb: string;
  image?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, breadcrumb, image, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      {image ? (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="hero-zoom absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/90 to-navy-900/60" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-700" />
      )}
      <div className="steel-rule absolute inset-x-0 bottom-0 h-1 opacity-60" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-navy-100">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-navy-300">
              /
            </li>
            <li className="font-semibold text-white" aria-current="page">
              {breadcrumb}
            </li>
          </ol>
        </nav>
        <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-red-500">
          <span className="h-px w-8 bg-red-500" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-[1.5] text-navy-100 sm:text-lg">{description}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
