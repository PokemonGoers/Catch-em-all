import { Injectable } from '@angular/core';

import env from '../env';

@Injectable()
export class ConfigService {

  get apiEndpoint(): string {
    if (env.BUILD_TARGET !== 'web' && env.API_ENDPOINT) {
      return env.API_ENDPOINT;
    } else {
      // For build target 'web' we are running a node server alongside
      // the app which proxies all api requests.
      return window.location.origin;
    }
  }

  get websocketEndpoint(): string {
    if (env.BUILD_TARGET !== 'web' && env.WEBSOCKET_ENDPOINT) {
      return env.WEBSOCKET_ENDPOINT;
    } else {
      // For build target 'web' we are running a node server alongside
      // the app which proxies all websocket requests.
      return window.location.origin;
    }
  }

}
