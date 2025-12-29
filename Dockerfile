# Stage 1: Builder
FROM node:20-bullseye AS builder

WORKDIR /app_root/web

# Copy only what's needed to install dependencies
COPY ./web/package*.json ./web/next.config.ts ./

# Install only production dependencies
RUN npm ci

# Copy source files (Next.js project)
COPY ./web ./
COPY ./lib/ /app_root/lib

# Build Next.js app
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner

WORKDIR /app_root/web

# Copy only what's needed to run the built app
COPY --from=builder /app_root/web/.next ./.next
COPY --from=builder /app_root/web/public ./public
COPY --from=builder /app_root/web/package*.json ./
COPY --from=builder /app_root/web/node_modules ./node_modules
COPY --from=builder /app_root/web/app ./app
COPY --from=builder /app_root/lib /app_root/lib

# Copy and prepare the entrypoint script
COPY ./docker_scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV NODE_ENV=production
EXPOSE 3000

CMD ["/entrypoint.sh"]

