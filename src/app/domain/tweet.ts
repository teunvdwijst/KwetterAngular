import {Account} from './account';

export class Tweet {
  id: number;
  content: string;
  published: string;
  tweetedBy: string;
  tags: string[];
  likedBy: string[];
  mentions: string[];

  constructor(content: string, tweetedBy: string) {
    this.content = content;
    this.tweetedBy = tweetedBy;
  }
}
