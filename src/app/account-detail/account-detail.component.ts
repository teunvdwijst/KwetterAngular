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

  @Input() account: Account;

  constructor(private route: ActivatedRoute,
              private accountService: AccountService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.accountService.getAccount(id).subscribe(account => this.account = account);
  }

  goBack(): void {
    this.location.back();
  }
}
