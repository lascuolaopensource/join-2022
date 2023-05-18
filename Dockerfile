ARG BUILD_CONTEXT

##FIRST STAGE
FROM node:16-alpine AS builder
ARG BUILD_CONTEXT
ENV ENV_BUILD_CONTEXT=$BUILD_CONTEXT
WORKDIR /usr/app
COPY package.json ./
COPY yarn.lock ./
COPY packages/${BUILD_CONTEXT} /usr/app/packages/${BUILD_CONTEXT}
COPY packages/shared /usr/app/packages/shared
RUN yarn install
RUN yarn run build:shared
RUN yarn run build:${BUILD_CONTEXT}

##SECOND STAGE
FROM node:16-alpine AS final
ARG BUILD_CONTEXT
ENV ENV_BUILD_CONTEXT=$BUILD_CONTEXT
WORKDIR /usr/app
COPY --from=builder ./usr/app/packages/${BUILD_CONTEXT}/dist ./packages/${BUILD_CONTEXT}/dist
COPY --from=builder ./usr/app/packages/${BUILD_CONTEXT}/public ./packages/${BUILD_CONTEXT}/public
COPY --from=builder ./usr/app/packages/${BUILD_CONTEXT}/database ./packages/${BUILD_CONTEXT}/database
COPY --from=builder ./usr/app/packages/shared/dist ./packages/shared/dist
COPY --from=builder ./usr/app/packages/shared/package.json ./packages/shared
COPY packages/${BUILD_CONTEXT}/package.json ./packages/${BUILD_CONTEXT}
COPY package.json .
COPY yarn.lock .
RUN yarn install --production

EXPOSE 1337

CMD yarn run start:${ENV_BUILD_CONTEXT}
