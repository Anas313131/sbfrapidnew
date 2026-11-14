import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PlaceholderNotice } from '@/components/ui/PlaceholderNotice';
import { PROCESS_STEPS, QUALITY_TESTS } from '@/data/manufacturing';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

export function ManufacturingPage() {
  useDocumentMeta('Manufacturing Processes', 'How SBF Rapid turns raw material into TMT bars, from melting and casting to rolling, testing and dispatch.');

  return (
    <>
      <PageHero
        eyebrow="Manufacturing processes"
        title={<>From raw material to <span className="text-red-500">reliable reinforcement</span></>}
        description="Every stage of production, from the induction furnace to the cooling bed and in-house testing, is part of a documented quality flow."
        breadcrumb="Manufacturing Processes"
      />

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
          <ol className="relative space-y-8">
            <span className="absolute bottom-4 left-5 top-4 w-px bg-slate-200" aria-hidden="true" />
            {PROCESS_STEPS.map((step, index) => (
              <Reveal key={step.title} delay={index * 40}>
                <li className="relative list-none pl-16">
                  <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-navy-900 text-sm font-bold text-white shadow-card">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift">
                    <h3 className="text-lg font-bold text-navy-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-[1.5] text-slate-600">{step.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-navy-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Quality testing" title={<span className="text-white">Tested before it leaves the plant</span>} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {QUALITY_TESTS.map((test) => (
              <div key={test.title} className="rounded-2xl border border-navy-800 bg-navy-900 p-6">
                <h3 className="font-bold">{test.title}</h3>
                <p className="mt-3 text-sm leading-[1.5] text-navy-200">{test.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <PlaceholderNotice title="Test frequency and IQMS system">
              Frequency of each test and the name of the quality management software must be confirmed by SBF.
            </PlaceholderNotice>
          </div>
        </div>
      </section>
    </>
  );
}
