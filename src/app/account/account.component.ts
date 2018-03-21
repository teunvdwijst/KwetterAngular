import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Account} from '../account';
import {ACCOUNTS} from '../mock-accounts';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit {

  accounts = ACCOUNTS;
  selectedAccount: Account;

  constructor() {
  }

  ngOnInit() {
  }

  onSelect(account: Account): void {
    this.selectedAccount = account;
  }
}
