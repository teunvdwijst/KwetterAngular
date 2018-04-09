import {Account} from './account';

export class Tweet {
  id: number;
  content: string;
  published: string;
  tweetedBy: Account;
  likedBy: string;
  mentionedBy: string;
}
