FROM node:22.3
 
WORKDIR /usr/src/app
 
COPY package*.json ./
 
RUN npm install
 
COPY  . .
 
EXPOSE 9000
 
CMD [ "npm", "start" ]
