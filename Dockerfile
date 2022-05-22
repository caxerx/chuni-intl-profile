FROM node:16 as base

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm

# BUILDER

FROM base as builder

WORKDIR /usr/src/app

COPY . .

RUN pnpm i
RUN pnpm build:nest
RUN pnpm build:next

# BASE

FROM base

WORKDIR /usr/src/app

COPY package.json ./
COPY prisma ./prisma
RUN pnpm i --production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/.next ./.next

EXPOSE 3000

CMD [ "node", "dist/server/main" ]

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV CHROMIUM_EXECUTABLE=/usr/bin/google-chrome
ENV PORT=3000
ENV DATABASE_URL=postgresql://username:password@localhost:5432/dbname?schema=public
ENV ADMIN_KEY=adminpw
ENV JWT_SECRET=jwtsecret
ENV CHUNIREC_TOKEN=chunirec_token
ENV NEXT_PUBLIC_HOST_URL=https://local.dev:3000

USER node