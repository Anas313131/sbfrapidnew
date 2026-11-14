import { ArrowRight, Award, Factory, Leaf, Network, ShieldCheck } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PRODUCT_CARDS } from '@/data/products';
import { PROCESS_STEPS } from '@/data/manufacturing';
import { CERTIFICATE_CATEGORIES } from '@/data/certificates';

const VALUE_CARDS = [
  { icon: Award, title: 'Premium Quality', body: 'Testing is carried out in-house, from spectrometer checks to UTM tensile testing.' },
  { icon: ShieldCheck, title: 'Strength', body: 'Thermex quenching and self-tempering build the strength that builders depend on.' },
  { icon: Leaf, title: 'Responsible Manufacturing', body: 'Our Green Steel programme reflects our commitment to cleaner production, with evidence to be published.' },
  { icon: Network, title: 'Dealer & Service Network', body: 'Authorised dealers and a doorstep after-sales team stay close to every project.' },
];

export function LegacySection() {
  return (
    <section className="bg-sky-100 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Our legacy"
            title={
              <>
                Engineering Trust <span className="text-red-600">Since 1991</span>
              </>
            }
            description="SBF Group began in 1991 and today manufactures MS Ingots, MS Billets and TMT bars from its facilities in Bhiwadi, Rajasthan. Our focus is steady quality, sustainable growth and dependable service for the people who build with our steel."
          />
          <ButtonLink to="/about-us" variant="outline" className="mt-8">
            Know More
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </Reveal>

        <Reveal delay={120}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '1991', label: 'Year SBF Group began' },
              { value: 'Bhiwadi', label: 'Manufacturing base, Rajasthan' },
              { value: '8–40 mm', label: 'TMT bar range' },
              { value: '3 products', label: 'Ingots, billets and TMT bars' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white p-6 shadow-card">
                <p className="text-2xl font-bold text-navy-900">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ValueCards() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading eyebrow="Why SBF Rapid" title="Strength you can build on" align="center" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_CARDS.map((card, index) => (
            <Reveal key={card.title} delay={index * 90}>
              <article className="group h-full rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-white transition group-hover:bg-red-600">
                  <card.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-bold text-navy-900">{card.title}</h3>
                <p className="mt-3 text-sm leading-[1.5] text-slate-600">{card.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductPreview() {
  return (
    <section className="bg-navy-950 py-24 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Our products" title={<span className="text-white">Our steel products</span>} />
          <ButtonLink to="/our-products" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-900">
            View all products
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PRODUCT_CARDS.map((product, index) => (
            <Reveal key={product.id} delay={index * 120}>
              <ProductTile title={product.title} subtitle={product.subtitle} description={product.description} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductTile({ title, subtitle, description }: { title: string; subtitle: string; description: string }) {
  return (
    <article className="group relative h-full overflow-hidden rounded-3xl border border-navy-700 bg-navy-900 p-8 transition duration-500 hover:-translate-y-1 hover:border-red-600">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-500">{subtitle}</p>
      <h3 className="mt-3 text-2xl font-bold text-white">{title}</h3>
      <p className="mt-4 max-w-md text-sm leading-[1.5] text-navy-200">{description}</p>
      <ButtonLink to="/our-products" variant="ghost" className="mt-8 px-0 text-white hover:bg-transparent hover:text-red-400">
        View details <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
      </ButtonLink>
    </article>
  );
}

export function ProcessPreview() {
  const previewSteps = PROCESS_STEPS.slice(0, 4);
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="How we make it"
          title="From raw material to reliable reinforcement"
          description="Twelve steps, each checked, from sponge iron and HMS through to dispatch."
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {previewSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 100} className="h-full">
              <li className="relative h-full list-none rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-[1.5] text-slate-600">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <ButtonLink to="/manufacturing-processes" variant="outline" className="mt-10">
          See the full process <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </section>
  );
}

export function QualityPreview() {
  return (
    <section className="bg-sky-100 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Quality & certifications"
            title="Documented compliance"
            description="We keep licences, registrations and test documentation in one place so customers and dealers can check them."
          />
          <ul className="mt-8 flex flex-wrap gap-2">
            {CERTIFICATE_CATEGORIES.map((category) => (
              <li key={category} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy-900 shadow-card">
                {category}
              </li>
            ))}
          </ul>
          <ButtonLink to="/our-certificates" className="mt-8">
            Browse certificates <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </Reveal>
        <Reveal delay={120}>
          <div className="rounded-3xl bg-white p-8 shadow-lift sm:p-10">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
              <Factory className="h-7 w-7" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-xl font-bold text-navy-900">In-house testing before dispatch</h3>
            <p className="mt-3 text-sm leading-[1.5] text-slate-600">
              Tensile, compression, bend and re-bend, and microstructure checks are part of our quality programme. Details are on the Manufacturing Processes page.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="py-24">
      <Reveal className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-8 py-14 text-center text-white sm:px-16">
          <div className="steel-rule absolute inset-x-0 bottom-0 h-1 opacity-60" aria-hidden="true" />
          <h2 className="text-3xl font-bold sm:text-4xl">Planning a project? Let&apos;s talk about your steel.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-navy-100">
            Send us your requirement and our sales team will get back to you. For immediate help, call customer care.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink to="/contact-us">Get a Quote</ButtonLink>
            <ButtonLink to="/become-a-dealer" variant="light">
              Become a Dealer
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
