import { addProviders, beforeEach, async, it, describe, expect, inject } from '@angular/core/testing';
import { MapPage } from '../map';
import { App, ViewController, ionicBootstrap, Platform, Config, Events, NavParams } from 'ionic-angular';
import { FilterPopover } from './filterpopover';

describe('Map', () => {
    let config: Config
    let platform: Platform
    let app: App
    let viewCtrl: ViewController
    let events: Events
    let mapPage: MapPage
    let filterPopover: FilterPopover
    let navParams: NavParams

    beforeEach(() => { 
        config = new Config()
        platform = new Platform()
        app = new App(config, platform);
        viewCtrl = new ViewController(FakePage)
        navParams = new NavParams()
        events = new Events()
        filterPopover = new FilterPopover(viewCtrl, events)
        addProviders([])
    });

    it('should emit filter:time:changed', inject([], () => {
        spyOn(filterPopover, 'onChange')
        filterPopover.setTime(1, 2)
        expect(filterPopover.onChange).toHaveBeenCalled()
    }))

    it('should emit filter:time:changed', inject([], () => {
        let result: Object
        let mockSubscriber = events.subscribe('filter:changed:time', (data: Object) => {
            result = data[0]
        })

        filterPopover.setTime(1, 2)
        expect(result).toEqual({
                lower: 1,
                upper: 2
            })
    }))

    class FakePage {}
})