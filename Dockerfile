FROM node:6

WORKDIR /usr/src/pokemon-app

ADD . .

RUN npm install

EXPOSE 8080
CMD ["npm", "start"]