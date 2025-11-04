# ------------------------------
# Base image (Debian)
# ------------------------------
    FROM node:20 AS base
    RUN npm install -g pnpm
    WORKDIR /app
    
    # ------------------------------
    # Install dependencies
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
    
    # Allow native builds for sharp/esbuild
    RUN pnpm approve-builds
    
    # Build Next.js + Payload
    RUN pnpm build
    
    # ------------------------------
    # Production runtime
    # ------------------------------
    FROM base AS runtime
    ENV NODE_ENV=production
    WORKDIR /app
    
    # Copy entire node_modules from build (already built native modules)
    COPY --from=build /app/node_modules ./node_modules
    
    # Copy build output
    COPY --from=build /app/.next ./.next
    COPY --from=build /app/public ./public
    COPY --from=build /app/next.config.js ./
    
    # Expose port & default command
    EXPOSE 3000
    CMD ["pnpm", "start"]
    