import { useMemo, useState } from 'react';
import { ExternalLink, FileText, Search } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { PlaceholderNotice } from '@/components/ui/PlaceholderNotice';
import { inputClass } from '@/components/ui/FormField';
import { CERTIFICATE_CATEGORIES, CERTIFICATES, type CertificateCategory } from '@/data/certificates';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

type Filter = CertificateCategory | 'All';

export function CertificatesPage() {
  useDocumentMeta('Our Certificates', 'Licences, registrations and test documents held by SBF Rapid.');
  const [filter, setFilter] = useState<Filter>('All');
  const [search, setSearch] = useState('');

  const visible = useMemo(
    () =>
      CERTIFICATES.filter(
        (item) =>
          (filter === 'All' || item.category === filter) &&
          item.title.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [filter, search],
  );

  return (
    <>
      <PageHero
        eyebrow="Our certificates"
        title={<>Compliance you can <span className="text-red-500">verify</span></>}
        description="Licences, registrations and approvals, grouped by category. Each document is published only once SBF has supplied the original."
        breadcrumb="Our Certificates"
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {(['All', ...CERTIFICATE_CATEGORIES] as Filter[]).map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={filter === category}
                  onClick={() => setFilter(category)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    filter === category ? 'bg-navy-900 text-white' : 'bg-sky-100 text-navy-900 hover:bg-navy-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-72">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <label htmlFor="certificate-search" className="sr-only">Search certificates</label>
              <input
                id="certificate-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search certificates"
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>

          {visible.length === 0 ? (
            <p className="mt-12 text-center text-slate-600">No certificates match your search.</p>
          ) : (
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((item) => (
                <li key={item.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lift">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-navy-900">
                    <FileText className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-red-600">{item.category}</p>
                  <h2 className="mt-2 text-base font-bold text-navy-900">{item.title}</h2>
                  <div className="mt-auto pt-6">
                    {item.documentUrl ? (
                      <a
                        href={item.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-red-600"
                      >
                        View document <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : (
                      <p className="text-sm text-slate-500">Original document awaiting publication approval</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12">
            <PlaceholderNotice title="Certificate documents">
              Scans, issue dates and validity periods will be added only from the original documents supplied by SBF.
            </PlaceholderNotice>
          </div>
        </div>
      </section>
    </>
  );
}
