import { ArrowRight } from 'lucide-react';
import { ClientShowcase } from '@/components/clients/ClientShowcase';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CLIENT_LOGOS } from '@/data/clients';

export function ClientsPreview() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Our clients"
            title="Organisations building with SBF Rapid"
            description="A selection of the partners who build with our TMT steel."
            align="center"
          />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <ClientShowcase clients={CLIENT_LOGOS} />
        </Reveal>
        <Reveal delay={200} className="mt-12 flex justify-center">
          <ButtonLink to="/our-clients" variant="outline">
            View all clients <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
