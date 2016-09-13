import { DomSanitizationService } from '@angular/platform-browser';
import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';

import { Pokemon } from '../../models/pokemon';
import { Sighting } from '../../models/sighting';
import { PokePOI } from '../../models/poke-poi';

@Component({
  templateUrl: 'components/poke-poi-bubble/poke-poi-bubble.component.html',
  selector: 'poke-poi-bubble',
  directives: [PokePOIBubbleComponent]
})
export class PokePOIBubbleComponent implements OnInit {

  @Input() pokePOI: PokePOI;
  @ViewChild('circle') circle: ElementRef;

  backgroundImageStyle;

  constructor(private sanitizer: DomSanitizationService) {}

  ngOnInit() {
    let angle = 200;
    let color = 'black';

    let deg1 = 90;
    let deg2 = angle > 0 ? 90 + angle : 270 + angle;
    let color3 = color;

    let color1, color2, color4;
    if (angle < -180) {
      color1 = color;
      color2 = 'transparent';
      color4 = 'white';
    } else if (angle >= -180 && angle < 0) {
      color1 = 'transparent';
      color2 = 'white';
      color4 = 'white';
    } else if (angle <= 180) {
      color1 = 'white';
      color2 = 'transparent';
      color4 = 'transparent';
    } else {
      color1 = 'transparent';
      color2 = color;
      color4 = 'white';
    }

    this.circle.nativeElement.style.backgroundImage = `
      linear-gradient(${deg1}deg, ${color1} 50%, ${color2} 50%),
      linear-gradient(${deg2}deg, ${color3} 50%, ${color4} 50%)`;
  }

}