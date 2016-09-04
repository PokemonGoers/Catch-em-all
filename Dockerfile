FROM node:6

WORKDIR /usr/src/pokemon-app

ADD . .

RUN cd server && npm install
RUN cd ionic2 && npm install

EXPOSE 8080
CMD cd server && npm start