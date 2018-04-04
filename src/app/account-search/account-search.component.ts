import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {of} from 'rxjs/Observable/of';

import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {AccountService} from '../account.service';
import {Account} from '../account';

@Component({
  selector: 'app-account-search',
  templateUrl: './account-search.component.html',
  styleUrls: ['./account-search.component.css']
})
export class AccountSearchComponent implements OnInit {

  accounts$: Observable<Account[]>;
  private searchTerms = new Subject<string>();

  constructor(private accountService: AccountService) {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.accounts$ = this.searchTerms.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string) => this.accountService.searchAccounts(term)),
    );
  }
}
