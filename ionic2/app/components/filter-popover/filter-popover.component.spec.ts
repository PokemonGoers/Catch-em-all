import { addProviders, beforeEach, it, describe, expect, inject } from '@angular/core/testing';
import { Events, ViewController } from 'ionic-angular';
import { FilterPopoverComponent } from './filter-popover.component';

describe('FilterPopover', () => {
    let viewCtrl: ViewController
    let events: Events
    let filterPopover: FilterPopoverComponent

    beforeEach(() => { 
        viewCtrl = new ViewController(FakePage)
        events = new Events()
        filterPopover = new FilterPopoverComponent(viewCtrl, events)
        addProviders([])
    });

    it('should respond to changes', inject([], () => {
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