import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Account} from '../domain/account';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthenticationService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  loginUrl = 'http://localhost:8080/KwetterS62/api/accounts/login';

  constructor(private http: HttpClient) {
  }

  getToken(): string {
    return localStorage.getItem('webtoken');
  }

  getUsername(): string {
    return localStorage.getItem('username');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return tokenNotExpired(null, token);
  }

  public login(username: string, password: string): Observable<any> {
    const account = new Account(username, null, password);
    return this.http.post(this.loginUrl, account, {headers: this.httpOptions.headers, observe: 'response'});
  }
}
