import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Account} from '../domain/account';
import {AccountService} from '../services/account.service';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  error = '';

  registerForm = new FormGroup({
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
  }

  add(): void {
    const email = this.registerForm.get('email').value;
    const username = this.registerForm.get('username').value;
    const password = this.registerForm.get('password').value;

    if (username === null || username === '') {
      this.error = 'Enter a username';
      return;
    }

    if (password === null || password === '') {
      this.error = 'Enter a password';
      return;
    }

    if (email === null || email === '') {
      this.error = 'Enter an email';
      return;
    }

    this.accountService.addAccount(new Account(username, email, password));
  }
}
