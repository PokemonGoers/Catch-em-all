FROM node:6

ENV PATH="${PATH}:./node_modules/.bin"

ENV LISTEN_ADDRESS=0.0.0.0
ENV LISTEN_PORT=8080
ENV API_ENDPOINT=http://pokedata.c4e3f8c7.svc.dockerapp.io:65014
ENV WEBSOCKET_ENDPOINT=http://pokedata.c4e3f8c7.svc.dockerapp.io:65024

# https://github.com/expressjs/morgan#predefined-formats
ENV REQUEST_LOG_FORMAT=short

# debug|info|warn|error|silent
ENV PROXY_LOG_LEVEL=info

WORKDIR /usr/src/pokemon-app

Add ionic2 ionic2
ADD server server

# Fix bug https://github.com/npm/npm/issues/9863
RUN cd $(npm root -g)/npm \
  && npm install fs-extra \
  && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs.move/ ./lib/utils/rename.js

# Install and update dependencies
RUN cd server && npm install --only=prod -q && npm prune --production
RUN cd ionic2 && npm install -q && npm prune
RUN cd ionic2 && npm update -q pokemap-1 pokemap-2

# Build web app
RUN cd ionic2 && npm run build:browser

# Clean workspace
RUN rm -rf ionic2

WORKDIR server
EXPOSE 8080
CMD ["npm", "start"]
