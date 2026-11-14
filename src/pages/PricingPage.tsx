import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '@/components/ui/PageHero';
import { ButtonLink } from '@/components/ui/Button';
import { PlaceholderNotice } from '@/components/ui/PlaceholderNotice';
import { supabase } from '@/lib/supabase';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

type PriceItem = {
  id: string;
  grade: string;
  diameter_mm: number;
  price: number;
  unit: string;
  region: string;
  updated_at: string;
};

type LoadState = { status: 'loading' } | { status: 'error' } | { status: 'ready'; items: PriceItem[] };

const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 });
const dateFormat = new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

export function PricingPage() {
  useDocumentMeta('Pricing', 'Current SBF Rapid TMT price list, subject to confirmation by our sales team.');
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    supabase
      .from('price_items')
      .select('id, grade, diameter_mm, price, unit, region, updated_at')
      .eq('active', true)
      .order('grade')
      .order('diameter_mm')
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !Array.isArray(data)) {
          setState({ status: 'error' });
          return;
        }
        setState({ status: 'ready', items: data as PriceItem[] });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const lastUpdated =
    state.status === 'ready' && state.items.length > 0
      ? new Date(Math.max(...state.items.map((item) => new Date(item.updated_at).getTime())))
      : null;

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={<>Transparent rates, <span className="text-red-500">confirmed by sales</span></>}
        description="Retail rates vary by region, transport and tax. Use this list as a guide and confirm the current rate before you order."
        breadcrumb="Pricing"
      />

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-3 rounded-2xl bg-sky-100 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-navy-900">
              Prices subject to confirmation.
            </p>
            <p className="text-sm text-slate-600">
              {lastUpdated ? `Last updated ${dateFormat.format(lastUpdated)}` : 'Last updated date will show once rates are published'}
            </p>
          </div>

          <div className="mt-8">
            {state.status === 'loading' && <p className="text-slate-600">Loading the current price list…</p>}

            {state.status === 'error' && (
              <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
                We could not load the price list right now. Please try again shortly or contact customer care.
              </div>
            )}

            {state.status === 'ready' && state.items.length === 0 && (
              <PlaceholderNotice title="Current rates are being prepared">
                No approved rates are published yet. Contact our sales team for today&apos;s price.
              </PlaceholderNotice>
            )}

            {state.status === 'ready' && state.items.length > 0 && (
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-card">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <caption className="sr-only">Current TMT price list</caption>
                  <thead className="bg-navy-900 text-white">
                    <tr>
                      <th scope="col" className="px-6 py-4 font-semibold">Grade</th>
                      <th scope="col" className="px-6 py-4 font-semibold">Diameter</th>
                      <th scope="col" className="px-6 py-4 font-semibold">Region</th>
                      <th scope="col" className="px-6 py-4 text-right font-semibold">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.items.map((item) => (
                      <tr key={item.id} className="border-t border-slate-200">
                        <td className="px-6 py-4 font-semibold text-navy-900">{item.grade}</td>
                        <td className="px-6 py-4">{item.diameter_mm} mm</td>
                        <td className="px-6 py-4">{item.region}</td>
                        <td className="px-6 py-4 text-right font-semibold text-navy-900">
                          {currency.format(item.price)} <span className="text-xs font-normal text-slate-500">{item.unit}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-12 flex flex-col items-start gap-4 rounded-3xl bg-navy-900 p-8 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-bold">Need bulk or region-specific pricing?</p>
              <p className="mt-1 text-sm text-navy-100">
                <Link to="/contact-us" className="underline underline-offset-4 hover:text-white">
                  Send an enquiry
                </Link>{' '}
                and our team will reply with a quote.
              </p>
            </div>
            <ButtonLink to="/contact-us">Get a Quote</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
