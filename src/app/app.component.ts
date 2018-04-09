import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn(): boolean {
    return !(localStorage.getItem('webtoken') === null);
  }

  username(): string {
    return localStorage.getItem('username');
  }

  public logout() {
    localStorage.removeItem('webtoken');
    localStorage.removeItem('username');
  }
}
