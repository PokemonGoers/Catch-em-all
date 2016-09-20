import { addProviders, beforeEach, it, describe, expect, inject } from '@angular/core/testing';
import { App, Platform, Config, NavParams } from 'ionic-angular';
import { MapPage } from './map.page';
import { Events } from 'ionic-angular';
import { App, PopoverController, Platform, Config, NavParams } from 'ionic-angular';
import { ConfigService } from '../../services/config.service';

describe('Map', () => {
    let config: Config;
    let platform: Platform;
    let app: App;
    let popoverCtrl: PopoverController;
    let events: Events;
    let configService: ConfigService;
    let navParams: NavParams;
    let mapPage: MapPage;

    beforeEach(() => {
        config = new Config();
        platform = new Platform();
        app = new App(config, platform);
        popoverCtrl = new PopoverController(app);
        events = new Events();
        configService = new ConfigService();
        navParams = new NavParams();
        mapPage = new MapPage(navParams, popoverCtrl);
        addProviders([]);
    });

    it('should execute tests', inject([], () => {
      expect(true).toBeTruthy();
    }));
});
