# Use Node 20 as base
FROM node:20

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies including dev dependencies (for native builds)
RUN pnpm install --frozen-lockfile

# Copy application source
COPY . .

# Approve build scripts for native modules (safe even if nothing pending)
RUN pnpm approve-builds || true

# Rebuild sharp for Linux
RUN npm rebuild sharp --platform=linux --arch=x64

# Build Next.js application
RUN pnpm build

# Set production environment
ENV NODE_ENV=production
EXPOSE 3000

# Start app
CMD ["pnpm", "start"]