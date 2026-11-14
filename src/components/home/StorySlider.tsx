import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, type AnimationEvent } from 'react';
import { HOME_STORY_SLIDES } from '@/data/homeSlides';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

const SLIDE_MS = 6000;
const count = HOME_STORY_SLIDES.length;

export function StorySlider() {
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = HOME_STORY_SLIDES[active];

  const goTo = (index: number) => setActive(((index % count) + count) % count);

  const handleProgressEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) goTo(active + 1);
  };

  const controlClass =
    'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition duration-300 hover:border-white hover:bg-white hover:text-navy-900 active:scale-95';

  return (
    <section
      aria-roledescription="carousel"
      aria-label="SBF Rapid highlights"
      className="relative overflow-hidden bg-navy-950 py-24 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-5">
          <div key={active} className="space-y-6">
            <p className="slide-in-left flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-red-400">
              <span className="h-px w-8 bg-red-400" aria-hidden="true" />
              {slide.eyebrow}
            </p>
            <h2 className="slide-in-left text-3xl font-bold text-white sm:text-4xl" style={{ animationDelay: '80ms' }}>
              {slide.title}
            </h2>
            <p className="slide-in-left text-base text-slate-300 sm:text-lg" style={{ animationDelay: '160ms' }}>
              {slide.description}
            </p>
            {slide.points && (
              <ul className="flex flex-wrap gap-2">
                {slide.points.map((point, position) => (
                  <li
                    key={point}
                    className="slide-in-left rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
                    style={{ animationDelay: `${240 + position * 90}ms` }}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-12 flex items-center gap-5">
            <button type="button" className={controlClass} aria-label="Previous highlight" onClick={() => goTo(active - 1)}>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-2" role="group" aria-label="Choose highlight">
              {HOME_STORY_SLIDES.map((item, position) => (
                <button
                  key={item.title}
                  type="button"
                  aria-label={`Show highlight ${position + 1}`}
                  aria-current={position === active || undefined}
                  onClick={() => goTo(position)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    position === active ? 'w-8 bg-red-500' : 'w-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
            <button type="button" className={controlClass} aria-label="Next highlight" onClick={() => goTo(active + 1)}>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-navy-900 shadow-lift sm:aspect-[16/10]">
            {HOME_STORY_SLIDES.map((item, position) => {
              const isActive = position === active;
              return (
                <img
                  key={item.image}
                  src={item.image}
                  alt={isActive ? item.alt : ''}
                  aria-hidden={!isActive || undefined}
                  loading={position === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  } ${isActive && !reducedMotion ? 'ken-burns' : ''}`}
                />
              );
            })}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
              {!reducedMotion && (
                <div
                  key={active}
                  className="slide-progress h-full origin-left bg-red-500"
                  style={{
                    animationDuration: `${SLIDE_MS}ms`,
                    animationPlayState: paused ? 'paused' : 'running',
                  }}
                  onAnimationEnd={handleProgressEnd}
                />
              )}
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            {slide.title}
          </p>
        </div>
      </div>
    </section>
  );
}

