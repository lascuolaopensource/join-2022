FROM node:16 as builder

WORKDIR /app

COPY ./package.json /app

RUN npm install

COPY . /app

RUN npm run build

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/build .
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "index.js"]
