const PokemonServer = require('./pokemon-server')
const config = require('./config')

const pokemonServer = new PokemonServer(config)

// Setup termination handler for various signals
const signals = [
  'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
  'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
]
function closeApp () {
  return pokemonServer.close().then(() => {
    console.log('Stopped app')
    process.exit(1)
  })
}
for (let signal of signals) { process.on(signal, closeApp) }
