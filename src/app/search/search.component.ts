import {Component, OnChanges, OnInit} from '@angular/core';
import {AccountService} from '../services/account.service';
import {Account} from '../domain/account';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResults: Account[];

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.searchStringChanged('');
  }

  searchStringChanged(searchTerm: string): void {
    this.accountService.searchAccounts(searchTerm).subscribe(res => {
      this.searchResults = res;
    });
  }
}
