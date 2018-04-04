import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Tweet} from '../domain/tweet';
import {TweetService} from '../services/tweet.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TweetComponent implements OnInit {

  tweets: Tweet[];

  constructor(private tweetService: TweetService) {
  }

  ngOnInit() {
    this.getTweets();
  }

  getTweets(): void {
    this.tweetService.getRecentTweets()
      .subscribe(tweets => this.tweets = tweets);
  }

  add(content: string, publishedBy: string): void {
    content = content.trim();
    publishedBy = publishedBy.trim();

    if (!content || !publishedBy) {
      return;
    }
  }

}
