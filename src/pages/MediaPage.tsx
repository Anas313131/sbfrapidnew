import { useState } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { PlaceholderNotice } from '@/components/ui/PlaceholderNotice';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

const MEDIA_CATEGORIES = [
  'Press Ads',
  'Outdoor Ads',
  'Digital Ads',
  'Press Coverage',
  'Corporate Videos',
  'Events',
  'Testimonials',
  'Gallery',
  'CSR',
];

export function MediaPage() {
  useDocumentMeta('Media', 'Advertising, press coverage, videos and events from SBF Rapid.');
  const [category, setCategory] = useState(MEDIA_CATEGORIES[0]);

  return (
    <>
      <PageHero
        eyebrow="Media"
        title={<>Our story in <span className="text-red-500">motion and print</span></>}
        description="Advertising, press coverage, corporate videos and events from across the SBF Rapid journey."
        breadcrumb="Media"
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Media categories">
            {MEDIA_CATEGORIES.map((name) => (
              <button
                key={name}
                id={`tab-${name}`}
                type="button"
                role="tab"
                aria-selected={category === name}
                aria-controls="media-panel"
                onClick={() => setCategory(name)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === name ? 'bg-navy-900 text-white' : 'bg-sky-100 text-navy-900 hover:bg-navy-100'
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          <div id="media-panel" role="tabpanel" aria-labelledby={`tab-${category}`} className="mt-10">
            <PlaceholderNotice title={`${category} will appear here`}>
              Items are added once SBF approves the source, date and caption.
            </PlaceholderNotice>
          </div>
        </div>
      </section>
    </>
  );
}
