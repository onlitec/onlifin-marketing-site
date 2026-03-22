import {
  ArrowRight,
  ArrowLeftRight,
  BellRing,
  BrainCircuit,
  Building2,
  CalendarCheck2,
  DatabaseBackup,
  LayoutDashboard,
  LineChart,
  Loader2,
  ShieldCheck,
  Smartphone,
  Users,
  WalletCards,
  X,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

const PLAN_DISPLAY_NAMES: Record<string, string> = {
  basic: 'Básico',
  medium: 'Intermediário',
  full: 'Completo',
};

declare global {
  interface Window {
    __ONLIFIN_PLATFORM_BASE_URL__?: string;
  }
}

const PLANS = [
  {
    code: 'basic',
    audience: 'Pessoa Física',
    name: 'Plano Básico',
    price: 'R$ 29',
    priceSuffix: '/mês',
    highlighted: false,
    dark: false,
    buttonClassName:
      'w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all',
    features: [
      '1 titular',
      'Até 1 pessoa cadastrada',
      'Até 1 CNPJ',
      'Contas, cartões e transações',
      'Importação de extratos',
      'Relatórios essenciais',
    ],
  },
  {
    code: 'medium',
    audience: 'Pequeno Negócio',
    name: 'Plano Intermediário',
    price: 'R$ 79',
    priceSuffix: '/mês',
    highlighted: true,
    dark: false,
    buttonClassName:
      'w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200',
    features: [
      '1 titular',
      'Até 2 pessoas cadastradas',
      'Até 2 CNPJs',
      'Módulo de dívidas',
      'Conciliação e importação de extratos',
      'Relatórios avançados e previsão financeira',
    ],
  },
  {
    code: 'full',
    audience: 'Operação Estruturada',
    name: 'Plano Completo',
    price: 'R$ 199',
    priceSuffix: '/mês',
    highlighted: false,
    dark: true,
    buttonClassName:
      'w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all',
    features: [
      '1 titular',
      'Até 10 pessoas cadastradas',
      'Até 10 CNPJs',
      'Tudo do Intermediário',
      'Suporte prioritário',
      'Preparado para futuras integrações bancárias',
    ],
  },
] as const;

const PLATFORM_PILLARS = [
  {
    icon: LayoutDashboard,
    iconClassName: 'bg-blue-50 text-blue-600',
    title: 'Gestão Financeira Centralizada',
    description:
      'Dashboard com visão consolidada para PF e PJ, acompanhando contas, cartões, transações e indicadores em um único ambiente.',
  },
  {
    icon: CalendarCheck2,
    iconClassName: 'bg-emerald-50 text-emerald-600',
    title: 'Rotina Operacional',
    description:
      'Controle contas a pagar e a receber, organize parcelas, registre transferências e acompanhe vencimentos com mais previsibilidade.',
  },
  {
    icon: Zap,
    iconClassName: 'bg-amber-50 text-amber-600',
    title: 'Importação e Conciliação',
    description:
      'Importe extratos em OFX e CSV, revise lançamentos, categorize movimentos e faça conciliação para manter os saldos coerentes.',
  },
  {
    icon: Building2,
    iconClassName: 'bg-indigo-50 text-indigo-600',
    title: 'PF e PJ no Mesmo Ecossistema',
    description:
      'Gerencie membros da família, contatos financeiros e múltiplos CNPJs com contexto separado e operação adequada para cada realidade.',
  },
  {
    icon: LineChart,
    iconClassName: 'bg-rose-50 text-rose-600',
    title: 'Relatórios e Previsão',
    description:
      'Transforme a operação do dia a dia em leitura gerencial com relatórios, gráficos de comportamento e previsão financeira.',
  },
  {
    icon: BrainCircuit,
    iconClassName: 'bg-cyan-50 text-cyan-700',
    title: 'Camada Avançada de Operação',
    description:
      'Conte com módulo de dívidas, assistente com IA, notificações e preferências para apoiar decisões e organizar processos recorrentes.',
  },
] as const;

const OPERATION_STEPS = [
  {
    title: '1. Estruture sua base',
    description:
      'Cadastre contas, cartões, pessoas e empresas para refletir sua realidade financeira pessoal ou empresarial.',
  },
  {
    title: '2. Traga a movimentação',
    description:
      'Lance transações manualmente ou importe extratos para acelerar a entrada de dados com menos retrabalho.',
  },
  {
    title: '3. Organize a rotina',
    description:
      'Gerencie contas a pagar, contas a receber, parcelas, transferências e conciliações para manter o financeiro em ordem.',
  },
  {
    title: '4. Decida com contexto',
    description:
      'Use relatórios, alertas, previsão financeira e acompanhamento de dívidas para enxergar risco, caixa e próximos passos.',
  },
] as const;

const DIFFERENTIALS = [
  {
    icon: ShieldCheck,
    title: 'Multi-tenant com isolamento entre clientes',
  },
  {
    icon: BellRing,
    title: 'Notificações e destinos pessoais configuráveis',
  },
  {
    icon: DatabaseBackup,
    title: 'Backup e restauração para preservar histórico',
  },
  {
    icon: Smartphone,
    title: 'PWA com experiência próxima de app instalado',
  },
  {
    icon: WalletCards,
    title: 'Contas, cartões, despesas, receitas e transferências',
  },
  {
    icon: Users,
    title: 'Controle de pessoas e empresas dentro do mesmo ambiente',
  },
] as const;

const normalizeBaseUrl = (value?: string | null) => {
  const nextValue = value?.trim();
  if (!nextValue) return null;
  return nextValue.replace(/\/+$/, '');
};

const getPlatformBaseUrl = () => {
  const runtimeConfiguredBaseUrl = normalizeBaseUrl(window.__ONLIFIN_PLATFORM_BASE_URL__);
  if (runtimeConfiguredBaseUrl) {
    return runtimeConfiguredBaseUrl;
  }

  const buildConfiguredBaseUrl = normalizeBaseUrl(import.meta.env.VITE_PLATFORM_BASE_URL);
  if (buildConfiguredBaseUrl) {
    return buildConfiguredBaseUrl;
  }

  const url = new URL(window.location.origin);
  if (url.port === '80' || url.port === '') {
    url.port = '8081';
  }
  return url.origin;
};

const normalizeRpcText = (value: string) => value.replace(/^"/, '').replace(/"$/, '').trim();

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const SignupModal = ({ isOpen, onClose, selectedPlan, onSelectPlan }: { isOpen: boolean, onClose: () => void, selectedPlan: string | null, onSelectPlan: (plan: string) => void }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  if (!selectedPlan) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
        <div className="bg-white rounded-[2.5rem] w-full max-w-5xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300 p-8 md:p-10">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={24} className="text-slate-400" />
          </button>

          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Escolha seu plano</h2>
            <p className="text-slate-500 font-medium mt-2">
              Selecione a opção mais adequada antes de iniciar seu teste grátis de 30 dias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.code}
                className={[
                  'rounded-[2rem] border p-8 flex flex-col',
                  plan.dark ? 'bg-slate-900 text-white' : 'bg-white',
                  plan.highlighted ? 'border-2 border-blue-600 shadow-2xl shadow-blue-100' : 'border-slate-100 shadow-sm',
                ].join(' ')}
              >
                <span className={`text-xs font-black uppercase tracking-widest mb-2 ${plan.dark ? 'text-blue-400' : plan.highlighted ? 'text-blue-600' : 'text-slate-400'}`}>
                  {plan.audience}
                </span>
                <h3 className={`text-2xl font-black mb-4 ${plan.dark ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                <div className={`text-4xl font-black mb-6 ${plan.dark ? 'text-white' : 'text-slate-900'}`}>
                  {plan.price}
                  <span className={`text-base ml-1 ${plan.dark ? 'text-slate-500' : 'text-slate-400'}`}>{plan.priceSuffix}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className={`text-sm font-bold ${plan.dark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onSelectPlan(plan.code)}
                  className={plan.buttonClassName}
                >
                  Selecionar {PLAN_DISPLAY_NAMES[plan.code]}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const defaultCompanyName = `Meu Espaço - ${formData.name}`;
      const defaultSlug = formData.name.toLowerCase().replace(/\s+/g, '-');

      const resp = await fetch('/api/rpc/signup_tenant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          p_email: formData.email,
          p_password: formData.password,
          p_full_name: formData.name,
          p_tenant_name: defaultCompanyName,
          p_slug: defaultSlug,
          p_plan_code: selectedPlan,
          p_plan: selectedPlan
        })
      });
      const data = await resp.json();
      if (data.success) {
        const loginResp = await fetch('/api/rpc/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            p_email: formData.email,
            p_password: formData.password
          })
        });

        if (loginResp.ok) {
          const token = normalizeRpcText(await loginResp.text());
          window.location.href = `${getPlatformBaseUrl()}/login?signup=1&plan=${encodeURIComponent(selectedPlan)}&email=${encodeURIComponent(formData.email)}#token=${encodeURIComponent(token)}`;
          return;
        }

        window.location.href = `${getPlatformBaseUrl()}/login?signup=1&plan=${encodeURIComponent(selectedPlan)}&email=${encodeURIComponent(formData.email)}`;
      } else {
        alert(data.message || "Erro no cadastro. Tente novamente.");
      }
    } catch (err) {
      alert("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors">
          <X size={24} className="text-slate-400" />
        </button>
        
        <div className="p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Criar sua conta</h2>
            <p className="text-slate-500 font-medium mt-2">Plano selecionado: <span className="text-blue-600 uppercase font-black">{PLAN_DISPLAY_NAMES[selectedPlan] || selectedPlan}</span></p>
            <p className="text-xs text-slate-400 mt-1">Inicie seu teste grátis de 30 dias agora mesmo.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Nome Completo</label>
              <input 
                required
                type="text" 
                placeholder="Ex: Alessandro Silva"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none font-medium"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">E-mail</label>
                <input 
                  required
                  type="email" 
                  placeholder="seu@email.com"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none font-medium"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Senha</label>
                <input 
                  required
                  type="password" 
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none font-medium"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Finalizar Cadastro & Acessar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const openSignup = (plan: string) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const openPlanSelector = () => {
    setSelectedPlan(null);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-600">
      <SignupModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
        onSelectPlan={setSelectedPlan}
      />
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-2xl font-black text-slate-800 tracking-tighter">Onli<span className="text-blue-600">Fin</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Funcionalidades</a>
            <a href="#operation" className="hover:text-blue-600 transition-colors">Como Funciona</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Planos</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">Sobre</a>
          </div>
          <a 
            href={`${getPlatformBaseUrl()}/pf`}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg active:scale-95"
          >
            Acessar Plataforma
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.3fr)_minmax(360px,0.7fr)] gap-12 items-center">
            <div className="text-center xl:text-left">
              <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                Gestão Financeira Inteligente
              </div>
              <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-8">
                Controle PF e PJ <br />
                <span className="text-blue-600">sem perder contexto.</span>
              </h1>
              <p className="max-w-3xl mx-auto xl:mx-0 text-xl text-slate-500 font-medium leading-relaxed mb-8">
                O OnliFin organiza contas, cartões, transações, contas a pagar e a receber, importação de extratos,
                conciliação, relatórios e previsão financeira em uma plataforma única para operação pessoal e empresarial.
              </p>
              <div className="flex flex-col sm:flex-row items-center xl:items-start justify-center xl:justify-start gap-4 mb-8">
                <button
                  onClick={openPlanSelector}
                  className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 flex items-center gap-2"
                >
                  Escolher Plano <ArrowRight size={20} />
                </button>
                <a
                  href="#features"
                  className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-lg border border-slate-200 hover:border-slate-300 transition-all shadow-sm"
                >
                  Ver funcionalidades
                </a>
              </div>
              <div className="flex flex-wrap gap-3 justify-center xl:justify-start">
                {[
                  'Importação OFX e CSV',
                  'Conciliação bancária',
                  'Contas a pagar e receber',
                  'Previsão financeira',
                  'Gestão de dívidas',
                  'PWA instalável',
                ].map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-bold"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter mt-6">
                Sem cartão de crédito necessário
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-cyan-50 to-white blur-3xl opacity-80" />
              <div className="relative rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/60 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Operação em foco</p>
                    <h2 className="text-2xl font-black text-slate-900 mt-1">Da rotina ao planejamento</h2>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-widest">
                    Plataforma ativa
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Movimentação</p>
                      <p className="text-lg font-black text-slate-900">Receitas, despesas e transferências</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Cobertura</p>
                      <p className="text-lg font-black text-slate-900">PF, família, contatos e CNPJs</p>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-slate-900 text-white p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <ArrowLeftRight className="text-blue-400" size={20} />
                      <p className="text-sm font-black uppercase tracking-widest text-slate-400">
                        Fluxo operacional validado
                      </p>
                    </div>
                    <ul className="space-y-3 text-sm font-medium text-slate-300">
                      <li>Importe extratos, revise categorias e reduza entrada manual.</li>
                      <li>Concilie saldos, acompanhe vencimentos e monitore parcelas.</li>
                      <li>Use relatórios e previsão financeira para antecipar decisões.</li>
                    </ul>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {['Contas', 'Cartões', 'Dívidas'].map((item) => (
                      <div key={item} className="rounded-2xl border border-slate-100 px-4 py-3 text-center">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{item}</p>
                        <p className="text-sm font-bold text-slate-700">Gerenciamento contínuo</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-4">Funcionalidades reais da plataforma</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-5">
              O site agora comunica o que o produto já entrega no dia a dia.
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Em vez de uma promessa genérica, a landing passa a mostrar os blocos operacionais já existentes no OnliFin:
              gestão centralizada, rotina financeira, importação, conciliação, análise e recursos avançados.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {PLATFORM_PILLARS.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <Card key={pillar.title}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${pillar.iconClassName}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{pillar.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {pillar.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="operation" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-12 items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-4">Como funciona</p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-5">
                Uma rotina financeira conectada do operacional à visão gerencial.
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                A proposta do OnliFin é simples: transformar cadastros, lançamentos, importações e conciliações em leitura
                prática para decisão. O fluxo abaixo resume como os módulos conversam entre si.
              </p>
            </div>
            <div className="space-y-5">
              {OPERATION_STEPS.map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-5 rounded-[2rem] border border-slate-100 bg-slate-50 p-6"
                >
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-sm font-black">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[2.5rem] bg-slate-900 text-white p-8 md:p-12">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-400 mb-4">Diferenciais operacionais</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-5">
                Recursos que fortalecem a operação sem mexer no que já funciona comercialmente.
              </h2>
              <p className="text-slate-300 text-lg font-medium leading-relaxed">
                Além do núcleo financeiro, a plataforma já conta com recursos de sustentação e escala para dar mais segurança,
                continuidade e mobilidade à rotina.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {DIFFERENTIALS.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-6"
                  >
                    <Icon className="text-blue-400 mb-4" size={22} />
                    <p className="text-base font-bold text-white leading-relaxed">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">Planos que acompanham você</h2>
            <p className="text-slate-500 font-medium text-lg">Comece grátis por 30 dias e escolha o melhor para sua necessidade.</p>
            <p className="text-slate-400 font-medium mt-3">
              Cadastro, limites comerciais e valores foram preservados como estão hoje.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PLANS.map((plan) => (
              <div
                key={plan.code}
                className={[
                  'p-8 rounded-[2.5rem] flex flex-col relative overflow-hidden',
                  plan.dark
                    ? 'bg-slate-900 text-white'
                    : 'bg-white',
                  plan.highlighted
                    ? 'border-2 border-blue-600 shadow-2xl shadow-blue-100 scale-105 z-10'
                    : 'border border-slate-100',
                ].join(' ')}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest">
                    Recomendado
                  </div>
                )}
                <span className={`text-xs font-black uppercase tracking-widest mb-2 ${plan.dark ? 'text-blue-400' : plan.highlighted ? 'text-blue-600' : 'text-slate-400'}`}>
                  {plan.audience}
                </span>
                <h4 className={`text-3xl font-black mb-4 ${plan.dark ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h4>
                <div className={`text-5xl font-black mb-8 ${plan.dark ? 'text-white' : 'text-slate-900'}`}>
                  {plan.price}
                  <span className={`text-lg ${plan.dark ? 'text-slate-500' : 'text-slate-400'}`}>{plan.priceSuffix}</span>
                </div>
                <ul className="space-y-4 mb-12 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center gap-3 text-sm font-bold ${plan.dark ? 'text-slate-300' : 'text-slate-600'}`}
                    >
                      <ShieldCheck className={plan.dark ? 'text-blue-400' : 'text-blue-600'} size={18} /> {feature}
                    </li>
                  ))}
                </ul>
                <button onClick={() => openSignup(plan.code)} className={plan.buttonClassName}>
                  Começar Grátis
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 font-medium mt-8">
            Pessoas cadastradas representam membros da família ou contatos vinculados ao contexto financeiro. Assentos multiusuário ainda não fazem parte desta oferta comercial.
          </p>
        </div>
      </section>

      <section id="about" className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] gap-10 items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-4">Sobre o OnliFin</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-5">
              Uma base financeira única para quem precisa operar e evoluir.
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              O OnliFin foi estruturado para unir operação financeira cotidiana, leitura gerencial e preparação para próximas
              camadas de integração. Hoje, a plataforma já entrega o núcleo operacional com importação, conciliação, análise,
              notificações e mobilidade via PWA.
            </p>
          </div>
          <div className="rounded-[2rem] bg-white border border-slate-200 p-8 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Posicionamento atual</p>
            <ul className="space-y-4">
              <li className="text-slate-700 font-medium leading-relaxed">
                Plataforma SaaS com isolamento entre clientes e gestão por contexto.
              </li>
              <li className="text-slate-700 font-medium leading-relaxed">
                Operação válida para pessoa física, família, contatos financeiros e empresas.
              </li>
              <li className="text-slate-700 font-medium leading-relaxed">
                Preparada para evolução futura de integrações sem vender isso como recurso já ativo.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 grayscale opacity-50">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tighter">OnliFin</span>
          </div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            © 2026 OnliFin SaaS. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
