import {Account} from './account';

export class Tweet {
  id: number;
  content: string;
  published: string;
  tweetedBy: Account;
  likedBy: string;

  constructor(content: string, tweetedBy: Account) {
    this.content = content;
    this.tweetedBy = tweetedBy;
  }
}
