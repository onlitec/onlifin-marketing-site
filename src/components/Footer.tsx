import { Wordmark } from './Tape';

export const Footer = () => (
  <footer className="border-t border-desk-line bg-desk">
    <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-6 px-5 py-12 text-white sm:px-8 md:flex-row md:items-center">
      <Wordmark />
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-dim">
        © 2026 OnliFin SaaS. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);
