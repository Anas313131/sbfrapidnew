import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type DropdownChild = { label: string; to: string; description: string };

type NavDropdownProps = {
  label: string;
  items: readonly DropdownChild[];
};

export function NavDropdown({ label, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const location = useLocation();
  const isActive = items.some((item) => item.to === location.pathname);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;

    const handlePointer = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('touchstart', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('touchstart', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold transition hover:text-red-600 ${
          isActive ? 'text-red-600' : 'text-navy-900'
        }`}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <div
        id={menuId}
        className={`absolute left-0 top-full z-50 w-72 origin-top pt-3 transition duration-200 ${
          open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
        }`}
      >
        <ul className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-lift">
          {items.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                className="block rounded-xl px-4 py-3 transition hover:bg-sky-100 focus-visible:bg-sky-100"
              >
                <span className="block text-sm font-semibold text-navy-900">{item.label}</span>
                <span className="block text-xs text-slate-500">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
