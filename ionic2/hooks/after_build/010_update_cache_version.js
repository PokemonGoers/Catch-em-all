#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const CACHE_VERSION_TAG = '###CACHE_VERSION###';
const SERVICE_WORKER_FILE = 'service-worker.js';

const scriptName = __filename.split(/[\\/]/).pop();
const rootDir = process.argv[2];
const cacheVersion = Date.now();

if (!rootDir) {
  console.error(scriptName,  'No root dir given');
  process.exit(1);
}

let platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);
platforms.forEach(platform => {
  platform = platform.trim().toLowerCase();

  console.log(scriptName, `Update cache version for platform '${platform}' to '${cacheVersion}'`);

  let buildDir;
  if (platform === 'android') {
    buildDir = path.resolve(rootDir, 'platforms', platform, 'assets', 'www');
  } else {
    buildDir = path.resolve(rootDir, 'platforms', platform, 'www');
  }
  let serviceWorkerPath = path.resolve(buildDir, SERVICE_WORKER_FILE);

  if (!fs.existsSync(serviceWorkerPath)) {
    console.error(scriptName, `Service worker file not found at '${serviceWorkerPath}'`);
    return;
  }

  let serviceWorkerContent = fs.readFileSync(serviceWorkerPath, 'utf8');
  serviceWorkerContent = serviceWorkerContent.replace(CACHE_VERSION_TAG, cacheVersion);
  fs.writeFileSync(serviceWorkerPath, serviceWorkerContent, 'utf8');
});
