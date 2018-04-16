export class Tweet {
  id: number;
  content: string;
  published: string;
  tweetedBy: string;
  tags: string[];
  likedBy: string[];
  mentions: string[];

  constructor(id: number, content: string, published: string, tweetedBy: string, tags: string[], likedBy: string[], mentions: string[]) {
    this.id = id;
    this.content = content;
    this.published = published;
    this.tweetedBy = tweetedBy;
    this.tags = tags;
    this.likedBy = likedBy;
    this.mentions = mentions;
  }
}
