import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';

import { PokeSighting } from '../../models/poke-sighting';

@Component({
  selector: 'poke-poi-bubble',
  templateUrl: './poi-bubble.component.html',
  styleUrls: ['./poi-bubble.component.scss']
})
export class POIBubbleComponent implements OnInit {

  @Input() pokePOI: PokeSighting;
  @ViewChild('circle') circle: ElementRef;

  arcHighlightColor = '#FFF75A';
  arcBackgroundColor = '#F9F9F9';

  constructor() { }

  ngOnInit() {
    let appearedOn = (new Date(this.pokePOI.appearedOn)).getTime() / 1000;
    let now = Date.now() / 1000;
    let diff = Math.max(Math.log((now -appearedOn) / 1000), 1);
    let max = Math.log(30 * 86400 / 1000);
    let ratio = diff / max * -1;

    this.upateArc(ratio);
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
