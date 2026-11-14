import { useState, type FormEvent } from 'react';
import { ArrowRight, MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ButtonLink, SubmitButton } from '@/components/ui/Button';
import { inputClass } from '@/components/ui/FormField';
import { TmtCalculator } from '@/components/calculator/TmtCalculator';

const HERO_IMAGE = 'https://images.pexels.com/photos/3736110/pexels-photo-3736110.jpeg?auto=compress&cs=tinysrgb&w=2000';

export function HeroSection() {
  return (
    <section className="relative bg-navy-950 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="hero-zoom h-full w-full object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-40 pt-16 sm:px-8 sm:pb-44 sm:pt-24 lg:px-10 lg:pb-48 lg:pt-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
          Trusted steel manufacturer since 1991
        </span>

        <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.1] sm:text-6xl lg:text-7xl">
          Built for a <br />
          <span className="text-red-500">Stronger</span> Tomorrow
        </h1>
        <p className="mt-6 max-w-xl text-base leading-[1.5] text-navy-100 sm:text-lg">
          High-quality TMT steel and steel products engineered for strength, safety and sustainability.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/our-products" className="group">
            Explore Products
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink to="/about-us" variant="light">
            About SBF Rapid
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function QuickPanel() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [queryError, setQueryError] = useState<string | undefined>();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setQueryError('Enter a city or 6-digit PIN code.');
      return;
    }
    setQueryError(undefined);
    navigate(`/find-dealers?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="relative z-10 mx-auto -mt-28 max-w-7xl px-5 sm:px-8 lg:-mt-36 lg:px-10">
      <div className="grid overflow-hidden rounded-3xl bg-white text-navy-900 shadow-lift lg:grid-cols-[1.25fr_1fr]">
        <div className="p-6 sm:p-8 lg:p-10">
          <TmtCalculator />
        </div>

        <div className="flex flex-col justify-between gap-8 border-t border-slate-200 bg-sky-100 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
          <div className="space-y-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="text-xl font-bold text-navy-900">Find Dealers Near You</h2>
            <p className="text-sm text-slate-600">Search by city or PIN code to locate an authorised SBF Rapid dealer.</p>
          </div>

          <form onSubmit={handleSearch} noValidate className="space-y-3">
            <label htmlFor="quick-dealer-search" className="sr-only">
              City or PIN code
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                id="quick-dealer-search"
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Enter your city or PIN code"
                aria-invalid={!!queryError}
                aria-describedby={queryError ? 'quick-dealer-error' : undefined}
                className={`${inputClass} pl-11`}
              />
            </div>
            {queryError && (
              <p id="quick-dealer-error" role="alert" className="text-sm text-red-600">
                {queryError}
              </p>
            )}
            <SubmitButton className="w-full">
              Find Dealers
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </SubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
}
