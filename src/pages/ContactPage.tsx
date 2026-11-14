import { PageHero } from '@/components/ui/PageHero';
import { ContactForm } from '@/components/forms/ContactForm';
import { COMPANY } from '@/data/company';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

function mapEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function ContactPage() {
  useDocumentMeta('Contact Us', 'Contact SBF Rapid for product enquiries, quotes and support.');

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={<>Let&apos;s discuss your <span className="text-red-500">steel requirement</span></>}
        description="Have a question, need a quote or want to partner with us? Fill out the form and our team will get back to you."
        breadcrumb="Contact Us"
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:px-10">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lift sm:p-10">
            <h2 className="text-2xl font-bold text-navy-900">Send us an enquiry</h2>
            <p className="mt-2 text-sm text-slate-600">Fields marked with * are required.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-navy-900">Our contact information</h2>
            </div>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-navy-900"><Phone className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <p className="font-semibold text-navy-900">Call us</p>
                  <a href={COMPANY.phoneHref} className="text-slate-600 hover:text-red-600">{COMPANY.phone}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-navy-900"><Mail className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <p className="font-semibold text-navy-900">Email us</p>
                  <a href={`mailto:${COMPANY.email}`} className="break-all text-slate-600 hover:text-red-600">{COMPANY.email}</a>
                </div>
              </li>
            </ul>

            {[COMPANY.registeredOffice, COMPANY.plant].map((office) => (
              <div key={office.label} className="space-y-3 rounded-2xl bg-sky-100 p-6">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-navy-900">{office.label}</p>
                    <p className="text-sm text-slate-600">{office.address}</p>
                  </div>
                </div>
                <iframe
                  title={`Map of ${office.label}`}
                  src={mapEmbedUrl(office.mapQuery)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-44 w-full rounded-xl border-0"
                />
              </div>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
}
