import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Wordmark } from './Tape';
import { getPlatformBaseUrl } from '../lib/platform';

const LINKS = [
  { href: '#features', label: 'Funcionalidades' },
  { href: '#operation', label: 'Como funciona' },
  { href: '#pricing', label: 'Planos' },
  { href: '#about', label: 'Sobre' },
];

export const Header = ({ onStart }: { onStart: () => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-desk-line bg-desk">
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" aria-label="OnliFin, início" className="text-white">
          <Wordmark />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 text-[0.9375rem] font-medium text-dim transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-6">
          <a
            href={`${getPlatformBaseUrl()}/pf`}
            className="hidden text-[0.9375rem] font-medium text-dim underline decoration-desk-line underline-offset-[6px] transition-colors hover:text-white hover:decoration-white sm:inline"
          >
            Acessar plataforma
          </a>
          <button
            type="button"
            onClick={onStart}
            className="min-h-[44px] whitespace-nowrap bg-paper px-3.5 font-mono text-xs sm:px-5 sm:text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-vermilion-light"
          >
            Começar grátis
          </button>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center text-white lg:hidden"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Principal" className="border-t border-desk-line bg-desk lg:hidden">
          <ul className="mx-auto max-w-[1320px] px-5 py-2 sm:px-8">
            {[...LINKS, { href: `${getPlatformBaseUrl()}/pf`, label: 'Acessar plataforma' }].map((link) => (
              <li key={link.label} className="border-b border-desk-line last:border-b-0">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[52px] items-center text-lg font-medium text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
