FROM node:18
WORKDIR /urs/src/nodejs-api-ddd
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 8080
CMD npm start