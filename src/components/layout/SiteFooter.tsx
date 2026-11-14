import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY, FOOTER_LINKS } from '@/data/company';
import { Logo } from '@/components/ui/Logo';

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-navy-950 text-navy-100">
      <div className="steel-rule absolute inset-x-0 top-0 h-1 opacity-70" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div className="space-y-5">
          <Logo variant="light" />
          <p className="max-w-xs text-sm leading-[1.5] text-navy-200">
            Engineering trust since 1991. TMT steel and billets manufactured in Bhiwadi, Rajasthan, for builders and
            channel partners across India.
          </p>
        </div>

        <nav aria-label="Footer" className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Quick links</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.to + link.label}>
                <Link to={link.to} className="transition hover:text-white hover:underline underline-offset-4">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Contact</p>
          <ul className="space-y-4 text-sm">
            <li>
              <a href={COMPANY.phoneHref} className="flex items-center gap-3 transition hover:text-white">
                <Phone className="h-4 w-4 text-red-500" aria-hidden="true" />
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 transition hover:text-white">
                <Mail className="h-4 w-4 text-red-500" aria-hidden="true" />
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Our offices</p>
          <div className="space-y-4 text-sm">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
              <div>
                <p className="font-semibold text-white">{COMPANY.registeredOffice.label}</p>
                <p className="text-navy-200">{COMPANY.registeredOffice.address}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
              <div>
                <p className="font-semibold text-white">{COMPANY.plant.label}</p>
                <p className="text-navy-200">{COMPANY.plant.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p>{COMPANY.group} | Green Steel</p>
        </div>
      </div>
    </footer>
  );
}
