import { addProviders, beforeEach, it, describe, expect, inject } from '@angular/core/testing';
import { Config, NavParams } from 'ionic-angular';
import { MapPage } from './map.page';
import { Events } from 'ionic-angular';
import { ConfigService } from '../../services/config.service';

describe('Map', () => {
    let configService: ConfigService;
    let navParams: NavParams;
    let mapPage: MapPage;

    beforeEach(() => {
        configService = new ConfigService();
        navParams = new NavParams();
        mapPage = new MapPage(navParams, configService);
        addProviders([]);
    });

    it('should execute tests', inject([], () => {
      expect(true).toBeTruthy();
    }));
});
