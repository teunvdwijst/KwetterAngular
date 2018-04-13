import {Account} from './account';

export class Tweet {
  id: string;
  content: string;
  published: string;
  tweetedBy: string;
  likedBy: string;
  mentionedBy: string;

  constructor(content: string, tweetedBy: string) {
    this.content = content;
    this.tweetedBy = tweetedBy;
  }
}
