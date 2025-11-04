FROM node:20

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies including dev (so native builds happen)
RUN pnpm install --frozen-lockfile

# Copy app source
COPY . .

# Approve any build scripts for native modules
RUN pnpm approve-builds

# Force sharp to rebuild for Linux
RUN npm rebuild sharp --platform=linux --arch=x64

# Build Next.js app
RUN pnpm build

# Production image setup
ENV NODE_ENV=production
EXPOSE 3000
CMD ["pnpm", "start"]
