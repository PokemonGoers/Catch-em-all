import { Page, Events, PopoverController } from 'ionic-angular';
import { FilterPopoverComponent } from '../../components/filter-popover/filter-popover.component';

@Page({
  templateUrl: 'pages/map/map.page.html'
})
export class MapPage {
    filter = {
      time: {
        lower: 0,
        upper: 60
      }
    }
    

  constructor(private popoverCtrl: PopoverController, public events: Events) {
    events.subscribe('filter:changed:time', (time: Object) => {
      this.filter.time = time[0]
    })
   }

  public showFilterPopover($event?): void {
    let popover = this.popoverCtrl.create(FilterPopoverComponent, this.filter);
    popover.present({
      ev: $event
    });
  }
}