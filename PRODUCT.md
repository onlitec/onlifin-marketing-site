# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Existing codebase: React 18 + TypeScript + Vite + Tailwind 3, `lucide-react`, `framer-motion` (declared, currently unused). Served by Nginx from a Docker image (`onlifin-marketing-dev`, port 8081 in dev). Single page in `src/App.tsx`. Signup posts to `/api/rpc/signup_tenant` and `/api/rpc/login`, then redirects to the app via `window.__ONLIFIN_PLATFORM_BASE_URL__` (runtime config).

## Users
People and small businesses who need one centralized view of their financial life and want to stop depending on scattered spreadsheets and manual processes. Both personal (PF) and business (PJ) contexts. Source: user brief.

## Product Purpose
OnliFin is a financial management platform for individuals and companies. It centralizes accounts, cards, transactions, bills to pay and receive, OFX and CSV statement import, bank reconciliation, financial forecasting, debt management, and personal/business financial organization. The marketing site exists so a visitor understands, within seconds: what it is, who it is for, what problem it solves, why it is different, and the next step (create an account).

## Positioning
Serious, modern financial tool conveying control, clarity, organization and financial intelligence. Personal and business finance in one multi-tenant ecosystem with isolated contexts per client (PF, family members, contacts, multiple CNPJs). Not a traditional bank, not a generic SaaS template.

## Operating Context
Public marketing page at onlifin.com.br. Primary conversion: choose a plan, create an account, land in the app (`/app/login?signup=1&plan=...&billingCycle=...`). A secondary header link goes straight to the platform (`/pf`).

## Capabilities and Constraints
Confirmed by current copy and plan definitions (do not extend):
- Centralized dashboard for PF and PJ; accounts, cards, transactions, indicators.
- Bills to pay and receive, installments, transfers, due dates.
- OFX and CSV statement import, review, categorization, reconciliation.
- Family members, financial contacts, multiple CNPJs with separate context.
- Reports, charts, financial forecast; debt module; AI assistant; notifications with configurable personal destinations.
- Multi-tenant isolation; backup and restore; installable PWA.
- Plans (monthly price): Básico R$ 29 (PF; 1 titular, up to 1 person, up to 1 CNPJ, accounts/cards/transactions, statement import, essential reports); Intermediário R$ 79 (small business; up to 2 people, 2 CNPJs, debts, reconciliation, advanced reports, forecast); Completo R$ 199 (structured operation; up to 10 people, 10 CNPJs, everything in Intermediário, priority support, future bank integrations).
- Billing cycles: monthly, quarterly, yearly, triennial (price = monthly x months, as coded).
- 30-day free trial; the page states "Sem cartão de crédito necessário".
- Bank integrations are FUTURE, never sold as active. Multi-user seats are NOT part of the offer ("Assentos multiusuário ainda não fazem parte desta oferta comercial").
- Signup flow and its API contract must be preserved exactly.

## Brand Commitments
Name is written OnliFin (Onli + Fin). Language: Brazilian Portuguese. Existing tone is direct and operational. No other brand assets confirmed (favicon set in `public/`: the wordmark's two bars on the desk ground).

## Evidence on Hand
No testimonials, customer logos, usage metrics, press, or case studies exist. Future work must not fabricate any. Real evidence available is only the product's own capabilities and plan facts above. The user indicated there may be further facts to provide; none were specified yet (open).

## Product Principles
- Say only what the product does today; frame future integrations as future.
- One clear next step: choose a plan and create an account.
- Personal and business finance are one system with separated contexts; make that the story.
- Clarity of the financial picture over feature volume.

## Accessibility & Inclusion
No product-specific standard confirmed. Baseline requested by the user: contrast, visible focus, keyboard navigation, semantic headings, reduced motion, adequate touch targets.
