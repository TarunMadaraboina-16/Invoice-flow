# ---------- Base builder stage ----------
FROM node:18-bullseye AS builder

WORKDIR /app

# Install dependencies (from worker folder)
COPY worker/package*.json ./
COPY worker/tsconfig.json ./
RUN npm install

# Copy worker source code (from worker/src to /app/src)
COPY worker/src ./src

# Copy prisma folder from project root
COPY prisma ./prisma

# Build TypeScript
RUN npm run build

# Generate Prisma client
RUN npx prisma generate


# ---------- Runtime stage ----------
FROM node:18-bullseye AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY worker/package*.json ./

CMD ["npm", "run", "worker"]