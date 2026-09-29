import { useEffect, useRef, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import {
  BILLING_CYCLES,
  PLANS,
  PLAN_DISPLAY_NAMES,
  formatCurrency,
  getBillingCycleDefinition,
  getCyclePriceBrl,
  getCycleSuffix,
  type BillingCycle,
  type PlanCode,
} from '../lib/plans';
import { getPlatformBaseUrl, normalizeRpcText } from '../lib/platform';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PlanCode | null;
  selectedBillingCycle: BillingCycle;
  onSelectPlan: (plan: PlanCode) => void;
  onSelectBillingCycle: (billingCycle: BillingCycle) => void;
};

const fieldClass =
  'w-full border-0 border-b-2 border-ink/30 bg-transparent px-2 py-3 font-text text-lg text-ink outline-none transition-colors placeholder:text-ink-mute/70 focus:border-ink focus:bg-paper-shade focus-visible:outline-none';
const labelClass = 'block font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink-mute';

export const SignupModal = ({
  isOpen,
  onClose,
  selectedPlan,
  selectedBillingCycle,
  onSelectPlan,
  onSelectBillingCycle,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape closes, background stays put, focus moves into the dialog.
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href]',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (!panelRef.current?.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    const focusTimer = window.setTimeout(() => {
      const panel = panelRef.current;
      (panel?.querySelector<HTMLElement>('input') ??
        panel?.querySelector<HTMLElement>('button:not([aria-label="Fechar"])'))?.focus();
    }, 30);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose, selectedPlan === null]);

  if (!isOpen) return null;

  const closeButton = (
    <button
      type="button"
      onClick={onClose}
      aria-label="Fechar"
      className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center text-ink transition-colors hover:bg-paper-shade"
    >
      <X size={22} aria-hidden="true" />
    </button>
  );

  if (!selectedPlan) {
    return (
      <div className="fixed inset-0 z-[100] flex items-end justify-center bg-desk/90 p-0 sm:items-center sm:p-4">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="plan-dialog-title"
          className="on-paper modal-in relative max-h-[96vh] w-full max-w-6xl overflow-y-auto bg-paper p-6 text-ink sm:p-10"
        >
          {closeButton}

          <div className="mb-8 max-w-2xl pr-10">
            <h2 id="plan-dialog-title" className="font-display text-5xl font-black uppercase leading-none">
              Escolha seu plano
            </h2>
            <p className="mt-3 text-base text-ink-mute">
              Selecione a opção mais adequada antes de iniciar seu teste grátis de 30 dias.
            </p>
          </div>

          <div role="group" aria-label="Ciclo de cobrança" className="mb-10 grid grid-cols-2 border-y border-ink sm:grid-cols-4">
            {BILLING_CYCLES.map((cycle) => {
              const isActive = selectedBillingCycle === cycle.code;
              return (
                <button
                  key={cycle.code}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onSelectBillingCycle(cycle.code as BillingCycle)}
                  className={[
                    'min-h-[56px] border-ink px-4 py-3 text-left transition-colors sm:border-r sm:last:border-r-0',
                    isActive ? 'bg-ink text-paper' : 'hover:bg-paper-shade',
                  ].join(' ')}
                >
                  <span className="block font-mono text-xs font-bold uppercase tracking-[0.14em]">{cycle.label}</span>
                  <span className={`block text-sm ${isActive ? 'text-paper/80' : 'text-ink-mute'}`}>
                    {cycle.badge || `${cycle.months} mês${cycle.months > 1 ? 'es' : ''}`}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-ink/25">
            {PLANS.map((plan) => (
              <div key={plan.code} className="flex flex-col border-t border-ink/25 py-7 first:border-t-0 md:border-t-0 md:px-7 md:first:pl-0 md:last:pr-0">
                <h3 className="font-display text-3xl font-extrabold uppercase leading-[1.05]">{plan.name}</h3>
                <p className="mt-1 text-base text-ink-mute">{plan.audience}</p>
                <p className="num mt-5 text-3xl font-bold leading-none">
                  {formatCurrency(getCyclePriceBrl(plan.code, selectedBillingCycle))}
                  <span className="ml-1 text-sm font-medium text-ink-mute">{getCycleSuffix(selectedBillingCycle)}</span>
                </p>
                <p className="mt-2 text-sm text-ink-mute">
                  {getBillingCycleDefinition(selectedBillingCycle).label} • equivalente a{' '}
                  {formatCurrency(plan.monthlyPriceBrl)}/mês
                </p>
                <ul className="mt-5 flex-1 divide-y divide-ink/15 border-y border-ink/15">
                  {plan.features.map((feature) => (
                    <li key={feature} className="py-2 text-[0.9375rem] leading-snug">
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onSelectPlan(plan.code)}
                  className={[
                    'mt-6 min-h-[52px] w-full px-3 font-mono text-[0.8125rem] font-bold uppercase tracking-[0.05em] transition-colors',
                    plan.highlighted
                      ? 'bg-ink text-paper hover:bg-vermilion'
                      : 'border-2 border-ink text-ink hover:bg-ink hover:text-paper',
                  ].join(' ')}
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
    setError(null);
    try {
      const defaultCompanyName = `Cliente - ${formData.name}`;
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
          p_plan: selectedPlan,
        }),
      });
      const data = await resp.json();
      if (data.success) {
        const loginResp = await fetch('/api/rpc/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            p_email: formData.email,
            p_password: formData.password,
          }),
        });

        if (loginResp.ok) {
          const token = normalizeRpcText(await loginResp.text());
          window.location.href = `${getPlatformBaseUrl()}/login?signup=1&plan=${encodeURIComponent(selectedPlan)}&billingCycle=${encodeURIComponent(selectedBillingCycle)}&email=${encodeURIComponent(formData.email)}#token=${encodeURIComponent(token)}`;
          return;
        }

        window.location.href = `${getPlatformBaseUrl()}/login?signup=1&plan=${encodeURIComponent(selectedPlan)}&billingCycle=${encodeURIComponent(selectedBillingCycle)}&email=${encodeURIComponent(formData.email)}`;
      } else {
        setError(data.message || 'Erro no cadastro. Tente novamente.');
      }
    } catch {
      setError('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-desk/90 p-0 sm:items-center sm:p-4">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-dialog-title"
        className="on-paper modal-in relative max-h-[96vh] w-full max-w-lg overflow-y-auto bg-paper text-ink"
      >
        {closeButton}

        <div className="p-6 sm:p-10">
          <h2 id="signup-dialog-title" className="pr-10 font-display text-5xl font-black uppercase leading-none">
            Criar sua conta
          </h2>
          <dl className="mt-5 divide-y divide-ink/15 border-y border-ink/15 text-[0.9375rem]">
            <div className="flex items-baseline justify-between gap-4 py-2">
              <dt className="text-ink-mute">Plano selecionado</dt>
              <dd className="font-mono text-sm font-bold uppercase tracking-[0.08em] text-vermilion">
                {PLAN_DISPLAY_NAMES[selectedPlan] || selectedPlan}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-2">
              <dt className="text-ink-mute">Ciclo selecionado</dt>
              <dd className="num text-sm">
                {getBillingCycleDefinition(selectedBillingCycle).label} •{' '}
                {formatCurrency(getCyclePriceBrl(selectedPlan, selectedBillingCycle))}
                {getCycleSuffix(selectedBillingCycle)}
              </dd>
            </div>
          </dl>

          <form onSubmit={handleSubmit} className="mt-7 space-y-6">
            <div>
              <label htmlFor="signup-name" className={labelClass}>Nome completo</label>
              <input
                id="signup-name"
                required
                type="text"
                autoComplete="name"
                placeholder="Ex: Alessandro Silva"
                className={fieldClass}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="signup-email" className={labelClass}>E-mail</label>
                <input
                  id="signup-email"
                  required
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  className={fieldClass}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="signup-password" className={labelClass}>Senha</label>
                <input
                  id="signup-password"
                  required
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className={fieldClass}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="border-l-0 border-t-2 border-vermilion pt-3 text-[0.9375rem] font-medium text-vermilion">
                {error}
              </p>
            )}

            <button
              disabled={loading}
              className="flex min-h-[56px] w-full items-center justify-center gap-3 bg-ink px-6 font-mono text-sm font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:bg-vermilion disabled:opacity-60"
            >
              {loading ? <Loader2 className="animate-spin" size={20} aria-label="Enviando" /> : 'Finalizar Cadastro & Acessar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
