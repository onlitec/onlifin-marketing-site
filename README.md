# OnliFin — site de marketing

Landing page pública do OnliFin (React 18 + TypeScript + Vite + Tailwind 3), servida por Nginx.
Apresenta o produto, os planos e leva ao cadastro no app (`/app/`).

## Identidade visual

Direção "bobina de somadora": mesa grafite, fita de papel impressa em tinta preta e vermelhão, títulos em
Big Shoulders Display, dados em Martian Mono e texto em Hanken Grotesk. Sem cards, gradientes ou sombras.

- Produto e restrições de conteúdo: [`PRODUCT.md`](PRODUCT.md)
- Sistema de design (tokens, componentes, regras): [`DESIGN.md`](DESIGN.md) e `.impeccable/design.json`

## Estrutura

```
src/App.tsx              composição da página
src/components/          Header, Hero (a fita), Sections, Footer, SignupModal, Tape (primitivos de movimento)
src/lib/plans.ts         planos, preços e ciclos (fonte única de preços desta página)
src/lib/platform.ts      URL da plataforma (runtime-config.js > VITE_PLATFORM_BASE_URL > origin)
nginx-marketing.conf     roteamento: /api, /app, redirects /login /pf /pj, rate limit
Dockerfile               build Vite + Nginx; gera runtime-config.js no start
docker-compose.yml       compose de produção (redes onlifin-network e proxy_net)
```

## Desenvolvimento

```bash
npm install --legacy-peer-deps
npm run dev        # http://localhost:5173
npm run build      # gera dist/
npm run lint
```

## Configuração

`PLATFORM_BASE_URL` (variável de ambiente do container) define para onde vão "Acessar plataforma" e o
redirecionamento pós-cadastro. Ela é lida **na subida do container** (`/docker-entrypoint.d/40-write-runtime-config.sh`
grava `runtime-config.js`), então a mesma imagem serve dev e produção. Padrão de produção: `https://onlifin.com.br/app/`.

## Cadastro

O modal chama `POST /api/rpc/signup_tenant` e `POST /api/rpc/login` (proxy do Nginx para a API) e redireciona para
`{PLATFORM_BASE_URL}/login?signup=1&plan=...&billingCycle=...`. O contrato dessas chamadas não deve mudar sem
alinhar com o backend.

## Build da imagem e deploy

O `Dockerfile` usa `COPY <<'EOF'` e por isso **exige BuildKit** (`docker buildx`). Servidores sem `buildx` não
constroem a imagem: construa em outra máquina e envie com `docker save | gzip | ssh ... 'gunzip | docker load'`.

```bash
docker compose build marketing
docker compose up -d --no-deps marketing
```

O workflow `Deploy Marketing Site` constrói e envia a imagem ao Docker Hub em push para `main`
(não faz deploy no servidor). Reversão em produção: retague a imagem anterior como `latest` e recrie o container.

## Pendências conhecidas

- `favicon.svg` ainda é o do template Vite (falta a marca OnliFin).
- `framer-motion` está declarado e não é usado.
- `tsconfig.app.json` usa `target ES2023`, que o TypeScript `~5.4` não aceita; o `vite build` não é afetado.
- Fontes carregadas do Google Fonts (considerar hospedar localmente).
