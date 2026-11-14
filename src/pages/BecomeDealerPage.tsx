import { PageHero } from '@/components/ui/PageHero';
import { DealerForm } from '@/components/forms/DealerForm';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

export function BecomeDealerPage() {
  useDocumentMeta('Become a Dealer', 'Apply to become an authorised SBF Rapid dealer.');

  return (
    <>
      <PageHero
        eyebrow="Become a dealer"
        title={<>Grow with <span className="text-red-500">SBF Rapid</span></>}
        description="Tell us about your business and monthly requirement. Our dealer team will review your application and get in touch."
        breadcrumb="Become a Dealer"
      />
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lift sm:p-10">
            <DealerForm />
          </div>
        </div>
      </section>
    </>
  );
}
