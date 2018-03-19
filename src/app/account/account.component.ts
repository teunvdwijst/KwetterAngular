import {Component, OnInit} from '@angular/core';
import {Account} from '../account';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account: Account = {
    id: 1,
    username: 'test',
    email: 'test',
    password: 'test',
    location: 'test',
    bio: 'test',
    website: 'test',
    avatarPath: 'test'
  };

  constructor() {
  }

  ngOnInit() {
  }
}
