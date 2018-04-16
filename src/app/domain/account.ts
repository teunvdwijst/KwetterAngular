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

  constructor(id: number, username: string, email: string, groups: string, password: string, location: string, bio: string, website: string, avatarPath: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.groups = groups;
    this.password = password;
    this.location = location;
    this.bio = bio;
    this.website = website;
    this.avatarPath = avatarPath;
  }
}
