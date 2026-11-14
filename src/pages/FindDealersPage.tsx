import { useEffect, useState, type FormEvent } from 'react';
import { MapPin, Navigation, Phone, Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { PageHero } from '@/components/ui/PageHero';
import { ButtonLink, SubmitButton } from '@/components/ui/Button';
import { inputClass } from '@/components/ui/FormField';
import { supabase } from '@/lib/supabase';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

type Dealer = {
  id: string;
  dealer_name: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
  phone: string | null;
  latitude: number | null;
  longitude: number | null;
};

type LoadState = { status: 'loading' } | { status: 'error' } | { status: 'ready'; dealers: Dealer[] };

const PIN_PATTERN = /^\d{6}$/;

function escapeLike(value: string) {
  return value.replace(/[%_,()]/g, ' ').trim();
}

async function fetchDealers(term: string): Promise<LoadState> {
  let request = supabase
    .from('dealers')
    .select('id, dealer_name, address, city, state, pin_code, phone, latitude, longitude')
    .eq('active', true)
    .order('city')
    .limit(100);

  if (term) {
    request = PIN_PATTERN.test(term)
      ? request.eq('pin_code', term)
      : request.ilike('city', `%${escapeLike(term)}%`);
  }

  const { data, error } = await request;
  if (error || !Array.isArray(data)) return { status: 'error' };
  return { status: 'ready', dealers: data as Dealer[] };
}

export function FindDealersPage() {
  useDocumentMeta('Find Dealers', 'Locate an authorised SBF Rapid dealer by city or PIN code.');
  const [searchParams, setSearchParams] = useSearchParams();
  const term = (searchParams.get('q') ?? '').trim();
  const [input, setInput] = useState(term);
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });
    fetchDealers(term).then((next) => {
      if (!cancelled) setState(next);
    });
    return () => {
      cancelled = true;
    };
  }, [term]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = input.trim();
    setSearchParams(next ? { q: next } : {});
  };

  return (
    <>
      <PageHero
        eyebrow="Find dealers"
        title={<>Find an <span className="text-red-500">authorised dealer</span></>}
        description="Search by city or six-digit PIN code to find an SBF Rapid dealer near your site."
        breadcrumb="Find Dealers"
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <form onSubmit={handleSubmit} role="search" className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-card sm:flex-row">
            <label htmlFor="dealer-search" className="sr-only">City or PIN code</label>
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                id="dealer-search"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="City or 6-digit PIN code"
                className={`${inputClass} pl-11`}
              />
            </div>
            <SubmitButton>Search</SubmitButton>
          </form>

          <div className="mt-10" aria-live="polite">
            {state.status === 'loading' && <p className="text-slate-600">Searching dealers…</p>}

            {state.status === 'error' && (
              <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
                We could not load dealers right now. Please try again or call customer care.
              </p>
            )}

            {state.status === 'ready' && state.dealers.length === 0 && (
              <div className="rounded-3xl bg-sky-100 p-10 text-center">
                <MapPin className="mx-auto h-10 w-10 text-navy-900" aria-hidden="true" />
                <h2 className="mt-4 text-xl font-bold text-navy-900">
                  {term ? `No dealers found for “${term}”` : 'Dealer directory coming soon'}
                </h2>
                <p className="mx-auto mt-2 max-w-md text-slate-600">
                  Our dealer list is updated by our team. Call customer care and we will connect you with the nearest dealer.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <ButtonLink to="/contact-us">Contact support</ButtonLink>
                  <ButtonLink to="/become-a-dealer" variant="outline">Become a dealer</ButtonLink>
                </div>
              </div>
            )}

            {state.status === 'ready' && state.dealers.length > 0 && (
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {state.dealers.map((dealer) => (
                  <li key={dealer.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                    <h2 className="text-lg font-bold text-navy-900">{dealer.dealer_name}</h2>
                    <p className="mt-2 text-sm text-slate-600">{dealer.address}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      {dealer.city}, {dealer.state} – {dealer.pin_code}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-3 pt-6">
                      {dealer.phone && (
                        <a href={`tel:${dealer.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-800">
                          <Phone className="h-4 w-4" aria-hidden="true" /> Call
                        </a>
                      )}
                      {dealer.latitude !== null && dealer.longitude !== null && (
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${dealer.latitude},${dealer.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-navy-900 px-4 py-2 text-sm font-semibold text-navy-900 transition hover:bg-navy-900 hover:text-white"
                        >
                          <Navigation className="h-4 w-4" aria-hidden="true" /> Directions
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
