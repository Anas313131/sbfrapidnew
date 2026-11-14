import { PageHero } from '@/components/ui/PageHero';
import { PlaceholderNotice } from '@/components/ui/PlaceholderNotice';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

export function BlogPage() {
  useDocumentMeta('Blog', 'News and updates from SBF Rapid.');
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={<>News and <span className="text-red-500">updates</span></>}
        description="Company news, product updates and industry notes from SBF Rapid."
        breadcrumb="Blog"
      />
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
          <PlaceholderNotice title="Articles">
            Articles will be published here once SBF approves the first set of posts.
          </PlaceholderNotice>
        </div>
      </section>
    </>
  );
}
