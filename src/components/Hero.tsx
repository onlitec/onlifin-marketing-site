import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import { Settle, useInView, usePrefersReducedMotion } from './Tape';

type Row =
  | { kind: 'head'; left: string; right: string }
  | { kind: 'note'; text: string }
  | { kind: 'entry'; ctx: 'PF' | 'PJ'; label: string; amount: string; negative?: boolean; forecast?: boolean }
  | { kind: 'sub'; label: string; amount: string }
  | { kind: 'divider'; label: string }
  | { kind: 'total'; label: string; amount: string };

// Synthetic sample data, labeled as such on the tape itself.
// PF 5.387,20 + PJ 1.160,00 = 6.547,20; forecast -740,00 => 5.807,20.
const ROWS: Row[] = [
  { kind: 'head', left: 'Fechamento do mês', right: 'Exemplo' },
  { kind: 'note', text: 'Importado: extrato.ofx · 5 lançamentos' },
  { kind: 'entry', ctx: 'PF', label: 'Supermercado', amount: '-412,80', negative: true },
  { kind: 'entry', ctx: 'PF', label: 'Salário', amount: '+5.800,00' },
  { kind: 'entry', ctx: 'PJ', label: 'Cliente · NF 0231', amount: '+3.200,00' },
  { kind: 'entry', ctx: 'PJ', label: 'Aluguel da sala', amount: '-1.150,00', negative: true },
  { kind: 'entry', ctx: 'PJ', label: 'Fornecedor', amount: '-890,00', negative: true },
  { kind: 'note', text: 'Conciliado: 5 de 5' },
  { kind: 'sub', label: 'Subtotal PF', amount: '5.387,20' },
  { kind: 'sub', label: 'Subtotal PJ', amount: '1.160,00' },
  { kind: 'divider', label: 'Previsão' },
  { kind: 'entry', ctx: 'PJ', label: 'Boleto a pagar 12/05', amount: '-740,00', negative: true, forecast: true },
  { kind: 'total', label: 'Saldo previsto', amount: 'R$ 5.807,20' },
];

const Tape = () => {
  const reduced = usePrefersReducedMotion();
  const [figRef, seen] = useInView<HTMLElement>(0.3);
  const line = 'grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-baseline gap-x-3 px-6 py-[7px]';

  return (
    <figure ref={figRef} className={`relative w-full max-w-[430px] justify-self-center lg:justify-self-end ${seen ? '' : 'tape-idle'}`}>
      {/* Paper slot */}
      <div aria-hidden="true" className="mx-[-14px] h-[10px] bg-black" />
      <div className="on-paper tape-serrate-b bg-paper pb-10 pt-3 text-ink">
        <ul className="num text-[0.8125rem] leading-snug">
          {ROWS.map((row, i) => {
            const style = { '--i': i } as CSSProperties;
            const delay = i * 430 + 480;
            const cls = reduced ? '' : 'feed';

            if (row.kind === 'head') {
              return (
                <li key={i} style={style} className={`${cls} flex justify-between border-b border-ink px-6 pb-3 pt-1 text-xs font-bold uppercase tracking-[0.14em]`}>
                  <span>{row.left}</span>
                  <span className="text-vermilion">{row.right}</span>
                </li>
              );
            }
            if (row.kind === 'note') {
              return (
                <li key={i} style={style} className={`${cls} px-6 py-2.5 text-xs uppercase tracking-[0.08em] text-ink-mute`}>
                  {row.text}
                </li>
              );
            }
            if (row.kind === 'entry') {
              return (
                <li
                  key={i}
                  style={style}
                  className={`${cls} ${line} ${row.forecast ? 'border-b border-dashed border-ink/50 text-ink-mute' : ''}`}
                >
                  <span className="font-bold">{row.ctx}</span>
                  <span className="truncate font-text text-[0.9375rem] font-medium">{row.label}</span>
                  <span className={row.negative ? 'text-vermilion' : ''}>
                    <Settle value={row.amount} delay={delay} active={!reduced && seen} />
                  </span>
                </li>
              );
            }
            if (row.kind === 'sub') {
              return (
                <li key={i} style={style} className={`${cls} flex justify-between border-t border-ink px-6 py-2 font-bold text-vermilion`}>
                  <span className="uppercase tracking-[0.08em]">{row.label}</span>
                  <Settle value={row.amount} delay={delay} active={!reduced && seen} />
                </li>
              );
            }
            if (row.kind === 'divider') {
              return (
                <li key={i} style={style} className={`${cls} px-6 pb-1 pt-3 text-xs uppercase tracking-[0.3em] text-ink-mute`}>
                  <span className="mr-2">- - -</span>{row.label}<span className="ml-2">- - -</span>
                </li>
              );
            }
            return (
              <li key={i} style={style} className={`${cls} mt-2 border-t-2 border-ink px-6 pt-4`}>
                <span className="block text-xs font-bold uppercase tracking-[0.14em] text-ink-mute">= {row.label}</span>
                <span className="rule-total mt-1 inline-block font-display text-[3.4rem] font-black leading-[1.05] tracking-normal">
                  <Settle value={row.amount} delay={delay} active={!reduced && seen} />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <figcaption className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-dim">
        Exemplo ilustrativo · dados fictícios
      </figcaption>
    </figure>
  );
};

export const Hero = ({ onStart }: { onStart: () => void }) => (
  <section id="top" className="overflow-x-clip bg-desk">
    <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-14 px-5 pb-24 pt-12 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:pb-32 lg:pt-20">
      <div className="lg:col-span-7">
        <h1 className="text-balance font-display text-[3.2rem] font-black uppercase leading-[0.92] tracking-[0.01em] text-white sm:text-[5rem] lg:text-[6rem]">
          Controle PF e PJ <span className="inline-block text-vermilion-light">sem perder contexto.</span>
        </h1>
        <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-dim">
          O OnliFin organiza contas, cartões, transações, contas a pagar e a receber, importação de extratos,
          conciliação, relatórios e previsão financeira em uma plataforma única para operação pessoal e empresarial.
        </p>
        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
          <button
            type="button"
            onClick={onStart}
            className="group flex min-h-[60px] items-center gap-4 bg-paper px-7 font-mono text-sm font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-vermilion-light"
          >
            Escolher plano
            <ArrowRight size={20} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </button>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href="#pricing"
              className="inline-flex min-h-[44px] items-center text-base font-medium text-white underline decoration-dim/50 underline-offset-[7px] transition-colors hover:decoration-white"
            >
              Ver planos
            </a>
            <a
              href="#features"
              className="inline-flex min-h-[44px] items-center text-base font-medium text-dim underline decoration-desk-line underline-offset-[7px] transition-colors hover:text-white hover:decoration-white"
            >
              Ver funcionalidades
            </a>
          </div>
        </div>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-dim">
          30 dias grátis · Sem cartão de crédito necessário
        </p>
      </div>

      <div className="grid lg:col-span-5">
        <Tape />
      </div>
    </div>
  </section>
);
