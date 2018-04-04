import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Account} from '../account';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit {

  accounts: Account[];

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts(): void {
    this.accountService.getAccounts()
      .subscribe(accounts => this.accounts = accounts);
  }

  delete(account: Account): void {
    this.accounts = this.accounts.filter(a => a !== account);
    this.accountService.deleteAccount(account).subscribe();
  }

  add(name: string, email: string, password: string): void {
    email = email.trim();
    name = name.trim();
    password = password.trim();

    if (!name || !email || !password) {
      return;
    }
    this.accountService.addAccount(new Account(name, email, password))
      .subscribe(account => {
        this.accounts.push(account);
      });
  }
}
