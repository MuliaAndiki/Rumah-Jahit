
FROM node:20-slim AS builder
WORKDIR /usr/src/app

RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

RUN npx prisma generate
RUN npm run build

# Prune dev dependencies in builder stage and regenerate Prisma Client for production
RUN npm prune --production && npx --yes prisma generate

FROM node:20-slim AS runtime
WORKDIR /usr/src/app

RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "dist/server.js"]