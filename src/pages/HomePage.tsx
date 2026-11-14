import { useDocumentMeta } from '@/lib/useDocumentMeta';
import { HeroSection, QuickPanel } from '@/components/home/HeroSection';
import {
  FinalCta,
  LegacySection,
  ProcessPreview,
  ProductPreview,
  QualityPreview,
  ValueCards,
} from '@/components/home/HomeSections';
import { ClientsPreview } from '@/components/home/ClientsPreview';
import { StorySlider } from '@/components/home/StorySlider';

export function HomePage() {
  useDocumentMeta(
    'SBF Rapid | Built for a Stronger Tomorrow',
    'SBF Rapid manufactures high-quality TMT steel bars and billets in Bhiwadi, Rajasthan, engineered for strength, safety and sustainability.',
  );

  return (
    <>
      <HeroSection />
      <QuickPanel />
      <LegacySection />
      <StorySlider />
      <ValueCards />
      <ProductPreview />
      <ProcessPreview />
      <QualityPreview />
      <ClientsPreview />
      <FinalCta />
    </>
  );
}
