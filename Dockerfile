FROM node:16 as base

RUN npm install -g pnpm

# BUILDER

FROM base as builder

WORKDIR /usr/src/app

COPY . .

RUN pnpm i
RUN pnpm build

# BASE

FROM base

WORKDIR /usr/src/app

COPY package.json ./
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

ENV PORT=3000
ENV DATABASE_URL=postgresql://username:password@localhost:5432/dbname?schema=public
CMD [ "node", "dist/main" ]