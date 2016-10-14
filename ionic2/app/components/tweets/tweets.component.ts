import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'poke-tweets',
  template: require('./tweets.component.html'),
  styles: [require('./tweets.component.scss')]
})

export class TweetsComponent {

  @Input() pokemonName: string;

  tweetsArray: Object[];

  slideOptions = {
    loop: true,
    autoplay: 3000
  };

  ngOnInit() {
    /* Mock data */
    this.tweetsArray = [];
    for(let i = 0; i < 20; i++) {
      const tweet = {
        id: 12345 + i,
        text: 'Lorem ipsum dolor sit amet, ' + this.pokemonName + ' adipiscing elit',
        coordinates: [0, 0],
        timestamp: this.timestampToDate((Date.now() / 1000) + i | 0)
      }
      this.tweetsArray.push(tweet);
    }
  }

  // We will get timestamps from the api, here is a function for converting
  // http://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
  timestampToDate(timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const date = new Date(timestamp*1000);
    // Hours part from the timestamp
    const hours = date.getHours();
    // Minutes part from the timestamp
    const minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    const seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  }
}
