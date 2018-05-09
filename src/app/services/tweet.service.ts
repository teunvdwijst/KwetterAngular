import {Injectable} from '@angular/core';
import {Tweet} from '../domain/tweet';
import {Observable, Subject} from 'rxjs/Rx';
import {of} from 'rxjs/observable/of';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {WebsocketService} from '../services/websocket.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class TweetService {

  private tweetUrl = 'http://localhost:8080/KwetterS62/api/tweets';
  public messages: Subject<Tweet>;

  constructor(private http: HttpClient,
              private socketService: WebsocketService) {
    this.messages = <Subject<Tweet>>this.socketService
      .connect('ws://localhost:8080/KwetterS62/serverwsendpoint')
      .map((res: MessageEvent): Tweet => {
        const data = JSON.parse(res.data);
        return data as Tweet;
      });
  }

  private log(message: string) {
    console.log('TweetService: ' + message);
  }

  /** GET recent tweets */
  getRecentTweets(offset: number, limit: number): Observable<Tweet[]> {
    const url = `${this.tweetUrl}/recent?offset=${offset}&limit=${limit}`;
    return this.http.get(url).map(res => res as Tweet[]);
  }

  /** GET recent tweets */
  getTweetsByUser(username: string): Observable<Tweet[]> {
    const url = `${this.tweetUrl}/username/${username}`;
    return this.http.get(url).map(res => res as Tweet[]);
  }

  /** GET a users timeline tweets */
  getTimeline(offset: number, limit: number): Observable<Tweet[]> {
    const url = `${this.tweetUrl}/timeline?offset=${offset}&limit=${limit}`;
    return this.http.get(url).map(res => res as Tweet[]);
  }

  /** POST: add a new register to the server */
  addTweet(newTweet: Tweet): Observable<Tweet> {
    return this.http.post<Tweet>(this.tweetUrl, newTweet, httpOptions);
  }

  getTweetLikedBy(tweet: Tweet): Observable<any> {
    return this.http.get(tweet.likedByUri).map(res => res as Account[]);
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
