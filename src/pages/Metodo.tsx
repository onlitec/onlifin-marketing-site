import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SignupModal } from '../components/SignupModal';
import { Reveal } from '../components/Tape';
import type { BillingCycle, PlanCode } from '../lib/plans';

const container = 'mx-auto max-w-[1320px] px-5 sm:px-8';
const h2 = 'font-display text-[2.5rem] font-black uppercase leading-[1.08] sm:text-[3.5rem] lg:text-[4rem]';
const h3 = 'font-display text-3xl font-extrabold uppercase leading-[1.08] sm:text-4xl';
const micro = 'font-mono text-xs font-bold uppercase tracking-[0.12em]';

const TOC = [
  { id: 'duas-perguntas', label: 'Duas perguntas' },
  { id: 'exemplo', label: 'Exemplo' },
  { id: 'classificacao', label: 'Classificação' },
  { id: 'controle', label: 'Você no controle' },
  { id: 'onde', label: 'Onde aparece' },
  { id: 'maturidade', label: 'Maturidade' },
  { id: 'duvidas', label: 'Dúvidas' },
] as const;

const DELTAS = [
  { case: 'Sócio paga gasto da empresa', paid: 'PF', owner: 'PJ', effect: '+ valor', note: 'A pessoa física financiou a empresa.' },
  { case: 'Empresa paga gasto pessoal', paid: 'PJ', owner: 'PF', effect: '− valor', note: 'A empresa financiou a pessoa física.' },
  { case: 'Cada gasto na sua conta', paid: 'igual', owner: 'igual', effect: '0', note: 'Não cruza a fronteira.' },
] as const;

const EXAMPLE = [
  { what: 'Software da empresa, pago na conta pessoal', paid: 'PF', owner: 'PJ', delta: '+ R$ 480,00', sign: 1 },
  { what: 'Mensalidade pessoal, paga na conta da empresa', paid: 'PJ', owner: 'PF', delta: '− R$ 150,00', sign: -1 },
  { what: 'Fornecedor da empresa, pago na conta da empresa', paid: 'PJ', owner: 'PJ', delta: 'não cruza', sign: 0 },
] as const;

const STEPS = [
  {
    title: 'Regras primeiro',
    text: 'Antes de qualquer IA, o OnliFin aplica as regras que você já ensinou e uma lista curta de termos quase inequívocos de empresa, como DAS, Simples Nacional, DARF, FGTS, pró-labore, honorários contábeis, tarifa PJ e maquininha.',
  },
  {
    title: 'A IA infere o que sobrou',
    text: 'O restante é analisado pela descrição do extrato e pelo seu histórico. Para cada transação, a IA diz a quem o gasto pertence e com que confiança.',
  },
  {
    title: 'A confiança decide a autonomia',
    text: 'Quanto maior a confiança, mais o sistema faz sozinho. Quanto menor, mais ele pergunta a você. Em caso de falha da IA, o padrão seguro é assumir que o dono é a conta usada e perguntar.',
  },
  {
    title: 'O cruzamento entra no saldo',
    text: 'Se o dono econômico difere da conta usada, a transação vira uma transação de fronteira e o Saldo de Fronteira é recalculado.',
  },
] as const;

const ZONES = [
  { zone: 'Automática', range: 'Confiança de 90 ou mais', does: 'Classifica sozinho. Acima de R$ 500, ainda exige um aceite seu.' },
  { zone: 'Sugestão', range: 'Confiança de 70 a 89', does: 'Sugere o dono e pede uma confirmação rápida.' },
  { zone: 'Pergunta', range: 'Confiança abaixo de 70', does: 'Pergunta a você, com opções: aporte, retirada, reembolso, pró-labore, despesa da empresa ou gasto pessoal.' },
] as const;

const CONTROL = [
  {
    title: 'Pendências ficam com você',
    text: 'Enquanto houver transação de fronteira aguardando confirmação, a importação do extrato fica bloqueada. Nada é assumido às escondidas.',
  },
  {
    title: 'Toda correção vira regra',
    text: 'Corrija um dono a qualquer momento: o saldo é recalculado na hora e a correção passa a valer como regra para as próximas transações parecidas. Sem re-treinar nada.',
  },
  {
    title: 'Lançamento manual',
    text: 'Um aporte de capital ou um reembolso pode ser lançado à mão, escolhendo o sentido (pessoa física para empresa, ou o contrário), as duas contas, o valor e a data.',
  },
  {
    title: 'Histórico que não se apaga',
    text: 'Cada movimento entre pessoa física e empresa fica registrado no histórico de cruzamentos, com data, direção, descrição e valor.',
  },
] as const;

