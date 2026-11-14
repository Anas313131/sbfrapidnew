import { Download } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PlaceholderNotice } from '@/components/ui/PlaceholderNotice';
import { MILESTONES, VALUES } from '@/data/company';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

type Leader = { name: string; photo?: string };

const LEADERS: Leader[] = [
  { name: 'Sanjeev Kumar' },
  { name: 'Vineet Gupta' },
  { name: 'Ashu Gupta' },
  { name: 'Lalit Bansal' },
];
const BROCHURE_URL = 'https://sbfrapid.com/wp-content/uploads/2022/07/corporate-brochure.pdf';

export function AboutPage() {
  useDocumentMeta('About Us', 'Learn about SBF Rapid, a steel manufacturer in Bhiwadi, Rajasthan, since 1991.');

  return (
    <>
      <PageHero
        eyebrow="About SBF Rapid"
        title={<>Built on Trust. <span className="text-red-500">Driven by Quality.</span></>}
        description="A steel business built on consistent quality, honest dealings and steady growth from Bhiwadi, Rajasthan."
        breadcrumb="About Us"
        image="https://images.pexels.com/photos/37574797/pexels-photo-37574797.jpeg?auto=compress&cs=tinysrgb&w=2000"
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Our story" title="From 1991 to today" />
          <ol className="relative mt-14 space-y-10 border-l-2 border-slate-200 pl-8">
            {MILESTONES.map((item, index) => (
              <Reveal key={item.title} delay={index * 100}>
                <li className="relative list-none">
                  <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-white bg-red-600 shadow" aria-hidden="true" />
                  <p className="text-sm font-semibold uppercase tracking-wider text-red-600">{item.year}</p>
                  <h3 className="mt-1 text-xl font-bold text-navy-900">{item.title}</h3>
                  <p className="mt-2 max-w-2xl text-slate-600">{item.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="mt-10">
            <PlaceholderNotice title="Capacity figures">
              Plant capacity wording (group capacity versus rolling-mill capacity) must be confirmed by SBF before publication.
            </PlaceholderNotice>
          </div>
        </div>
      </section>

      <section className="bg-sky-100 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal className="rounded-3xl bg-white p-10 shadow-card">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-red-600">Vision</h3>
              <p className="mt-4 text-lg text-navy-900">
                To grow sustainably, with quality, technology and social and environmental responsibility, while contributing to India&apos;s economic growth.
              </p>
            </Reveal>
            <Reveal delay={120} className="rounded-3xl bg-navy-900 p-10 text-white shadow-card">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-red-400">Mission</h3>
              <p className="mt-4 text-lg">
                To manufacture dependable steel products and support every dealer and customer with honest, responsive service.
              </p>
            </Reveal>
          </div>
          <p className="mt-6 text-xs text-slate-500">Vision and mission wording is a working draft and requires SBF approval.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Our values" title="What guides us" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {VALUES.map((value, index) => (
              <Reveal key={value.title} delay={index * 100}>
                <article className="h-full rounded-2xl border border-slate-200 p-8 transition hover:-translate-y-1 hover:shadow-lift">
                  <h3 className="text-lg font-bold text-navy-900">{value.title}</h3>
                  <p className="mt-3 text-sm leading-[1.5] text-slate-600">{value.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Leadership" title={<span className="text-white">Our directors</span>} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERS.map(({ name, photo }) => (
              <article key={name} className="rounded-2xl border border-navy-800 bg-navy-900 p-6">
                {photo ? (
                  <img src={photo} alt={name} loading="lazy" className="h-20 w-20 rounded-full object-cover" />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-navy-700 text-2xl font-bold text-white">
                    {name.split(' ').map((part) => part[0]).join('')}
                  </div>
                )}
                <h3 className="mt-5 text-lg font-bold">{name}</h3>
                <p className="mt-1 text-sm text-navy-300">Title and biography to be confirmed</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-slate-200 p-10 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-navy-900">Corporate brochure</h2>
              <p className="mt-2 text-slate-600">Download our company overview as a PDF.</p>
            </div>
            <a
              href={BROCHURE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-800"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download brochure
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
