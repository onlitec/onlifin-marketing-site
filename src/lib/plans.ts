// Plan data and pricing helpers. Moved verbatim from the previous App.tsx
// (which inlined shared/plans for the standalone environment).
export type PlanCode = 'basic' | 'medium' | 'full';
export type BillingCycle = 'monthly' | 'quarterly' | 'yearly' | 'triennial';

export const PLAN_DISPLAY_NAMES: Record<PlanCode, string> = {
  basic: 'Básico',
  medium: 'Intermediário',
  full: 'Completo',
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const BILLING_CYCLE_DEFINITIONS: Record<string, any> = {
  monthly: { code: 'monthly', label: 'Mensal', months: 1 },
  quarterly: { code: 'quarterly', label: 'Trimestral', months: 3 },
  yearly: { code: 'yearly', label: 'Anual', months: 12 },
  triennial: { code: 'triennial', label: 'Trienal', months: 36 },
};

export const PLAN_DEFINITIONS: Record<string, any> = {
  basic: {
    code: 'basic',
    name: 'Plano Básico',
    audience: 'Pessoa Física',
    monthlyPriceBrl: 29,
    marketing: {
      highlights: ['Operação essencial', 'Importação de extratos'],
      features: [
        '1 titular',
        'Até 1 pessoa cadastrada',
        'Até 1 CNPJ',
        'Contas, cartões e transações',
        'Importação de extratos',
        'Relatórios essenciais',
      ],
    },
  },
  medium: {
    code: 'medium',
    name: 'Plano Intermediário',
    audience: 'Pequeno Negócio',
    monthlyPriceBrl: 79,
    marketing: {
      highlights: ['Dívidas', 'Conciliação bancária', 'Previsão financeira'],
      features: [
        '1 titular',
        'Até 2 pessoas cadastradas',
        'Até 2 CNPJs',
        'Módulo de dívidas',
        'Conciliação bancária',
        'Relatórios avançados',
        'Previsão financeira',
      ],
    },
  },
  full: {
    code: 'full',
    name: 'Plano Completo',
    audience: 'Operação Estruturada',
    monthlyPriceBrl: 199,
    marketing: {
      highlights: ['Suporte prioritário', 'Integrações bancárias futuras'],
      features: [
        '1 titular',
        'Até 10 pessoas cadastradas',
        'Até 10 CNPJs',
        'Tudo do Intermediário',
        'Suporte prioritário',
        'Integrações bancárias futuras',
      ],
    },
  },
};

export const getBillingCycleDefinition = (billingCycle: string | null) => {
  return BILLING_CYCLE_DEFINITIONS[billingCycle || 'monthly'] || BILLING_CYCLE_DEFINITIONS.monthly;
};

export const getCyclePriceBrl = (planCode: string, billingCycle: string | null) => {
  const plan = PLAN_DEFINITIONS[planCode] || PLAN_DEFINITIONS.basic;
  const cycle = getBillingCycleDefinition(billingCycle);
  return Number((plan.monthlyPriceBrl * cycle.months).toFixed(2));
};

export const BILLING_CYCLES = [
  { ...BILLING_CYCLE_DEFINITIONS.yearly, badge: 'Mais procurado' },
  BILLING_CYCLE_DEFINITIONS.monthly,
  BILLING_CYCLE_DEFINITIONS.quarterly,
  BILLING_CYCLE_DEFINITIONS.triennial,
] as const;

export const PLANS = Object.values(PLAN_DEFINITIONS).map((plan: any) => ({
  code: plan.code as PlanCode,
  audience: plan.audience as string,
  name: plan.name as string,
  monthlyPriceBrl: plan.monthlyPriceBrl as number,
  highlighted: plan.code === 'medium',
  dark: plan.code === 'full',
  features: plan.marketing.features as string[],
  badges: plan.marketing.highlights as string[],
}));

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

export const getCycleSuffix = (billingCycle: BillingCycle) => {
  switch (billingCycle) {
    case 'monthly':
      return '/mês';
    case 'quarterly':
      return '/3 meses';
    case 'yearly':
      return '/ano';
    case 'triennial':
      return '/3 anos';
    default:
      return '';
  }
};
