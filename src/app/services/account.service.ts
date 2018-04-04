import {Injectable} from '@angular/core';
import {Account} from '../domain/account';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AccountService {

  private accountUrl = 'http://localhost:8080/KwetterS62/api/accounts';

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  private log(message: string) {
    this.messageService.add('AccountService: ' + message);
  }

  /** GET all accounts */
  getAccounts(): Observable<Account[]> {
    const url = `${this.accountUrl}/0`;
    return this.http.get<Account[]>(url).pipe(
      tap(_ => this.log('fetched accounts')),
      catchError(this.handleError('getAccounts', [])));
  }

  /** GET account by email. Will 404 if username not found */
  getAccount(email: string): Observable<Account> {
    const url = `${this.accountUrl}/email/${email}`;
    return this.http.get<Account>(url)
      .pipe(
        tap(_ => this.log(`fetched Account, email = ${email}`)),
        catchError(this.handleError<Account>(`getAccount email=${email}`)));
  }

  /** GET account followers by email. Will 404 if username not found */
  getAccountFollowers(email: string): Observable<Account> {
    const url = `${this.accountUrl}/followers/${email}`;
    return this.http.get<Account>(url)
      .pipe(
        tap(_ => this.log(`fetched Account followers, email = ${email}`)),
        catchError(this.handleError<Account>(`getAccount email=${email}`)));
  }

  /** GET account following by email. Will 404 if username not found */
  getAccountFollowing(email: string): Observable<Account> {
    const url = `${this.accountUrl}/following/${email}`;
    return this.http.get<Account>(url)
      .pipe(
        tap(_ => this.log(`fetched Account following, email = ${email}`)),
        catchError(this.handleError<Account>(`getAccount email=${email}`)));
  }

  /** PUT: update the account on the server */
  updateAccount(account: Account): Observable<any> {
    return this.http.put(this.accountUrl, account, httpOptions).pipe(
      tap(_ => this.log(`updated Account username=${account.username}`)),
      catchError(this.handleError<any>('updateAccount')));
  }

  /** DELETE: delete the account from the server */
  deleteAccount(account: Account | string): Observable<Account> {
    const name = typeof account === 'string' ? account : account.username;
    const url = `${this.accountUrl}/${name}`;

    return this.http.delete<Account>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Account, username=${name}`)),
      catchError(this.handleError<Account>('deleteAccount')));
  }

  /** POST: add a new account to the server */
  addAccount(newAccount: Account): Observable<Account> {
    return this.http.post(this.accountUrl, newAccount, httpOptions).pipe(
      tap((account: Account) => this.log(`added Account username=${account.username}`)),
      catchError(this.handleError<Account>('addAccount')));
  }

  /** GET accounts whose name contain the search term */
  searchAccounts(term: string): Observable<Account[]> {
    if (!term.trim()) {
      return of([]);
    }

    const searchUrl = `${this.accountUrl}/username/${term}`;
    return this.http.get<Account[]>(searchUrl).pipe(
      tap(_ => this.log(`found accounts matching "${term}"`)),
      catchError(this.handleError<Account[]>('searchAccounts', [])));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
