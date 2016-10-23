import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import env from '../app/env';

@Injectable()
export class ConfigService {

  constructor(private platform: Platform) { }

  get apiEndpoint(): string {
    if (this.browserPlatform) {
      // If we are running inside a browser the app is served
      // by a web server which also proxies all API requests.
      return window.location.origin;
    } else {
      return env.API_ENDPOINT;
    }
  }

  get websocketEndpoint(): string {
    if (this.browserPlatform) {
      // If we are running inside a browser the app is served
      // by a web server which also proxies all API requests.
      return window.location.origin;
    } else {
      // For build target 'web' we are running a node server alongside
      // the src which proxies all websocket requests.
      return env.WEBSOCKET_ENDPOINT;
    }
  }

  get browserPlatform(): boolean {
    return this.platform.is('core') || this.platform.is('mobileweb');
  }

  get isDevelopEnvironment(): boolean {
    return env.BUILD_ENV === 'develop';
  }

}
