module.exports = {
  listenAddress: process.env.LISTEN_ADDRESS || '127.0.0.1',
  listenPort: process.env.LISTEN_PORT || '8080',
  apiHost: process.env.API_HOST || '127.0.0.1',
  apiPort: process.env.API_PORT || '8000'
}
