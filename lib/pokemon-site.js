const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const proxy = require('express-http-proxy');
const url = require('url');

class PokemonSite {
  constructor (config) {
    // Express
    const app = express()
    app.use(bodyParser.json())
    app.get('/', (req, res) => { res.redirect('index.html') })

    // Serve static content from /public directory
    app.use(express.static(path.join(__dirname, 'public')))

    // Proxy requests to /api/* to API backend
    var apiEndpoint = config.apiHost + ':' + config.apiPort;
    app.use('/api/*', proxy(apiEndpoint, {
      forwardPath: (req, res) => url.parse(req.baseUrl).path
    }));

    this._app = app

    // Start listening
    const server = http.createServer(app)
    server.listen(config.listenPort, config.listenAddress, () => {
      console.log('Listening on %s:%d ...', config.listenAddress, config.listenPort)
    })
    this._server = server
  }

  /**
  Shuts down the application
  @method close
  @return {Promise}
  */
  close () {
    return new Promise((resolve, reject) => {
      this._server.close((err) => {
        if (err) { reject(err) } else { resolve() }
      })
    }).then(() => {
      console.log('Stopped app')
    })
  }
}

module.exports = PokemonSite
