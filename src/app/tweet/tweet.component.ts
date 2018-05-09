import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Tweet} from '../domain/tweet';
import {TweetService} from '../services/tweet.service';
import {AuthenticationService} from '../services/authentication.service';
import {FormControl, FormGroup} from '@angular/forms';
import {AccountService} from '../services/account.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TweetComponent implements OnInit {

  tweetForm = new FormGroup({
    inputTweet: new FormControl()
  });

  tweets: Tweet[] = [];
  loadAmount = 10;

  constructor(private tweetService: TweetService,
              private auth: AuthenticationService,
              private accountService: AccountService) {
    this.tweetService.messages.subscribe(msg => {
      this.tweets.push(msg as Tweet);
    });
  }

  ngOnInit() {
    this.loadTweets();
  }

  isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
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

  addTweet(): void {
    try {
      const input = <string>this.tweetForm.get('inputTweet').value;
      if (input.trim().length > 0) {
        const newTweet = new Tweet(null, input.trim(), null, this.auth.getUsername(), false, null, null, null, null, null);
        this.tweetService.addTweet(newTweet).subscribe(res => {
          this.tweets.unshift(res);
        });
        this.tweetForm.reset();
      }
    } catch (ex) {
      return;
    }
  }

  likeTweet(tweet: Tweet): void {
    if (!tweet.hasBeenLiked) {
      this.tweetService.likeTweet(tweet).subscribe(res => {
        this.tweets[this.tweets.indexOf(tweet)] = res;
      });
    } else {
      this.tweetService.unlikeTweet(tweet).subscribe(res => {
        this.tweets[this.tweets.indexOf(tweet)] = res;
      });
    }
  }
}
