#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const del = require('del');

const scriptName = __filename.split(/[\\/]/).pop();
const rootDir = process.argv[2];

let platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);
if (platforms.indexOf('browser') === -1) {
  // We are only interested in browser builds
  process.exit(0);
}

if (!rootDir) {
  console.error(scriptName,  'No root dir given');
  process.exit(1);
}

let buildDir = path.resolve(rootDir, 'platforms', 'browser', 'www');
let serverDir = path.resolve(rootDir, '..', 'server');
let serverAppDir = path.resolve(serverDir, 'app');

if (!fs.existsSync(buildDir)) {
  console.error(scriptName, `Build dir not found at '${buildDir}'`);
  return;
}

if (!fs.existsSync(serverDir)) {
  console.error(scriptName, `Server dir not found at '${serverDir}'`);
  return;
}

if (fs.existsSync(serverAppDir)) {
  console.log(scriptName, `Cleaning server dir '${serverAppDir}'`);
  del.sync(serverAppDir, {force: true});
}

console.log(scriptName, `Copying bundled app from '${buildDir}' to '${serverAppDir}'`);
fs.copySync(buildDir, serverAppDir);
