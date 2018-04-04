import {Injectable} from '@angular/core';
import {Account} from './account';
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
      tap(accounts => this.log('fetched accounts')),
      catchError(this.handleError('getAccounts', [])));
  }

  /** GET account by id. Will 404 if username not found */
  getAccount(username: string): Observable<Account> {
    const url = `${this.accountUrl}/username/${username}`;
    return this.http.get<Account>(url)
      .pipe(
        tap(_ => this.log(`fetched Account, username = ${username}`)),
        catchError(this.handleError<Account>(`getAccount username=${username}`)));
  }

  updateAccount(account: Account): Observable<any> {
    return this.http.put(this.accountUrl, account, httpOptions).pipe(
      tap(_ => this.log(`updated Account username=${account.username}`)),
      catchError(this.handleError<any>('updateAccount')));
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
