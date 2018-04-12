import {Component, OnInit, Input} from '@angular/core';
import {Account} from '../domain/account';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AccountService} from '../services/account.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

  account: Account;
  followers: Account[];
  following: Account[];

  editBio = false;
  editLocation = false;
  editWebsite = false;

  constructor(private route: ActivatedRoute,
              private accountService: AccountService,
              private location: Location,
              private auth: AuthenticationService) {
  }

  ngOnInit(): void {
    if (!(localStorage.getItem('nextView') === null)) {
      this.getAccount(localStorage.getItem('nextView'));
      localStorage.removeItem('nextView');
    } else {
      this.getAccount(this.auth.getUsername());
    }
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
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.accountService.updateAccount(this.account)
      .subscribe(() => this.goBack());
  }
}
