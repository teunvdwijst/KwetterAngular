import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Account} from '../domain/account';
import {AccountService} from '../services/account.service';
import {FormControl, FormGroup} from '@angular/forms';

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

    if (this.registerForm.get('username').value === null || this.registerForm.get('username').value === '') {
      this.error = 'Enter a username';
      return;
    }

    if (this.registerForm.get('password').value === null || this.registerForm.get('password').value === '') {
      this.error = 'Enter a password';
      return;
    }

    if (this.registerForm.get('email').value === null || this.registerForm.get('email').value === '') {
      this.error = 'Enter an email';
      return;
    }
    const email = this.registerForm.get('email').value;
    const username = this.registerForm.get('username').value;
    const password = this.registerForm.get('password').value;

    if (!name || !email || !password) {
      return;
    }

    this.accountService.addAccount(new Account(name, email, password));
  }
}
