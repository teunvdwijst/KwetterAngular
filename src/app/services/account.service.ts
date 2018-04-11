import {Injectable} from '@angular/core';
import {Account} from 'app/domain/account';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

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
    return this.http.get<Account[]>(url).pipe(
      tap(_ => this.log('fetched accounts')),
      catchError(this.handleError('getAccounts', [])));
  }

  /** GET register by username. Will 404 if username not found */
  getAccount(username: string): Observable<Account> {
    const url = `${this.accountUrl}/username/${username}`;
    return this.http.get<Account>(url)
      .pipe(
        tap(_ => this.log(`fetched Account, username = ${username}`)),
        catchError(this.handleError<Account>(`getAccount username=${username}`)));
  }

  /** GET register followers by email. Will 404 if username not found */
  getAccountFollowers(username: string): Observable<Account> {
    const url = `${this.accountUrl}/followers/${username}`;
    return this.http.get<Account>(url)
      .pipe(
        tap(_ => this.log(`fetched Account followers, username = ${username}`)),
        catchError(this.handleError<Account>(`getAccount username=${username}`)));
  }

  /** GET register following by email. Will 404 if username not found */
  getAccountFollowing(username: string): Observable<Account> {
    const url = `${this.accountUrl}/following/${username}`;
    return this.http.get<Account>(url)
      .pipe(
        tap(_ => this.log(`fetched Account following, username = ${username}`)),
        catchError(this.handleError<Account>(`getAccount username=${username}`)));
  }

  /** PUT: update the register on the server */
  updateAccount(account: Account): Observable<any> {
    return this.http.put(this.accountUrl, account, httpOptions).pipe(
      tap(_ => this.log(`updated Account username=${account.username}`)),
      catchError(this.handleError<any>('updateAccount')));
  }

  /** DELETE: delete the register from the server */
  deleteAccount(account: Account | string): Observable<Account> {
    const name = typeof account === 'string' ? account : account.username;
    const url = `${this.accountUrl}/${name}`;

    return this.http.delete<Account>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Account, username=${name}`)),
      catchError(this.handleError<Account>('deleteAccount')));
  }

  /** POST: add a new register to the server */
  addAccount(newAccount: Account): Observable<Account> {
    return this.http.post(this.accountUrl, newAccount, httpOptions).pipe(
      tap((account: Account) => this.log(`added Account username=${account.username}`)),
      catchError(this.handleError<Account>('addAccount')));
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
