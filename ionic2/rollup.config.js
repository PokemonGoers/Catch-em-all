const config = require('@ionic/app-scripts/config/rollup.config');
const replace = require('rollup-plugin-replace');

var release = process.env['IONIC_ENV'] === 'prod';

const env = {
  BUILD_ENV: release ? 'release' : 'develop',
  BUILD_TIME: new Date(),
  API_ENDPOINT: process.env['API_ENDPOINT'] || 'http://pokedata.c4e3f8c7.svc.dockerapp.io:65014',
  WEBSOCKET_ENDPOINT: process.env['WEBSOCKET_ENDPOINT'] || 'http://pokedata.c4e3f8c7.svc.dockerapp.io:65024'
};

for (let envKey in env) {
  console.log(envKey, env[envKey]);
}

config.plugins.push(replace({
  include: '**/.tmp/app/env.js',
  delimiters: ['<@', '@>'],
  values: env
}));

module.exports = config;
