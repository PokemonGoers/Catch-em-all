import {addProviders, beforeEach, it, describe, expect, inject} from "@angular/core/testing";
import {App, Platform, Config, NavParams} from "ionic-angular";
import {MapPage} from "./map.page";

describe('Map', () => {
  let config: Config;
  let platform: Platform;
  let app: App;
  let navParams: NavParams;
  let mapPage: MapPage;

  beforeEach(() => {
    config = new Config();
    platform = new Platform();
        app = new App(config, platform);
    navParams = new NavParams();
    mapPage = new MapPage(navParams);
    addProviders([]);
    });

    it('should be created with a filter', inject([], () => {
      let result = mapPage.filter;

      expect(result).toBeDefined();
    }))
});
