import { ButtonLink } from '@/components/ui/Button';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

export function NotFoundPage() {
  useDocumentMeta('Page not found', 'The page you are looking for could not be found.');
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-5 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">Error 404</p>
      <h1 className="text-4xl font-bold text-navy-900 sm:text-5xl">This page could not be found</h1>
      <p className="max-w-md text-slate-600">The link may be out of date, or the page may have moved.</p>
      <ButtonLink to="/">Back to home</ButtonLink>
    </section>
  );
}
