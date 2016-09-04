module.exports = {
  listenAddress: process.env.LISTEN_ADDRESS || '127.0.0.1',
  listenPort: process.env.LISTEN_PORT || '8080',
  apiHost: process.env.API_HOST || 'pokedata.c4e3f8c7.svc.dockerapp.io',
  apiPort: process.env.API_PORT || '65014'
}
