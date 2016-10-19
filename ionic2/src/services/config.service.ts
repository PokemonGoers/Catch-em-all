import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import env from '../app/env';

@Injectable()
export class ConfigService {

  constructor(private platform: Platform) { }

  get apiEndpoint(): string {
      return env.API_ENDPOINT;
  }

  get websocketEndpoint(): string {
      // For build target 'web' we are running a node server alongside
      // the src which proxies all websocket requests.
      return env.WEBSOCKET_ENDPOINT;
  }

  get isDevelopEnvironment(): boolean {
    return env.BUILD_ENV === 'develop';
  }

}
