import { ArrowRight } from 'lucide-react';
import { Reveal } from './Tape';
import { PLANS, formatCurrency, type PlanCode } from '../lib/plans';

const container = 'mx-auto max-w-[1320px] px-5 sm:px-8';
const h2 = 'font-display text-[2.75rem] font-black uppercase leading-[1.08] sm:text-[3.75rem] lg:text-[4.5rem]';

/* ---------- Content (copy preserved from the previous site) ---------- */

const OPERATION_STEPS = [
  {
    title: 'Estruture sua base',
    description:
      'Cadastre contas, cartões, pessoas e empresas para refletir sua realidade financeira pessoal ou empresarial.',
  },
  {
    title: 'Traga a movimentação',
    description:
      'Lance transações manualmente ou importe extratos para acelerar a entrada de dados com menos retrabalho.',
  },
  {
    title: 'Organize a rotina',
    description:
      'Gerencie contas a pagar, contas a receber, parcelas, transferências e conciliações para manter o financeiro em ordem.',
  },
  {
    title: 'Decida com contexto',
    description:
      'Use relatórios, alertas, previsão financeira e acompanhamento de dívidas para enxergar risco, caixa e próximos passos.',
  },
] as const;

const PLATFORM_PILLARS = [
  {
    title: 'Gestão Financeira Centralizada',
    description:
      'Dashboard com visão consolidada para PF e PJ, acompanhando contas, cartões, transações e indicadores em um único ambiente.',
  },
  {
    title: 'Rotina Operacional',
    description:
      'Controle contas a pagar e a receber, organize parcelas, registre transferências e acompanhe vencimentos com mais previsibilidade.',
  },
  {
    title: 'Importação e Conciliação',
    description:
      'Importe extratos em OFX e CSV, revise lançamentos, categorize movimentos e faça conciliação para manter os saldos coerentes.',
  },
  {
    title: 'PF e PJ no Mesmo Ecossistema',
    description:
      'Gerencie membros da família, contatos financeiros e múltiplos CNPJs com contexto separado e operação adequada para cada realidade.',
  },
  {
    title: 'Relatórios e Previsão',
    description:
      'Transforme a operação do dia a dia em leitura gerencial com relatórios, gráficos de comportamento e previsão financeira.',
  },
  {
    title: 'Camada Avançada de Operação',
    description:
      'Conte com módulo de dívidas, assistente com IA, notificações e preferências para apoiar decisões e organizar processos recorrentes.',
  },
] as const;

const DIFFERENTIALS = [
  'Multi-tenant com isolamento entre clientes',
  'Notificações e destinos pessoais configuráveis',
  'Backup e restauração para preservar histórico',
  'PWA com experiência próxima de app instalado',
  'Contas, cartões, despesas, receitas e transferências',
  'Controle de pessoas e empresas dentro do mesmo ambiente',
] as const;

/* ---------- Sections ---------- */

/** Names the problem (from the brief), strikes it out like a voided tape line. */
export const Manifesto = () => (
  <section className="relative on-paper bg-paper text-ink">
      <div aria-hidden="true" className="tape-serrate-b absolute -bottom-[6px] left-0 right-0 z-10 h-[14px] bg-paper" />
    <div className={`${container} py-24 lg:py-36`}>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-8">
          <h2 className="font-display text-[3rem] font-black uppercase leading-[1.08] sm:text-[4.25rem] lg:text-[5rem]">
            <span className="sr-only">Em vez de planilhas espalhadas e processos manuais, uma visão só, PF e PJ.</span>
            <span aria-hidden="true" className="block"><span className="void">Planilhas espalhadas.</span></span>
            <span aria-hidden="true" className="block"><span className="void">Processos manuais.</span></span>
            <span aria-hidden="true" className="block pt-4">Uma visão só, PF e PJ.</span>
          </h2>
        </Reveal>
        <Reveal delay={120} className="self-end lg:col-span-4">
          <p className="max-w-[26rem] text-lg leading-relaxed text-ink-mute">
            O OnliFin junta contas, cartões, contas a pagar e a receber, extratos e previsão em um só lugar, com
            contexto separado para pessoa física e para cada empresa.
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);

