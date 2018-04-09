import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [AuthenticationService]
})

export class LoginComponent implements OnInit {

  error = '';

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  public login(): void {
    this.auth.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .subscribe(result => {
        localStorage.setItem('webtoken', result.headers.get('Authorization'));
        localStorage.setItem('username', this.loginForm.get('username').value);
        this.router.navigate(['/']);
      }, err => {
        if (err.status === 401) {
          this.error = 'Username or Password incorrect';
        } else {
          this.error = err.toString();
        }
      });
  }
}
