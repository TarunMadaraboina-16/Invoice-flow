# ---------- Base builder stage ----------
FROM node:18-bullseye AS builder

WORKDIR /app

# Install dependencies
COPY api/package*.json ./
COPY api/tsconfig.json ./
RUN npm install

# Copy API source code
COPY api/src ./src

# Copy prisma folder from project root
COPY prisma ./prisma

# Build TypeScript
RUN npm run build

# Generate Prisma client
RUN npx prisma generate


# ---------- Runtime stage ----------
FROM node:18-bullseye AS runner

WORKDIR /app

# Copy built output FIRST
COPY --from=builder /app/dist ./dist

# Copy node_modules
COPY --from=builder /app/node_modules ./node_modules

# Copy prisma
COPY --from=builder /app/prisma ./prisma

# Copy package.json (for metadata only)
COPY api/package*.json ./

CMD ["node", "dist/server.js"]