const WHERE = [
  {
    title: 'Ao importar um extrato',
    text: 'Quando a conta escolhida é de uma empresa, a revisão ganha a coluna "Propriedade econômica". Itens seguros aparecem como informação; os que pedem atenção trazem um seletor PF/PJ com aviso.',
  },
  {
    title: 'Na tela Fronteira PF/PJ',
    text: 'Saldo de Fronteira, maturidade, classificações da IA com correção na própria linha, calibração e histórico de cruzamentos. Fica em Movimento, com uma empresa selecionada.',
  },
  {
    title: 'No assistente',
    text: 'Em uma empresa, o assistente conhece a fase de maturidade e o saldo de fronteira e ajusta o tom da conversa a eles.',
  },
] as const;

const PHASES = [
  {
    name: 'Acolhimento',
    ref: 'Cerca de 65% de mistura',
    persona: 'O Conciliador',
    text: 'Empático, sem sermão contábil. Misturar no começo é normal; o saldo e a fronteira aparecem de forma passiva.',
  },
  {
    name: 'Estabilização',
    ref: 'Cerca de 15% de mistura',
    persona: 'O Guardião',
    text: 'Pedagógico e atento à conformidade, com sugestões como manter um pró-labore fixo.',
  },
  {
    name: 'Fronteira zero',
    ref: 'Menos de 1% de mistura',
    persona: 'Seu Arthur ou Dona Helena',
    text: 'Você escolhe o mentor: Seu Arthur, contador clássico e protetor, com foco total em conformidade; ou Dona Helena, com foco estratégico em metas e investimento.',
  },
] as const;

const FAQ = [
  {
    q: 'A IA decide sozinha?',
    a: 'Só quando a confiança é alta e o valor é baixo. Confiança baixa ou valor acima de R$ 500 sempre passam por você.',
  },
  {
    q: 'E se a IA errar?',
    a: 'Você corrige na própria linha. O saldo é recalculado na hora e a correção vira uma regra para as próximas vezes.',
  },
  {
    q: 'A fase de maturidade muda sozinha?',
    a: 'Não. A taxa de mistura mostra onde a empresa está, mas avançar de fase exige o seu aceite explícito. O avanço é de uma fase por vez e não retrocede.',
  },
  {
    q: 'Como a taxa de mistura é calculada?',
    a: 'É a proporção de transações de fronteira sobre o total de transações, numa janela móvel de 90 dias.',
  },
  {
    q: 'Vale para quem só tem conta pessoal?',
    a: 'O método atua nas empresas cadastradas, que é onde existe uma fronteira entre pessoa física e pessoa jurídica.',
  },
  {
    q: 'Substitui meu contador?',
    a: 'Não. O OnliFin organiza e mostra o cruzamento entre as contas; decisões contábeis e jurídicas continuam com o seu contador.',
  },
] as const;

const Paper = ({ id, children }: { id?: string; children: ReactNode }) => (
  <section id={id} className="relative on-paper scroll-mt-20 bg-paper text-ink">
    <div aria-hidden="true" className="tape-serrate-b absolute -bottom-[6px] left-0 right-0 z-10 h-[14px] bg-paper" />
    <div className={`${container} py-20 lg:py-28`}>{children}</div>
  </section>
);

const Desk = ({ id, children }: { id?: string; children: ReactNode }) => (
  <section id={id} className="scroll-mt-20 bg-desk">
    <div className={`${container} py-20 lg:py-28`}>{children}</div>
  </section>
);

