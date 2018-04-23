import {Component, OnInit, Input} from '@angular/core';
import {Account} from '../domain/account';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from '../services/account.service';
import {AuthenticationService} from '../services/authentication.service';
import {forEach} from '@angular/router/src/utils/collection';
import {Tweet} from '../domain/tweet';
import {TweetService} from '../services/tweet.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

  account: Account;
  followers: Account[];
  following: Account[];
  tweets: Tweet[];

  editBio = false;
  editLocation = false;
  editWebsite = false;

  constructor(private route: ActivatedRoute,
              private accountService: AccountService,
              private auth: AuthenticationService,
              private tweetService: TweetService) {
  }

  ngOnInit(): void {
    let username;
    this.route.params.subscribe(params => {
      username = params['username'];
    });
    if (username == null || username === '') {
      this.getAccount(this.auth.getUsername());
      return;
    }
    this.getAccount(username);
  }

  accountOwner(): boolean {
    return this.account.username === this.auth.getUsername();
  }

  isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  accountFollowing(): boolean {
    let result = false;
    this.followers.forEach((obj) => {
      if (obj.username === this.auth.getUsername()) {
        result = true;
      }
    });
    return result;
  }

  changeLocationField(): void {
    this.editLocation = !this.editLocation;
  }

  changeWebsiteField(): void {
    this.editWebsite = !this.editWebsite;
  }

  changeBioField(): void {
    this.editBio = !this.editBio;
  }

  getAccount(username: string): void {
    this.accountService.getAccount(username).subscribe(account => {
      this.account = account;
    });
    this.accountService.getAccountFollowers(username).subscribe(followers => {
      this.followers = followers;
    });
    this.accountService.getAccountFollowing(username).subscribe(following => {
      this.following = following;
    });
    this.tweetService.getTweetsByUser(username).subscribe(tweets => {
      this.tweets = tweets;
    });
  }

  save(): void {
    this.accountService.updateAccount(this.account).subscribe();
  }

  addFollowing(account: Account): void {
    this.accountService.addAccountFollowing(account).subscribe();
    this.accountService.getAccount(this.auth.getUsername()).subscribe(res => {
      this.followers.unshift(res);
    });
  }

  removeFollowing(account: Account): void {
    this.accountService.removeAccountFollowing(account).subscribe();
    this.accountService.getAccount(this.auth.getUsername()).subscribe(res => {
      this.followers = this.followers.filter(temp => this.auth.getUsername() !== temp.username);
    });
  }
}
