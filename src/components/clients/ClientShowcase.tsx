import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { ClientLogo } from '@/data/clients';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

const AUTO_INTERVAL_MS = 3200;
const TRANSITION_MS = 700;
const COPIES = 3;

function getVisibleCount() {
  if (window.matchMedia('(min-width: 1024px)').matches) return 3;
  if (window.matchMedia('(min-width: 640px)').matches) return 2;
  return 1;
}

function useVisibleCount() {
  const [count, setCount] = useState(getVisibleCount);
  useEffect(() => {
    const update = () => setCount(getVisibleCount());
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return count;
}

function wrapIndex(value: number, length: number) {
  return ((value % length) + length) % length;
}

const trackEase = 'cubic-bezier(0.22, 1, 0.36, 1)';

export function ClientShowcase({ clients }: { clients: ClientLogo[] }) {
  const count = clients.length;
  const visible = useVisibleCount();
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(count);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  const slides = useMemo(() => Array.from({ length: COPIES }, () => clients).flat(), [clients]);
  const activeDot = wrapIndex(index, count);

  useEffect(() => {
    if (reducedMotion || paused || count < 2) return;
    const id = window.setInterval(() => setIndex((current) => current - 1), AUTO_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, paused, count, index]);

  useEffect(() => {
    if (index >= count && index < count * 2) return;
    const id = window.setTimeout(() => {
      setAnimate(false);
      setIndex(wrapIndex(index, count) + count);
    }, TRANSITION_MS);
    return () => window.clearTimeout(id);
  }, [index, count]);

  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  if (count === 0) return null;

  const trackStyle = {
    width: `${(slides.length * 100) / visible}%`,
    transform: `translateX(-${(index * 100) / slides.length}%)`,
    transition: animate && !reducedMotion ? `transform ${TRANSITION_MS}ms ${trackEase}` : 'none',
  };

  const controlClass =
    'inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-navy-900 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-red-600 hover:text-red-600 active:scale-95';

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Client logos"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div className="flex" style={trackStyle}>
          {slides.map((client, position) => {
            const isCopy = position >= count;
            return (
              <div
                key={`${client.name}-${position}`}
                className="px-3 py-2"
                style={{ flex: `0 0 ${100 / slides.length}%` }}
                aria-hidden={isCopy || undefined}
              >
                <div className="group flex h-36 items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition duration-500 hover:-translate-y-1 hover:border-red-200 hover:shadow-lift sm:h-40">
                  <img
                    src={client.src}
                    alt={isCopy ? '' : `${client.name} logo`}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          className={controlClass}
          aria-label="Show previous client"
          onClick={() => setIndex((current) => current - 1)}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-2" role="group" aria-label="Choose client">
          {clients.map((client, position) => (
            <button
              key={client.name}
              type="button"
              aria-label={`Show ${client.name}`}
              aria-current={position === activeDot || undefined}
              onClick={() => setIndex(count + position)}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                position === activeDot ? 'w-8 bg-red-600' : 'w-2.5 bg-slate-300 hover:bg-navy-400'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          className={controlClass}
          aria-label="Show next client"
          onClick={() => setIndex((current) => current + 1)}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
