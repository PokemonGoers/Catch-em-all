const PokemonSite = require('./pokemon-site')

const pokemonSite = new PokemonSite()

// Setup termination handler for various signals
const signals = [
  'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
  'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
]
function closeApp () {
  return pokemonSite.close().then(() => { process.exit(1) })
}
for (let signal of signals) { process.on(signal, closeApp) }
