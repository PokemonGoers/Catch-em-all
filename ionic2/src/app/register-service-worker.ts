declare let navigator: any;

export function registerServiceWorker() {
  if (isSecureOrigin() && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.debug('[SW] Register'))
      .catch(err => console.error('[SW] Register error', err));
  }
}

function isSecureOrigin() {
  return location.protocol === 'https:' ||
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1';
}
