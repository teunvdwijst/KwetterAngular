import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Tweet} from '../domain/tweet';
import {TweetService} from '../services/tweet.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TweetComponent implements OnInit {

  tweets: Tweet[];

  constructor(private tweetService: TweetService, private auth: AuthenticationService) {
  }

  isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.getTimeline();
    } else {
      this.getRecentTweets();
    }
  }

  setNextView(username: string): void {
    localStorage.setItem('nextView', username);
  }

  getRecentTweets(): void {
    this.tweetService.getRecentTweets()
      .subscribe(tweets => this.tweets = tweets);
  }

  getTimeline(): void {
    this.tweetService.getTimeline(this.auth.getUsername())
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
