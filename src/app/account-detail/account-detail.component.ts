import {Component, OnInit, Input} from '@angular/core';
import {Account} from '../domain/account';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AccountService} from '../services/account.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

  account: Account;

  constructor(private route: ActivatedRoute,
              private accountService: AccountService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount(): void {
    const username = localStorage.getItem('username');
    this.accountService.getAccount(username).subscribe(account => {
      this.account = account;
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
