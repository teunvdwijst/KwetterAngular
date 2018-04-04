import {Injectable} from '@angular/core';
import {Tweet} from '../domain/tweet';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Account} from '../domain/account';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class TweetService {

  private tweetUrl = 'http://localhost:8080/KwetterS62/api/tweets';

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  private log(message: string) {
    this.messageService.add('TweetService: ' + message);
  }

  /** GET recent tweets */
  getRecentTweets(): Observable<Tweet[]> {
    const url = `${this.tweetUrl}/recent/0`;
    return this.http.get<Tweet[]>(url).pipe(
      tap(_ => this.log('fetched recent tweets')),
      catchError(this.handleError('getRecentTweets', [])));
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
