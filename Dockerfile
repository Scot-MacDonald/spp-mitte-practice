# ---- Base Image ----
    FROM node:20-alpine AS base
    RUN npm install -g pnpm
    WORKDIR /app
    
    # ---- Install Dependencies (cached separately) ----
    FROM base AS deps
    COPY package.json pnpm-lock.yaml ./
    RUN pnpm install --frozen-lockfile
    
    # ---- Build Stage ----
    FROM base AS build
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    RUN pnpm build
    
    # ---- Production Runtime ----
    FROM base AS runtime
    ENV NODE_ENV=production
    WORKDIR /app
    
    # Only install prod dependencies
    COPY package.json pnpm-lock.yaml ./
    RUN pnpm install --prod --frozen-lockfile
    
    # Copy built next app
    COPY --from=build /app/.next ./.next
    COPY --from=build /app/public ./public
    COPY --from=build /app/next.config.js ./
    COPY --from=build /app/node_modules ./node_modules
    
    EXPOSE 3000
    CMD ["pnpm", "start"]
    