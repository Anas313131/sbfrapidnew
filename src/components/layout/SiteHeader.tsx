import { useCallback, useEffect, useState } from 'react';
import { Menu, Phone, Mail } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { COMPANY, NAV_LINKS } from '@/data/company';
import { Logo } from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { NavDropdown } from '@/components/layout/NavDropdown';

function navItemClass({ isActive }: { isActive: boolean }) {
  return `rounded-full px-3 py-2 text-sm font-semibold transition hover:text-red-600 ${
    isActive ? 'text-red-600' : 'text-navy-900'
  }`;
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? 'border-slate-200 bg-white/95 shadow-card backdrop-blur-md'
          : 'border-transparent bg-white'
      }`}
    >
      <div className="hidden bg-navy-900 text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-xs sm:px-8 lg:px-10">
          <div className="flex items-center gap-5">
            <a href={COMPANY.phoneHref} className="flex items-center gap-2 transition hover:text-red-100">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {COMPANY.phone}
            </a>
            <span className="h-3 w-px bg-navy-500" aria-hidden="true" />
            <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 transition hover:text-red-100">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {COMPANY.email}
            </a>
          </div>
          <p className="font-semibold tracking-wide text-navy-100">Since 1991 | Bhiwadi, Rajasthan</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-10">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((item) =>
            'children' in item ? (
              <NavDropdown key={item.label} label={item.label} items={item.children} />
            ) : (
              <NavLink key={item.label} to={item.to} end={item.to === '/'} className={navItemClass}>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink to="/find-dealers" className="hidden px-5 py-2.5 xl:inline-flex">
            Find Dealers
          </ButtonLink>
          <ButtonLink to="/contact-us" variant="outline" className="hidden px-5 py-2.5 lg:inline-flex">
            Get a Quote
          </ButtonLink>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-navy-900 transition hover:border-navy-900 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </header>
  );
}