export default function MetodoPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanCode | null>(null);
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<BillingCycle>('yearly');
  const closeModal = useCallback(() => setModalOpen(false), []);
  const openPlanSelector = () => {
    setSelectedPlan(null);
    setModalOpen(true);
  };

  useEffect(() => {
    const previous = document.title;
    document.title = 'Método de Gestão de Fronteiras Financeiras | OnliFin';
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content') ?? '';
    meta?.setAttribute(
      'content',
      'Como o OnliFin separa e acompanha o dinheiro da pessoa física e da empresa: custódia, propriedade econômica, saldo de fronteira e maturidade.',
    );
    return () => {
      document.title = previous;
      meta?.setAttribute('content', prevDesc);
    };
  }, []);

  return (
    <div className="min-h-screen bg-desk font-text">
      <SignupModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedPlan={selectedPlan}
        selectedBillingCycle={selectedBillingCycle}
        onSelectPlan={setSelectedPlan}
        onSelectBillingCycle={setSelectedBillingCycle}
      />
      <Header onStart={openPlanSelector} home={false} />
      <main>
        {/* Hero */}
        <Desk>
          <a
            href="/"
            className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-dim transition-colors hover:text-white"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Voltar ao site
          </a>
          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <h1 className="font-display text-[3rem] font-black uppercase leading-[1.05] text-white sm:text-[4.5rem] lg:text-[6rem]">
                Método de Gestão de Fronteiras Financeiras
              </h1>
              <p className="mt-8 max-w-[38rem] text-lg leading-relaxed text-dim">
                Despesa da empresa que sai da conta pessoal do sócio, e o contrário, acontece em quase toda pequena
                empresa. O método, o MGFF, não finge que isso não existe: registra cada cruzamento, mostra quanto já
                passou de um lado para o outro e acompanha a evolução até as contas ficarem separadas.
              </p>
              <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                <button
                  type="button"
                  onClick={openPlanSelector}
                  className="group flex min-h-[56px] items-center gap-4 bg-paper px-6 font-mono text-sm font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-vermilion-light"
                >
                  Começar grátis
                  <ArrowRight size={20} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </button>
                <p className={`${micro} font-medium text-dim`}>30 dias · sem cartão de crédito</p>
              </div>
            </div>
            <nav aria-label="Neste guia" className="self-end lg:col-span-4">
              <p className={`${micro} mb-3 text-dim`}>Neste guia</p>
              <ol className="border-t border-desk-line">
                {TOC.map((item) => (
                  <li key={item.id} className="border-b border-desk-line">
                    <a
                      href={`#${item.id}`}
                      className="flex min-h-[44px] items-center text-[1.0625rem] text-white transition-colors hover:text-vermilion-light"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </Desk>

        {/* Duas perguntas */}
        <Paper id="duas-perguntas">
          <Reveal>
            <h2 className={`${h2} max-w-[16ch]`}>Duas perguntas para cada transação.</h2>
            <p className="mt-6 max-w-[38rem] text-lg leading-relaxed text-ink-mute">
              Uma conta paga o gasto, mas nem sempre o gasto é dela. O método separa as duas coisas em vez de
              tratá-las como uma só.
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 border-t-2 border-ink md:grid-cols-2 md:divide-x md:divide-ink/25">
            <Reveal className="py-8 md:pr-10">
              <h3 className={h3}>Custódia</h3>
              <p className="mt-2 font-mono text-sm uppercase tracking-[0.1em] text-vermilion">De onde saiu o dinheiro?</p>
              <p className="mt-4 max-w-[30rem] text-[1.0625rem] leading-relaxed text-ink-mute">
                É a conta ou o cartão usado, pessoal ou da empresa. Não há palpite: vem direto da conta de origem.
              </p>
            </Reveal>
            <Reveal delay={80} className="border-t border-ink/25 py-8 md:border-t-0 md:pl-10">
              <h3 className={h3}>Propriedade econômica</h3>
              <p className="mt-2 font-mono text-sm uppercase tracking-[0.1em] text-vermilion">A quem o gasto pertence?</p>
              <p className="mt-4 max-w-[30rem] text-[1.0625rem] leading-relaxed text-ink-mute">
                É de quem é, de fato, a despesa ou a receita, independente da conta que pagou. Não dá para ler no
                extrato: é inferida pela IA e confirmada por você quando necessário.
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-16">
            <h3 className={h3}>Quando as duas divergem, cruza a fronteira.</h3>
            <div className="mt-8 border-t-2 border-ink">
              <div className={`hidden grid-cols-[1.4fr_0.6fr_0.6fr_0.7fr_1.4fr] gap-x-6 border-b border-ink/25 py-3 md:grid ${micro} font-medium text-ink-mute`}>
                <span>Situação</span><span>Saiu da conta</span><span>Pertence a</span><span className="text-right">No saldo</span><span>Significa</span>
              </div>
              <ul>
                {DELTAS.map((row) => (
                  <li key={row.case} className="grid grid-cols-2 gap-x-6 gap-y-1 border-b border-ink/25 py-5 md:grid-cols-[1.4fr_0.6fr_0.6fr_0.7fr_1.4fr] md:items-baseline">
                    <span className="col-span-2 text-[1.0625rem] font-bold md:col-span-1">{row.case}</span>
                    <span className="flex flex-col gap-0.5 text-[1rem]"><span className={`${micro} font-medium text-ink-mute md:hidden`}>Saiu da conta</span>{row.paid}</span>
                    <span className="flex flex-col gap-0.5 text-[1rem]"><span className={`${micro} font-medium text-ink-mute md:hidden`}>Pertence a</span>{row.owner}</span>
                    <span className="num col-span-2 mt-2 flex flex-col gap-0.5 whitespace-nowrap text-base font-bold md:col-span-1 md:mt-0 md:text-right"><span className={`${micro} font-medium text-ink-mute md:hidden`}>No saldo</span>{row.effect}</span>
                    <span className="col-span-2 text-[1rem] text-ink-mute md:col-span-1">{row.note}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 max-w-[40rem] text-[1.0625rem] leading-relaxed text-ink-mute">
              O <strong className="text-ink">Saldo de Fronteira</strong> é a soma de todos esses efeitos. Positivo:
              a pessoa física emprestou, no líquido, para a empresa. Negativo: a empresa emprestou para a pessoa
              física.
            </p>
          </Reveal>
        </Paper>

        {/* Exemplo */}
        <Desk id="exemplo">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <h2 className={`${h2} text-white`}>Um mês, numa fita só.</h2>
              <p className="mt-6 max-w-[28rem] text-lg leading-relaxed text-dim">
                Três lançamentos e o que cada um faz com o saldo. Os valores são fictícios, só para mostrar a conta.
              </p>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-7">
              <div className="border-t-2 border-white">
                <p className="flex items-baseline justify-between gap-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-dim">
                  <span>Saldo de fronteira</span>
                  <span>Exemplo ilustrativo</span>
                </p>
                <ul className="border-t border-dashed border-dim/60">
                  {EXAMPLE.map((row) => (
                    <li key={row.what} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 border-b border-desk-line py-4">
                      <span className="text-[1.0625rem] leading-snug text-white">{row.what}</span>
                      <span className={`num whitespace-nowrap text-right text-base font-bold ${row.sign < 0 ? 'text-vermilion-light' : row.sign > 0 ? 'text-white' : 'text-dim'}`}>{row.delta}</span>
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
                  480 menos 150: a pessoa física emprestou R$ 330,00 para a empresa neste período.
                </p>
              </div>
            </Reveal>
          </div>
        </Desk>

        {/* Classificação */}
        <Paper id="classificacao">
          <Reveal>
            <h2 className={`${h2} max-w-[18ch]`}>Como cada transação é classificada.</h2>
            <p className="mt-6 max-w-[38rem] text-lg leading-relaxed text-ink-mute">
              Vale para as transações de contas de empresa, na importação de extratos e na tela de fronteira.
            </p>
          </Reveal>
          <ol className="mt-14 border-t-2 border-ink">
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.title} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 border-b border-ink/25 py-8 md:grid-cols-[4.5rem_minmax(0,0.85fr)_minmax(0,1.3fr)] md:gap-x-8">
                <span className="num pt-1.5 text-sm font-bold text-vermilion">0{i + 1}</span>
                <h3 className={`${h3} col-start-2 md:col-start-2`}>{step.title}</h3>
                <p className="col-start-2 mt-3 max-w-[36rem] text-[1.0625rem] leading-relaxed text-ink-mute md:col-start-3 md:mt-1.5">{step.text}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-20">
            <h3 className={h3}>Três zonas de confiança.</h3>
            <ul className="mt-8 border-t-2 border-ink">
              {ZONES.map((z) => (
                <li key={z.zone} className="grid grid-cols-1 gap-y-2 border-b border-ink/25 py-6 md:grid-cols-[0.8fr_1fr_2fr] md:gap-x-8">
                  <span className="font-display text-3xl font-extrabold uppercase leading-none">{z.zone}</span>
                  <span className="num text-sm font-bold md:pt-1.5">{z.range}</span>
                  <span className="max-w-[34rem] text-[1.0625rem] leading-relaxed text-ink-mute md:pt-0.5">{z.does}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Paper>

        {/* Controle */}
        <Desk id="controle">
          <Reveal>
            <h2 className={`${h2} max-w-[16ch] text-white`}>A última palavra é sua.</h2>
          </Reveal>
          <ul className="mt-14 border-t border-desk-line md:grid md:grid-cols-2 md:gap-x-12">
            {CONTROL.map((item, i) => (
              <Reveal as="li" key={item.title} delay={(i % 2) * 60} className="border-b border-desk-line py-8">
                <h3 className={`${h3} text-white`}>{item.title}</h3>
                <p className="mt-3 max-w-[30rem] text-[1.0625rem] leading-relaxed text-dim">{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </Desk>

        {/* Onde aparece */}
        <Paper id="onde">
          <Reveal>
            <h2 className={`${h2} max-w-[16ch]`}>Onde o método aparece.</h2>
          </Reveal>
          <ul className="mt-14 border-t-2 border-ink">
            {WHERE.map((item) => (
              <Reveal as="li" key={item.title} className="grid grid-cols-1 gap-y-3 border-b border-ink/25 py-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] md:gap-x-10">
                <h3 className={h3}>{item.title}</h3>
                <p className="max-w-[38rem] text-[1.0625rem] leading-relaxed text-ink-mute md:pt-1.5">{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </Paper>

        {/* MMF */}
        <Desk id="maturidade">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <h2 className={`${h2} text-white`}>Maturidade de fronteira.</h2>
              <p className="mt-6 max-w-[30rem] text-lg leading-relaxed text-dim">
                O MMF, Modelo de Maturidade de Fronteira, acompanha quanto a empresa ainda mistura as contas. A
                taxa de mistura é a proporção de transações de fronteira sobre o total, numa janela móvel de 90 dias.
              </p>
              <p className="mt-5 max-w-[30rem] text-lg leading-relaxed text-white">
                A fase só muda quando você aceita. O avanço é de uma fase por vez, nunca automático e nunca de volta.
              </p>
            </Reveal>
            <ol className="border-t border-desk-line lg:col-span-7">
              {PHASES.map((p, i) => (
                <Reveal as="li" key={p.name} delay={i * 60} className={`border-b py-8 ${i === 2 ? 'border-dashed border-dim/60' : 'border-desk-line'}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className={`${h3} text-white`}>{p.name}</h3>
                    <span className="num text-sm font-bold text-vermilion-light">{p.ref}</span>
                  </div>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-dim">{p.persona}</p>
                  <p className="mt-3 max-w-[36rem] text-[1.0625rem] leading-relaxed text-dim">{p.text}</p>
                </Reveal>
              ))}
              <li className="list-none pt-4 text-[0.9375rem] leading-relaxed text-dim">
                Os percentuais são a mistura de referência de cada fase no modelo, não uma meta imposta.
              </li>
            </ol>
          </div>
        </Desk>

        {/* Dúvidas */}
        <Paper id="duvidas">
          <Reveal>
            <h2 className={`${h2} max-w-[16ch]`}>Dúvidas frequentes.</h2>
          </Reveal>
          <div className="mt-14 border-t-2 border-ink lg:max-w-[52rem]">
            {FAQ.map((item) => (
              <details key={item.q} className="group border-b border-ink/25">
                <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-4 text-[1.25rem] font-bold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span aria-hidden="true" className="num text-2xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-[40rem] pb-6 text-[1.0625rem] leading-relaxed text-ink-mute">{item.a}</p>
              </details>
            ))}
          </div>
        </Paper>

        {/* Fechamento */}
        <Desk>
          <Reveal>
            <div className="border-t-2 border-white pt-8">
              <h2 className="rule-total inline-block text-balance font-display text-[3rem] font-black uppercase leading-[1.08] text-white sm:text-[4.5rem] lg:text-[5.5rem]">
                = Fronteira à vista.
              </h2>
              <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                <button
                  type="button"
                  onClick={openPlanSelector}
                  className="group flex min-h-[60px] items-center gap-4 bg-paper px-7 font-mono text-sm font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-vermilion-light"
                >
                  Escolher plano
                  <ArrowRight size={20} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </button>
                <p className={`${micro} font-medium text-dim`}>Sem cartão de crédito necessário</p>
              </div>
            </div>
          </Reveal>
        </Desk>
      </main>
      <Footer />
    </div>
  );
}