export const Steps = () => (
  <section id="operation" className="bg-desk">
    <div className={`${container} py-24 lg:py-36`}>
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <h2 className={`${h2} text-white`}>Uma rotina conectada, do lançamento à decisão.</h2>
              <p className="mt-6 max-w-[28rem] text-lg leading-relaxed text-dim">
                Cadastros, lançamentos, importações e conciliações viram leitura prática para decisão. Os módulos
                conversam entre si nesta ordem.
              </p>
            </Reveal>
          </div>
        </div>
        <ol className="border-t border-desk-line lg:col-span-7">
          {OPERATION_STEPS.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 60} className={`grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-4 border-b py-9 sm:grid-cols-[4.5rem_minmax(0,1fr)] ${index === 3 ? 'border-dashed border-dim/60' : 'border-desk-line'}`}>
              <span className="num pt-2 text-sm font-bold text-vermilion-light">0{index + 1}</span>
              <div>
                <h3 className="font-display text-4xl font-extrabold uppercase leading-[1.08] text-white sm:text-5xl">{step.title}</h3>
                <p className="mt-4 max-w-[34rem] text-[1.0625rem] leading-relaxed text-dim">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

/** Feature list as ledger rows: columns, rules, no cards. */
export const Features = () => (
  <section id="features" className="relative on-paper bg-paper text-ink">
      <div aria-hidden="true" className="tape-serrate-b absolute -bottom-[6px] left-0 right-0 z-10 h-[14px] bg-paper" />
    <div className={`${container} py-24 lg:py-36`}>
      <Reveal>
        <h2 className={`${h2} max-w-[16ch]`}>O que o OnliFin já entrega.</h2>
      </Reveal>
      <div className="mt-14 border-t-2 border-ink">
        <ol>
          {PLATFORM_PILLARS.map((pillar) => (
            <Reveal
              as="li"
              key={pillar.title}
              className="grid grid-cols-1 gap-y-3 border-b border-ink/25 py-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] md:gap-x-10"
            >
              <h3 className="font-display text-[2rem] font-extrabold uppercase leading-[1.08] sm:text-4xl">{pillar.title}</h3>
              <p className="max-w-[38rem] text-[1.0625rem] leading-relaxed text-ink-mute md:pt-1.5">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

const MGFF_DIMENSIONS = [
  {
    term: 'Custódia',
    text: 'De qual conta o dinheiro saiu, pessoal ou da empresa. Vem direto da conta ou do cartão de origem.',
  },
  {
    term: 'Propriedade econômica',
    text: 'A quem o gasto pertence de fato. A IA infere pela descrição do extrato, pelo seu histórico e pelas regras que você já corrigiu.',
  },
] as const;

/** Illustrative only: fictitious figures, labelled as such on the page. */
const BOUNDARY_EXAMPLE = [
  { what: 'Software da empresa, pago na conta pessoal', paid: 'PF', owner: 'PJ', delta: '+ R$ 480,00' },
  { what: 'Mensalidade pessoal, paga na conta da empresa', paid: 'PJ', owner: 'PF', delta: '− R$ 150,00' },
  { what: 'Fornecedor da empresa, pago na conta da empresa', paid: 'PJ', owner: 'PJ', delta: 'não cruza' },
] as const;

const MMF_PHASES = [
  {
    title: 'Acolhimento',
    description: 'Misturar contas no começo é normal. O acompanhamento é passivo: você vê o saldo de fronteira, sem sermão.',
  },
  {
    title: 'Estabilização',
    description: 'A mistura cai. O foco passa para conformidade e rotina, como manter um pró-labore fixo.',
  },
  {
    title: 'Fronteira zero',
    description: 'Contas separadas. Você escolhe o mentor da fase: Seu Arthur, com foco em conformidade, ou Dona Helena, com foco estratégico.',
  },
] as const;

/** The method behind the PF/PJ boundary: MGFF (ledger) and MMF (maturity). Desk ground, ledger rows, no cards. */
export const Metodo = () => (
  <section id="metodo" className="bg-desk">
    <div className={`${container} py-24 lg:py-36`}>
      <Reveal>
        <h2 className={`${h2} max-w-[18ch] text-white`}>O método por trás da fronteira PF/PJ.</h2>
        <p className="mt-6 max-w-[38rem] text-lg leading-relaxed text-dim">
          Despesa da empresa que sai da conta pessoal do sócio, e o contrário, acontece. Em vez de esconder esse
          cruzamento, o OnliFin registra, mostra quanto já passou de um lado para o outro e acompanha o quanto você
          evolui em separá-los. Disponível nas empresas cadastradas.
        </p>
      </Reveal>

      <div className="mt-20 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-vermilion-light">MGFF</p>
          <h3 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[1.08] text-white sm:text-5xl">
            Método de Gestão de Fronteiras Financeiras
          </h3>
          <dl className="mt-8 border-t border-desk-line">
            {MGFF_DIMENSIONS.map((d) => (
              <div key={d.term} className="border-b border-desk-line py-5">
                <dt className="font-mono text-sm font-bold uppercase tracking-[0.1em] text-white">{d.term}</dt>
                <dd className="mt-2 max-w-[30rem] text-[1.0625rem] leading-relaxed text-dim">{d.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-[30rem] text-[1.0625rem] leading-relaxed text-dim">
            Quando as duas divergem, a transação é de fronteira. Se a confiança da IA é baixa ou o valor é alto, ela
            fica pendente para você confirmar, e cada correção sua vira uma regra para as próximas.
          </p>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-7">
          <div className="border-t-2 border-white">
            <p className="flex items-baseline justify-between gap-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-dim">
              <span>Saldo de fronteira</span>
              <span>Exemplo ilustrativo, valores fictícios</span>
            </p>
            <ul className="border-t border-dashed border-dim/60">
              {BOUNDARY_EXAMPLE.map((row) => (
                <li
                  key={row.what}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 border-b border-desk-line py-4"
                >
                  <span className="text-[1.0625rem] leading-snug text-white">{row.what}</span>
                  <span className={`num whitespace-nowrap text-right text-base font-bold ${row.delta.startsWith('−') ? 'text-vermilion-light' : row.delta.startsWith('+') ? 'text-white' : 'text-dim'}`}>
                    {row.delta}
                  </span>
                  <span className="col-span-2 font-mono text-xs uppercase tracking-[0.1em] text-dim">
                    Saiu da conta {row.paid} · Pertence à {row.owner}
                  </span>
                </li>
              ))}
            </ul>
            <p className="flex items-baseline justify-between gap-4 border-t-2 border-white pt-4">
              <span className="font-mono text-sm font-bold uppercase tracking-[0.1em] text-white">= Saldo de fronteira</span>
              <span className="num whitespace-nowrap text-xl font-bold text-white sm:text-3xl">+ R$ 330,00</span>
            </p>
            <p className="mt-4 max-w-[34rem] text-[0.9375rem] leading-relaxed text-dim">
              Positivo: a pessoa física emprestou, no líquido, para a empresa. Negativo: a empresa emprestou para a
              pessoa física.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-24 grid grid-cols-1 gap-14 border-t border-desk-line pt-16 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-vermilion-light">MMF</p>
          <h3 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[1.08] text-white sm:text-5xl">
            Modelo de Maturidade de Fronteira
          </h3>
          <p className="mt-6 max-w-[30rem] text-[1.0625rem] leading-relaxed text-dim">
            A taxa de mistura mede quantas transações cruzam a fronteira sobre o total, numa janela móvel de 90 dias.
            Ela mostra em que fase a empresa está, e o assistente ajusta o tom da conversa a essa fase.
          </p>
          <p className="mt-4 max-w-[30rem] text-[1.0625rem] leading-relaxed text-white">
            Você decide quando avançar: a mudança de fase nunca é automática.
          </p>
        </Reveal>
        <ol className="border-t border-desk-line lg:col-span-7">
          {MMF_PHASES.map((phase, index) => (
            <Reveal
              as="li"
              key={phase.title}
              delay={index * 60}
              className={`grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-4 border-b py-8 sm:grid-cols-[4.5rem_minmax(0,1fr)] ${index === 2 ? 'border-dashed border-dim/60' : 'border-desk-line'}`}
            >
              <span className="num pt-2 text-sm font-bold text-vermilion-light">0{index + 1}</span>
              <div>
                <h4 className="font-display text-3xl font-extrabold uppercase leading-[1.08] text-white sm:text-4xl">{phase.title}</h4>
                <p className="mt-3 max-w-[34rem] text-[1.0625rem] leading-relaxed text-dim">{phase.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

const CONTEXT_LINES = {
  PF: ['Membros da família', 'Contatos financeiros', 'Contas, cartões e transações'],
  PJ: ['Múltiplos CNPJs', 'Contas a pagar e a receber', 'Contexto separado por empresa'],
} as const;

/** The differentiator: one system, contexts kept apart. Two columns, subtotalled. */
export const Contexts = () => (
  <section className="border-t border-desk-line bg-desk">
    <div className={`${container} py-24 lg:py-36`}>
      <Reveal>
        <h2 className={`${h2} max-w-[18ch] text-white`}>PF e PJ no mesmo ecossistema.</h2>
        <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-dim">
          Gerencie membros da família, contatos financeiros e múltiplos CNPJs com contexto separado e operação
          adequada para cada realidade.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 border-y border-desk-line md:grid-cols-2 md:divide-x md:divide-desk-line">
        {(Object.keys(CONTEXT_LINES) as Array<keyof typeof CONTEXT_LINES>).map((ctx, i) => (
          <Reveal key={ctx} delay={i * 80} className="py-10 md:px-10 md:first:pl-0 md:last:pr-0">
            <p className="font-display text-[6rem] font-black leading-[0.85] text-vermilion-light">{ctx}</p>
            <ul className="mt-8 divide-y divide-desk-line border-y border-desk-line">
              {CONTEXT_LINES[ctx].map((line) => (
                <li key={line} className="py-3 text-[1.0625rem] text-white">{line}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="mt-24 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <h3 className="font-display text-4xl font-extrabold uppercase leading-[1.08] text-white sm:text-5xl">O que sustenta a operação.</h3>
        </Reveal>
        <ul className="border-t border-desk-line lg:col-span-8 lg:grid lg:grid-cols-2 lg:gap-x-10">
          {DIFFERENTIALS.map((item, i) => (
            <Reveal as="li" key={item} delay={(i % 2) * 60} className="border-b border-desk-line py-4 text-[1.0625rem] leading-snug text-white">
              {item}
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export const Pricing = ({ onSelectPlan }: { onSelectPlan: (plan: PlanCode) => void }) => (
  <section id="pricing" className="relative on-paper bg-paper text-ink">
      <div aria-hidden="true" className="tape-serrate-b absolute -bottom-[6px] left-0 right-0 z-10 h-[14px] bg-paper" />
    <div className={`${container} py-24 lg:py-36`}>
      <Reveal className="max-w-[40rem]">
        <h2 className={h2}>Planos que acompanham você.</h2>
        <p className="mt-6 text-lg leading-relaxed text-ink-mute">
          Comece grátis por 30 dias e escolha o melhor para sua necessidade. Ciclos mensal, trimestral, anual e
          trienal, definidos no cadastro.
        </p>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-y-14 lg:grid-cols-3 lg:gap-y-0 lg:divide-x lg:divide-ink/25">
        {PLANS.map((plan, i) => (
          <Reveal key={plan.code} delay={i * 70} className="flex flex-col lg:px-9 lg:first:pl-0 lg:last:pr-0">
            <div className={`border-t-4 pt-4 ${plan.highlighted ? 'border-vermilion' : 'border-ink'}`}>
              <h3 className="font-display text-4xl font-extrabold uppercase leading-[1.05]">{plan.name}</h3>
              <p className="mt-2 text-base text-ink-mute">
                {plan.audience}
                {plan.highlighted && <span className="font-bold text-vermilion"> · Recomendado</span>}
              </p>
              <p className="num mt-8 text-[2.75rem] font-bold leading-none tracking-tight lg:text-[2.4rem] xl:text-[3.25rem]">
                {formatCurrency(plan.monthlyPriceBrl)}
                <span className="ml-1 text-base font-medium text-ink-mute">/mês</span>
              </p>
            </div>
            <ul className="mt-8 flex-1 divide-y divide-ink/15 border-y border-ink/15">
              {plan.features.map((feature) => (
                <li key={feature} className="py-2.5 text-[1rem] leading-snug">{feature}</li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onSelectPlan(plan.code)}
              className={[
                'mt-8 min-h-[56px] w-full px-4 font-mono text-sm font-bold uppercase tracking-[0.12em] transition-colors',
                plan.highlighted
                  ? 'bg-ink text-paper hover:bg-vermilion'
                  : 'border-2 border-ink text-ink hover:bg-ink hover:text-paper',
              ].join(' ')}
            >
              Começar Grátis
            </button>
          </Reveal>
        ))}
      </div>
      <p className="mt-14 max-w-[52rem] text-[0.9375rem] leading-relaxed text-ink-mute">
        Pessoas cadastradas representam membros da família ou contatos vinculados ao contexto financeiro. Assentos
        multiusuário ainda não fazem parte desta oferta comercial.
      </p>
    </div>
  </section>
);

export const About = () => (
  <section id="about" className="bg-desk">
    <div className={`${container} py-24 lg:py-36`}>
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7">
          <h2 className={`${h2} text-white`}>Uma base financeira única para quem precisa operar e evoluir.</h2>
          <p className="mt-8 max-w-[38rem] text-lg leading-relaxed text-dim">
            O OnliFin foi estruturado para unir operação financeira cotidiana, leitura gerencial e preparação para
            próximas camadas de integração. Hoje, a plataforma já entrega o núcleo operacional com importação,
            conciliação, análise, notificações e mobilidade via PWA.
          </p>
        </Reveal>
        <Reveal delay={100} className="self-end lg:col-span-5">
          <ul className="divide-y divide-desk-line border-y border-desk-line">
            {[
              'Plataforma SaaS com isolamento entre clientes e gestão por contexto.',
              'Operação válida para pessoa física, família, contatos financeiros e empresas.',
              'Preparada para evolução futura de integrações sem vender isso como recurso já ativo.',
            ].map((item) => (
              <li key={item} className="py-4 text-[1.0625rem] leading-snug text-white">{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  </section>
);

/** Closing line of the tape: the total, and the one action. */
export const Closing = ({ onStart }: { onStart: () => void }) => (
  <section className="on-paper bg-paper text-ink">
    <div className={`${container} py-24 lg:py-32`}>
      <Reveal>
        <div className="border-t-2 border-ink pt-8">
          <h2 className="rule-total inline-block text-balance font-display text-[3.25rem] font-black uppercase leading-[1.08] sm:text-[5rem] lg:text-[6rem]">
            = Comece grátis por 30 dias.
          </h2>
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <button
              type="button"
              onClick={onStart}
              className="group flex min-h-[60px] items-center gap-4 bg-ink px-7 font-mono text-sm font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:bg-vermilion"
            >
              Escolher plano
              <ArrowRight size={20} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </button>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-mute">Sem cartão de crédito necessário</p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
