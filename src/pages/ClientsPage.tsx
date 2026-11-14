import { ClientShowcase } from '@/components/clients/ClientShowcase';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CLIENT_LOGOS } from '@/data/clients';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

export function ClientsPage() {
  useDocumentMeta('Our Clients', 'Organisations that trust SBF Rapid steel.');
  return (
    <>
      <PageHero
        eyebrow="Our clients"
        title={<>Trusted by builders and <span className="text-red-500">partners</span></>}
        description="A growing list of partners who build with SBF Rapid steel."
        breadcrumb="Our Clients"
      />
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Client wall"
              title="Organisations building with SBF Rapid"
              description="Browse the logos below. The wall advances automatically, or use the arrows and dots to choose a client."
            />
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <ClientShowcase clients={CLIENT_LOGOS} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
