import { addProviders, beforeEach, it, describe, expect, inject } from '@angular/core/testing';
import { MapPage } from './map.page';
import { Events } from 'ionic-angular';
import { App, PopoverController, Platform, Config, NavParams } from 'ionic-angular';

describe('Map', () => {
    let config: Config
    let platform: Platform
    let app: App
    let popoverCtrl: PopoverController
    let events: Events
    let navParams: NavParams
    let mapPage: MapPage

    beforeEach(() => { 
        config = new Config()
        platform = new Platform()
        app = new App(config, platform);
        popoverCtrl = new PopoverController(app)
        events = new Events()
        navParams = new NavParams()
        mapPage = new MapPage(popoverCtrl, events, navParams)
        addProviders([])
    });

    it('should be created with a filter', inject([], () => {
        let result = mapPage.filter
        
        expect(result).toEqual({
            time: {
                lower: 0,
                upper: 60
            }
        }) //TODO: Expect to have time.lower: number and time.upper: number
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