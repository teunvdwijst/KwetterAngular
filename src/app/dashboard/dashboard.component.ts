import {Component, OnInit} from '@angular/core';
import {Tweet} from '../domain/tweet';
import {TweetService} from '../services/tweet.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tweets: Tweet[];

  constructor(private tweetService: TweetService, private auth: AuthenticationService) {
  }

  isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  username(): string {
    return this.auth.getUsername();
  }

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.getTimeline();
    } else {
      this.getRecentTweets();
    }
  }

  getRecentTweets(): void {
    this.tweetService.getRecentTweets()
      .subscribe(tweets => this.tweets = tweets);
  }

  getTimeline(): void {
    this.tweetService.getTimeline(this.username())
      .subscribe(tweets => this.tweets = tweets);
  }
}
