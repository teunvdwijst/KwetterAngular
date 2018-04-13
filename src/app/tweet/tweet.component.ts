import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Tweet} from '../domain/tweet';
import {TweetService} from '../services/tweet.service';
import {AuthenticationService} from '../services/authentication.service';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TweetComponent implements OnInit {

  tweets: Tweet[] = [];
  loadAmount = 10;

  constructor(private tweetService: TweetService, private auth: AuthenticationService) {
  }

  isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  ngOnInit() {
    this.loadTweets();
  }

  loadTweets(): void {
    if (this.isLoggedIn()) {
      this.getTimeline();
    } else {
      this.getRecentTweets();
    }
  }

  onScroll(): void {
    this.loadTweets();
  }

  getRecentTweets(): void {
    this.tweetService.getRecentTweets(this.tweets.length, this.loadAmount)
      .subscribe(tweets => {
        this.tweets = this.tweets.concat(tweets);
      });
  }

  getTimeline(): void {
    this.tweetService.getTimeline(this.tweets.length, this.loadAmount)
      .subscribe(tweets => {
        this.tweets = this.tweets.concat(tweets);
      });
  }

  add(content: string, publishedBy: string): void {
    content = content.trim();
    publishedBy = publishedBy.trim();

    if (!content || !publishedBy) {
      return;
    }
  }
}
