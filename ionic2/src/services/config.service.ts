import { Injectable } from '@angular/core';

import env from '../app/env';

@Injectable()
export class ConfigService {

  get apiEndpoint(): string {
    if (this.requestProxy) {
      return window.location.origin;
    } else {
      return env.API_ENDPOINT;
    }
  }

  get websocketEndpoint(): string {
    if (this.requestProxy) {
      return window.location.origin;
    } else {
      return env.WEBSOCKET_ENDPOINT;
    }
  }

  get requestProxy(): boolean {
    // Is set to true if the app is running alongside a node server
    // which proxies requests to the actual API backend.
    return env.REQUEST_PROXY !== 'false';
  }

  get isDevelopEnvironment(): boolean {
    return env.BUILD_ENV === 'develop';
  }

}
