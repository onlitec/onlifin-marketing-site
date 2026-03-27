# Etapa 1: Build da aplicação React
FROM node:20-alpine as build-stage
WORKDIR /app/marketing-site
COPY marketing-site/package*.json ./
RUN npm install --legacy-peer-deps
COPY marketing-site .
COPY shared /app/shared
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine
COPY --from=build-stage /app/marketing-site/dist /usr/share/nginx/html
COPY marketing-site/nginx-marketing.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /docker-entrypoint.d
COPY <<'EOF' /docker-entrypoint.d/40-write-runtime-config.sh
#!/bin/sh
set -eu

escaped_base_url="$(printf '%s' "${PLATFORM_BASE_URL:-}" | sed 's/\\/\\\\/g; s/"/\\"/g')"
cat > /usr/share/nginx/html/runtime-config.js <<CONFIG
window.__ONLIFIN_PLATFORM_BASE_URL__ = "${escaped_base_url}";
CONFIG
EOF
RUN chmod +x /docker-entrypoint.d/40-write-runtime-config.sh
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
