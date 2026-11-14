import { PageHero } from '@/components/ui/PageHero';
import { PlaceholderNotice } from '@/components/ui/PlaceholderNotice';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

export function GalleryPage() {
  useDocumentMeta('Gallery', 'Photographs of the SBF Rapid plant, products, events and CSR activity.');
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={<>Inside the <span className="text-red-500">plant and beyond</span></>}
        description="Plant, product, event and CSR photographs from SBF Rapid."
        breadcrumb="Gallery"
      />
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
          <PlaceholderNotice title="Gallery photographs">
            Original plant and event photographs with descriptive captions will be added once SBF supplies them.
          </PlaceholderNotice>
        </div>
      </section>
    </>
  );
}
