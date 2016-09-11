FROM node:6

WORKDIR /usr/src/pokemon-app

Add ionic2 ionic2
ADD server server

# Fix bug https://github.com/npm/npm/issues/9863
#RUN cd $(npm root -g)/npm \
#  && npm install fs-extra \
#  && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs.move/ ./lib/utils/rename.js

RUN cd server && npm install -q
RUN cd ionic2 && npm install -q
RUN cd ionic2 && npm update -q pokemap-1 pokemap-2
RUN cd ionic2 && node_modules/.bin/typings install
RUN cd ionic2 && node_modules/.bin/gulp build --release
RUN rm -rf ionic2

WORKDIR server
ENV LISTEN_ADDRESS=0.0.0.0
ENV LISTEN_PORT=8080
EXPOSE 8080
CMD ["npm", "start"]