import { useEffect, useRef } from 'react';
import { ChevronRight, Phone, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { COMPANY, NAV_LINKS } from '@/data/company';
import { ButtonLink } from '@/components/ui/Button';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-[60] lg:hidden ${open ? 'visible' : 'invisible transition-[visibility] duration-300'}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-navy-950/60 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`absolute right-0 top-0 flex h-full w-[min(88vw,380px)] flex-col bg-white shadow-lift transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Menu</p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-navy-900 transition hover:bg-sky-100"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
          <ul className="space-y-1">
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition ${
                      isActive ? 'bg-red-50 text-red-600' : 'text-navy-900 hover:bg-sky-100'
                    }`
                  }
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                </NavLink>
                {'children' in item && (
                  <ul className="ml-4 mt-1 space-y-1 border-l border-slate-200 pl-3">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link to={child.to} className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:text-red-600">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-slate-200 p-5">
          <ButtonLink to="/find-dealers" className="w-full">
            Find Dealers
          </ButtonLink>
          <ButtonLink to="/contact-us" variant="outline" className="w-full">
            Get a Quote
          </ButtonLink>
          <a href={COMPANY.phoneHref} className="flex items-center justify-center gap-2 pt-2 text-sm font-semibold text-navy-900">
            <Phone className="h-4 w-4 text-red-600" aria-hidden="true" />
            {COMPANY.phone}
          </a>
        </div>
      </aside>
    </div>
  );
}
