import {Injectable} from '@angular/core';
import {Account} from 'app/domain/account';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AccountService {

  private accountUrl = 'http://localhost:8080/KwetterS62/api/accounts';

  constructor(private http: HttpClient) {
  }

  private log(message: string) {
    console.log('AccountService: ' + message);
  }

  /** GET all accounts */
  getAccounts(): Observable<Account[]> {
    const url = `${this.accountUrl}/0`;
    return this.http.get(url).map(res => res as Account[]);
  }

  /** GET register by username. Will 404 if username not found */
  getAccount(username: string): Observable<Account> {
    const url = `${this.accountUrl}/username/${username}`;
    return this.http.get(url).map(res => res as Account);
  }

  /** GET register followers by email. Will 404 if username not found */
  getAccountFollowers(username: string): Observable<Account[]> {
    const url = `${this.accountUrl}/followers/${username}`;
    return this.http.get(url).map(res => res as Account[]);
  }

  /** GET register following by email. Will 404 if username not found */
  getAccountFollowing(username: string): Observable<Account[]> {
    const url = `${this.accountUrl}/following/${username}`;
    return this.http.get(url).map(res => res as Account[]);
  }

  /** PUT: update the register on the server */
  updateAccount(account: Account): Observable<Account> {
    return this.http.put(this.accountUrl, account, httpOptions).map(res => res as Account);
  }

  /** POST: add a new register to the server */
  addAccount(newAccount: Account): Observable<Account> {
    return this.http.post(this.accountUrl, newAccount, httpOptions).map(res => res as Account);
  }

  /** POST: add a new register to the server */
  addAccountFollowing(account: Account): Observable<any> {
    const url = `${this.accountUrl}/follow`;
    return this.http.put(url, account, httpOptions).map(res => res);
  }

  /** POST: add a new register to the server */
  removeAccountFollowing(account: Account): Observable<any> {
    const url = `${this.accountUrl}/unfollow`;
    return this.http.put(url, account, httpOptions).map(res => res);
  }
}
