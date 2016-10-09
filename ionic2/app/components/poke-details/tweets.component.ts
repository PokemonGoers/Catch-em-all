import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';

@Component({
  template: require('./tweets.component.html'),
  styles: [require('./tweets.component.scss')],
  selector: 'tweets'
})

export class TweetsComponent {

  @Input() pokemon: Pokemon;

  tweetArray: Object[];

  slideOptions = {
    loop: true,
    autoplay: 3000
  };

  ngOnInit() {
    this.tweetArray = [];
    for(var i = 0; i < 20; i++) {
      var tweet = {
        "id": 12345 + i,
        "text": "Lorem ipsum dolor sit amet, " + this.pokemon.name + " adipiscing elit",
        "coordinates": [0, 0],
        "timestamp": this.timestampToDate((Date.now() / 1000) + i | 0)
      }
      this.tweetArray.push(tweet);
    }
  }

  // http://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
  timestampToDate(timestamp)
  {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(timestamp*1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  }
}
