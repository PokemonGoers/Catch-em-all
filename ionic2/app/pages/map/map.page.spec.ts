import { addProviders, inject } from '@angular/core/testing';
import { App, Platform, Config, NavParams } from 'ionic-angular';
import { MapPage } from './map.page';

describe('Map', () => {
  let config: Config;
  let platform: Platform;
  let app: App;
  let navParams: NavParams;

  beforeEach(() => {
    config = new Config();
    platform = new Platform();
    app = new App(config, platform);
    navParams = new NavParams();
    addProviders([]);
    });

    it('should execute tests', inject([], () => {
      expect(true).toBeTruthy();
    }));
});
