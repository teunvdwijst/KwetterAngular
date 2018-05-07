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
  tweets: string;
  following: string;
  followers: string;

  constructor(id: number, username: string, email: string, groups: string, password: string,
              location: string, bio: string, website: string, avatarPath: string,
              tweets: string, following: string, followers: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.groups = groups;
    this.password = password;
    this.location = location;
    this.bio = bio;
    this.website = website;
    this.avatarPath = avatarPath;
    this.tweets = tweets;
    this.followers = followers;
    this.following = following;
  }
}
