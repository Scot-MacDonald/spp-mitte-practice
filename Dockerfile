# ------------------------------
# Base image (Debian, not Alpine!)
# ------------------------------
    FROM node:20 AS base
    RUN npm install -g pnpm
    WORKDIR /app
    
    # ------------------------------
    # Install dependencies (cached)
    # ------------------------------
    FROM base AS deps
    COPY package.json pnpm-lock.yaml ./
    RUN pnpm install --frozen-lockfile
    
    # ------------------------------
    # Build application
    # ------------------------------
    FROM base AS build
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    
    # Allow sharp / esbuild / etc to build correctly
    RUN pnpm approve-builds
    
    # Build Next.js + Payload
    RUN pnpm build
    
    # ------------------------------
    # Production runtime
    # ------------------------------
    FROM base AS runtime
    ENV NODE_ENV=production
    WORKDIR /app
    
    # Install *only* production deps
    COPY package.json pnpm-lock.yaml ./
    RUN pnpm install --prod --frozen-lockfile
    
   # Copy build output from previous stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.js ./
COPY --from=build /app/node_modules ./node_modules
    