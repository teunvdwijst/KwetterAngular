export class Account {
  id: number;
  username: string;
  email: string;
  groups: string;
  password: string;
  location: string;
  bio: string;
  website: string;
  avatarPath: string;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
