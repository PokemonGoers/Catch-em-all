const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const proxy = require('express-http-proxy')
const url = require('url')

class PokemonSite {
  constructor (config) {
    // Express
    const app = express()
    app.use(bodyParser.json())
    app.get('/', (req, res) => { res.redirect('index.html') })

    // Serve app content
    app.use(express.static(path.join(__dirname, '../app')))

    // Proxy requests to /api/* to API backend
    var apiEndpoint = config.apiHost + ':' + config.apiPort
    app.use('/api/*', proxy(apiEndpoint, {
      forwardPath: (req, res) => url.parse(req.baseUrl).path
    }))

    this._app = app

    // Start listening
    this._server = http.createServer(app)
    this._server.listen(config.listenPort, config.listenAddress, () => {
      console.log('Listening on %s:%d ...', config.listenAddress, config.listenPort)
    })

    // Keep track of open connections
    this.socketId = 0
    this.sockets = {}
    this._server.on('connection', (socket) => {
      let socketId = this.socketId++
      this.sockets[socketId] = socket

      // Remove connection after it has been closed
      socket.on('close', () => delete this.sockets[socketId])
    })
  }

  /**
  Shuts down the application
  @method close
  @return {Promise}
  */
  close () {
    console.log('Shutting down server...')

    return new Promise((resolve, reject) => {
      // Close all open connections
      Object.keys(this.sockets).forEach(socketId => this.sockets[socketId].destroy())

      this._server.close((err) => {
        if (err) { reject(err) } else { resolve() }
      })
    }).then(() => console.log('Server terminated'))
  }
}

module.exports = PokemonSite
