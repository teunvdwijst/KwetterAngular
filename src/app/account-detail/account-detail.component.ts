import {Component, OnInit, Input} from '@angular/core';
import {Account} from '../account';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AccountService} from '../account.service';

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
    const username = this.route.snapshot.paramMap.get('username');
    this.accountService.getAccount(username).subscribe(account => {
      this.account = account;
    });
    console.log(JSON.stringify(this.account));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    // this.accountService.updateAccount(this.account)
    //  .subscribe(() => this.goBack());
  }
}
