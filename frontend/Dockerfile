FROM node:14.18.1-alpine

WORKDIR /opt/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

ENTRYPOINT yarn start
