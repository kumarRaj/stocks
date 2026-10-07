FROM node:22-alpine
 
WORKDIR /usr/src/app
 
RUN npm install --global yarn@1.22.22

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile
 
COPY  . .
 
EXPOSE 9000
 
CMD [ "npm", "start" ]
