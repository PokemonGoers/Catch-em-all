module.exports = {
  listenAddress: process.env.LISTEN_ADDRESS || '127.0.0.1',
  listenPort: process.env.LISTEN_PORT || '8080',
  apiEndpoint: process.env.API_ENDPOINT || 'pokedata.c4e3f8c7.svc.dockerapp.io:65014',
  websocketEndpoint: process.env.WEBSOCKET_ENDPOINT || 'pokedata.c4e3f8c7.svc.dockerapp.io:65024'
}
