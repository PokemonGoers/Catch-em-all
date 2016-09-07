const PokemonSite = require('./pokemon-site')
const config = require('./config')

const pokemonSite = new PokemonSite(config)

// Setup termination handler for various signals
const signals = [
  'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
  'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
]
function closeApp () {
  return pokemonSite.close().then(() => {
    console.log('Stopped app')
    process.exit(1)
  })
}
for (let signal of signals) { process.on(signal, closeApp) }
