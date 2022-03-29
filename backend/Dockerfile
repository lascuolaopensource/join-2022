FROM strapi/base

WORKDIR /app

COPY ./package.json /app

RUN npm install

COPY . /app

EXPOSE 1337

RUN npm run-script build

CMD ["npm", "run", "start"] 