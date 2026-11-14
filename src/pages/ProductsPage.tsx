import { Check } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { PlaceholderNotice } from '@/components/ui/PlaceholderNotice';
import { PRODUCT_CARDS, PRODUCT_FAQS, TMT_FEATURES } from '@/data/products';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

const SPEC_ROWS = ['Grade', 'Diameter range', 'Yield strength', 'Tensile strength', 'Elongation', 'Chemical composition', 'Weight per metre'];

export function ProductsPage() {
  useDocumentMeta('Our Products', 'TMT reinforcement bars and MS billets from SBF Rapid, available in 8 mm to 40 mm bar sizes.');

  return (
    <>
      <PageHero
        eyebrow="Our products"
        title={<>Reinforcement you can <span className="text-red-500">rely on</span></>}
        description="Thermo-mechanically treated bars and billets for builders, dealers and steel users across India."
        breadcrumb="Our Products"
        image="https://images.pexels.com/photos/46167/iron-rods-reinforcing-bars-rods-steel-bars-46167.jpeg?auto=compress&cs=tinysrgb&w=2000"
      />

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 md:grid-cols-2 lg:px-10">
          {PRODUCT_CARDS.map((product, index) => (
            <Reveal key={product.id} delay={index * 120}>
              <article id={product.id} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600">{product.subtitle}</p>
                <h2 className="mt-3 text-2xl font-bold text-navy-900">{product.title}</h2>
                <p className="mt-4 text-slate-600">{product.description}</p>
                <ul className="mt-6 space-y-3">
                  {product.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-navy-900">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ButtonLink to="/contact-us" variant="outline">Request a quote</ButtonLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sky-100 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Key properties" title="Designed for site performance" description="Each property is confirmed by test data and the applicable standard before we publish it as a specification." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TMT_FEATURES.map((feature) => (
              <div key={feature.title} className="rounded-2xl bg-white p-6 shadow-card">
                <h3 className="font-bold text-navy-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-[1.5] text-slate-600">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Technical data" title="Specification tables" />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[480px] text-left text-sm">
              <caption className="sr-only">Technical specification placeholders</caption>
              <thead className="bg-navy-900 text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Property</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                {SPEC_ROWS.map((row) => (
                  <tr key={row} className="border-t border-slate-200">
                    <th scope="row" className="px-6 py-4 font-semibold text-navy-900">{row}</th>
                    <td className="px-6 py-4 text-slate-500">Pending approved datasheet</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <PlaceholderNotice title="Datasheet values">
              Values are withheld until SBF supplies an approved technical datasheet.
            </PlaceholderNotice>
          </div>
        </div>
      </section>

      <section className="bg-sky-100 py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="FAQs" title="Common questions" />
          <div className="mt-10 space-y-3">
            {PRODUCT_FAQS.map((faq) => (
              <details key={faq.question} className="group rounded-2xl bg-white p-6 shadow-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy-900">
                  {faq.question}
                  <span className="text-red-600 transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-4 text-sm leading-[1.5] text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
