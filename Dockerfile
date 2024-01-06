FROM node:18-alpine as base
WORKDIR /usr/src/nodejs-api-ddd
COPY ./package.json .
RUN npm install --only=prod && npm install -g typescript

FROM base as build
WORKDIR /usr/src/nodejs-api-ddd
COPY . .
COPY --from=base /usr/src/nodejs-api-ddd/node_modules ./node_modules
RUN tsc

FROM base as prod
WORKDIR /usr/src/nodejs-api-ddd
COPY --from=build /usr/src/nodejs-api-ddd/dist ./dist
CMD ["node", "dist/main/server.js"]