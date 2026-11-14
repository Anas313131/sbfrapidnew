import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { ManufacturingPage } from '@/pages/ManufacturingPage';
import { MediaPage } from '@/pages/MediaPage';
import { CertificatesPage } from '@/pages/CertificatesPage';
import { PricingPage } from '@/pages/PricingPage';
import { FindDealersPage } from '@/pages/FindDealersPage';
import { ContactPage } from '@/pages/ContactPage';
import { BecomeDealerPage } from '@/pages/BecomeDealerPage';
import { ClientsPage } from '@/pages/ClientsPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { BlogPage } from '@/pages/BlogPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about-us" element={<AboutPage />} />
          <Route path="our-products" element={<ProductsPage />} />
          <Route path="manufacturing-processes" element={<ManufacturingPage />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="our-certificates" element={<CertificatesPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="find-dealers" element={<FindDealersPage />} />
          <Route path="contact-us" element={<ContactPage />} />
          <Route path="become-a-dealer" element={<BecomeDealerPage />} />
          <Route path="our-clients" element={<ClientsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
