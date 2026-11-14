import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

export function SiteLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-red-600 focus:px-5 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" key={location.pathname} className="page-enter flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
