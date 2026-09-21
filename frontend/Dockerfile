# Multi-stage production Dockerfile for NUMM React 19 / StyleX frontend
# Targeted for NIC MeghRaj Gov Cloud & air-gapped PSU deployments

FROM node:20-alpine as builder

WORKDIR /app

RUN npm install -g pnpm

# Install dependencies
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy frontend source code and build
COPY frontend/ ./
RUN pnpm build

# Minimal Nginx serving container
FROM nginx:alpine as runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=15s --timeout=3s --retries=3 \
    CMD wget -qO- http://localhost/nginx-health || exit 1

CMD ["nginx", "-g", "daemon off;"]
