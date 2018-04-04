import {Injectable} from '@angular/core';
import {Account} from './account';
import {ACCOUNTS} from './mock-accounts';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable()
export class AccountService {

  private accountUrl = 'http://localhost:8080/KwetterS62/api/accounts/0';

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  private log(message: string) {
    this.messageService.add('AccountService: ' + message);
  }

  /** GET all accounts */
  getAccounts(): Observable<Account[]> {
    this.log('fetched accounts');
    // return of(ACCOUNTS);
    return this.http.get<Account[]>(this.accountUrl)
      .pipe(tap(accounts => this.log('fetched accounts')),
        catchError(this.handleError('getAccounts', [])));
  }

  /** GET account by id. Will 404 if id not found */
  getAccount(id: number): Observable<Account> {
    const url = `${this.accountUrl}/${id}`
    this.log(`fetched Account id=${id}`);
    return of(ACCOUNTS.find(account => account.id === id));
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
