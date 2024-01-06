FROM node:18
WORKDIR /urs/src/nodejs-api-ddd
COPY ./package.json .
RUN npm install --only=prod