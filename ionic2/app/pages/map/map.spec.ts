import { addProviders, beforeEach, it, describe, expect, inject } from '@angular/core/testing';
import { MapPage } from './map';
import { Events } from 'ionic-angular';
import { App, PopoverController, Platform, Config } from 'ionic-angular';

describe('Map', () => {
    let config: Config
    let platform: Platform
    let app: App
    let popoverCtrl: PopoverController
    let events: Events
    let mapPage: MapPage

    beforeEach(() => { 
        config = new Config
        platform = new Platform
        app = new App(config, platform);
        popoverCtrl = new PopoverController(app)
        events = new Events()
        mapPage = new MapPage(popoverCtrl, events)
        addProviders([])
    });

    it('should be created with a filter', inject([], () => {
        let result = mapPage.filter
        
        expect(result).toEqual({
            time: {
                lower: 0,
                upper: 7
            }
        })
    }))

    it('should respond to filter:time:changed', inject([], () => {
        events.publish('filter:changed:time', {lower: -10, upper: 10})
        let result = mapPage.filter
        
        expect(result).toEqual({
            time: {
                lower: -10,
                upper: 10
            }
        })
    }))
})