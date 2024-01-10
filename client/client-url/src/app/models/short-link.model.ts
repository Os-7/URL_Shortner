export class ShortLink {
    id: string;
    originalURL: string;
    shortURL: string;
    analytics: any; // Add properties for analytics if needed
  
    constructor(id: string, originalURL: string, shortURL: string, analytics: any) {
      this.id = id;
      this.originalURL = originalURL;
      this.shortURL = shortURL;
      this.analytics = analytics;
    }
}