// ShortLink model class representing a shortened URL with analytics
export class ShortLink {
  // Properties of the ShortLink class
  id: string; // Unique identifier for the short link
  originalURL: string; // Original URL that is shortened
  shortURL: string; // Shortened URL
  analytics: any; // Analytics data for the short link

  // Constructor to initialize ShortLink properties
  constructor(id: string, originalURL: string, shortURL: string, analytics: any) {
    this.id = id; // Assign the provided id
    this.originalURL = originalURL; // Assign the provided original URL
    this.shortURL = shortURL; // Assign the provided short URL
    this.analytics = analytics; // Assign the provided analytics data
  }
}
