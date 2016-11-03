import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

import { AppModuleNgFactory } from './app.module.ngfactory';
import { registerServiceWorker } from './register-service-worker'

registerServiceWorker();
enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
