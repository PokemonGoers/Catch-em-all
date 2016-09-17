import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';

import { Pokemon } from '../../models/pokemon';
import { PokeSighting } from '../../models/poke-sighting';
import { PokePOI } from '../../models/poke-poi';

@Component({
  template: require('./poke-poi-bubble.component.html'),
  styles: [require('./poke-poi-bubble.component.scss')],
  selector: 'poke-poi-bubble',
  directives: [PokePOIBubbleComponent]
})
export class PokePOIBubbleComponent implements OnInit {

  @Input() pokePOI: PokePOI;
  @ViewChild('circle') circle: ElementRef;

  arcHighlightColor = '#FFF75A';
  arcBackgroundColor = '#F9F9F9';

  ngOnInit() {
    // TODO Set arcPercentage according to sighting or prediction time
    this.upateArc(0.3);
  }

  upateArc(arcPercentage) {
    let angle = arcPercentage * 360;

    let deg1 = 90;
    let deg2 = angle > 0 ? 90 + angle : 270 + angle;
    let color3 = this.arcHighlightColor;

    let color1, color2, color4;
    if (angle < -180) {
      color1 = this.arcHighlightColor;
      color2 = 'transparent';
      color4 = this.arcBackgroundColor;
    } else if (angle >= -180 && angle < 0) {
      color1 = 'transparent';
      color2 = this.arcBackgroundColor;
      color4 = this.arcBackgroundColor;
    } else if (angle <= 180) {
      color1 = this.arcBackgroundColor;
      color2 = 'transparent';
      color4 = 'transparent';
    } else {
      color1 = 'transparent';
      color2 = this.arcHighlightColor;
      color4 = this.arcBackgroundColor;
    }

    this.circle.nativeElement.style.backgroundImage = `
      linear-gradient(${deg1}deg, ${color1} 50%, ${color2} 50%),
      linear-gradient(${deg2}deg, ${color3} 50%, ${color4} 50%)`;
  }

}
