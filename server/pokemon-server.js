const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const proxy = require('express-http-proxy')
const compression = require('compression')

class PokemonServer {
  constructor (config) {
    // Express
    const app = express()
    app.use(bodyParser.json())
    app.get('/', (req, res) => { res.redirect('index.html') })

    // Use gzip to compress served files
    app.use(compression())

    // Serve app content and cache it for a week
    app.use(express.static(path.join(__dirname, 'app'), {maxage: 7 * 86400000}))

    // Proxy requests to /api to API backend
    app.use('/api', proxy(config.apiEndpoint, {
      forwardPath: (req, res) => req.originalUrl
    }))

    // Proxy websocket requests to API backend
    app.use('/socket.io', proxy(config.websocketEndpoint, {
      forwardPath: (req, res) => req.originalUrl
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

module.exports = PokemonServer
