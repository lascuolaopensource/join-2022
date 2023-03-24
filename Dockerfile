FROM node:16 as builder

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

FROM node:16 as join-frontend

WORKDIR /app

COPY --from=builder /app/packages/apps/frontend/build ./
COPY --from=builder /app/packages/apps/frontend/package.json ./

ENV PORT 3000

CMD ["node", "index.js"]
