import {Injectable} from '@angular/core';
import {Tweet} from '../domain/tweet';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class TweetService {

  private tweetUrl = 'http://localhost:8080/KwetterS62/api/tweets';

  constructor(private http: HttpClient) {
  }

  private log(message: string) {
    console.log('TweetService: ' + message);
  }

  /** GET recent tweets */
  getRecentTweets(offset: number, limit: number): Observable<Tweet[]> {
    const url = `${this.tweetUrl}/recent?offset=${offset}&limit=${limit}`;
    return this.http.get(url).map(res => res as Tweet[]);
  }

  /** GET a users timeline tweets */
  getTimeline(offset: number, limit: number): Observable<Tweet[]> {
    const url = `${this.tweetUrl}/timeline?offset=${offset}&limit=${limit}`;
    return this.http.get(url).map(res => res as Tweet[]);
  }

  /** POST: add a new register to the server */
  addTweet(newTweet: Tweet): Observable<Tweet> {
    console.log('CONTENT -> ' + newTweet.content);
    return this.http.post<Tweet>(this.tweetUrl, newTweet, httpOptions);
  }

  /** POST: add a new register to the server */
  likeTweet(tweet: Tweet): Observable<any> {
    const url = `${this.tweetUrl}/like`;
    return this.http.post(url, tweet, httpOptions);
  }

  /** POST: add a new register to the server */
  unlikeTweet(tweet: Tweet): Observable<any> {
    const url = `${this.tweetUrl}/unlike`;
    return this.http.post(url, tweet, httpOptions);
  }
}
