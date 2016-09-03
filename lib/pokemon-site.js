const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')

class PokemonSite {
  constructor (config) {
    // Express
    const app = express()
    app.use(bodyParser.json())
    app.get('/', (req, res) => { res.redirect('index.html') })
    app.use(express.static(path.join(__dirname, 'public'))) // Serve `/public`
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
