FROM node:6

WORKDIR /usr/src/pokemon-app

Add ionic2 ionic2
ADD server server

RUN npm config set loglevel warn
RUN cd server && npm install
RUN cd ionic2 && npm install
RUN cd ionic2 && node_modules/gulp/bin/gulp.js build --release
RUN rm -rf ionic2

WORKDIR server
ENV LISTEN_ADDRESS=0.0.0.0
ENV LISTEN_PORT=8080
EXPOSE 8080
CMD npm start