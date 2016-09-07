FROM node:6

WORKDIR /usr/src/pokemon-app

Add ionic2 ionic2
ADD server server

RUN cd server && npm install -q
RUN cd ionic2 && npm install -q
RUN cd ionic2 && node_modules/gulp/bin/gulp.js build --release
RUN rm -rf ionic2

WORKDIR server
ENV LISTEN_ADDRESS=0.0.0.0
ENV LISTEN_PORT=8080
EXPOSE 8080
CMD ["npm", "start"]