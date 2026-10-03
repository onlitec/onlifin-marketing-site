import { Wordmark } from './Tape';
import { getPlatformBaseUrl } from '../lib/platform';

export const Footer = ({ home = true }: { home?: boolean }) => {
  const prefix = home ? '' : '/';
  const links = [
    { href: `${prefix}#features`, label: 'Funcionalidades' },
    { href: `${prefix}#pricing`, label: 'Planos' },
    { href: '/metodo', label: 'Método' },
    { href: `${getPlatformBaseUrl()}/pf`, label: 'Acessar plataforma' },
  ];

  return (
    <footer className="border-t border-desk-line bg-desk">
      <div className="mx-auto max-w-[1320px] px-5 py-12 text-white sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="mt-4 max-w-[22rem] text-base leading-relaxed text-dim">
              Gestão financeira pessoal e empresarial em uma plataforma.
            </p>
          </div>
          <nav aria-label="Rodapé" className="md:col-span-7">
            <ul className="border-t border-desk-line md:grid md:grid-cols-2 md:gap-x-10">
              {links.map((link) => (
                <li key={link.label} className="border-b border-desk-line">
                  <a
                    href={link.href}
                    className="flex min-h-[48px] items-center font-mono text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:text-vermilion-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.12em] text-dim">
          © 2026 OnliFin SaaS. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};
