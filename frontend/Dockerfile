FROM node:14.18.1-alpine

WORKDIR /opt/app

COPY package.json yarn.lock .

RUN yarn --silent

COPY .env.development .env

COPY . .

ENTRYPOINT yarn start


