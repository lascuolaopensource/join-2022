FROM strapi/base

WORKDIR /app

COPY ./package.json /app

RUN npm install

COPY . /app

EXPOSE 1337

ARG backendurl=http://localhost:1337

ENV BACKEND_URL=$backendurl

RUN npm run-script build

CMD ["npm", "run", "start"]
