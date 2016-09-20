import { Injectable } from '@angular/core';

declare const API_ENDPOINT: string;
declare const BUILD_TARGET: string;

@Injectable()
export class ConfigService {

  get apiEndpoint(): string {
    if (BUILD_TARGET === 'web') {
      // For build target 'web' we are running a node server alongside
      // the app which proxies all api requests.
      return window.location.origin;
    } else if (API_ENDPOINT) {
      return API_ENDPOINT;
    } else {
      return window.location.origin;
    }
  }

}
