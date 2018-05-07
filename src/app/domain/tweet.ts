export class Tweet {
  id: number;
  content: string;
  published: string;
  tweetedBy: string;
  tweetedByUri: string;
  tagsUri: string;
  hasBeenLiked: boolean;
  likedByUri: string;
  likedBySize: string;
  mentionsUri: string;

  constructor(id: number, content: string, published: string, tweetedBy: string, hasBeenLiked: boolean,
              tweetedByUri: string, tags: string, likedBy: string, likedBySize: string, mentions: string) {
    this.id = id;
    this.content = content;
    this.published = published;
    this.tweetedBy = tweetedBy;
    this.tweetedByUri = tweetedBy;
    this.hasBeenLiked = hasBeenLiked,
      this.tagsUri = tags;
    this.likedByUri = likedBy;
    this.likedBySize = likedBySize;
    this.mentionsUri = mentions;
  }
}
