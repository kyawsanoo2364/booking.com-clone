export interface Listing {
  url: string;
  title: string;
  rating_review_count: string;
  rating_count: string;
  description: string;
  price: string;
  link: string;
  booking_metadata: string;
  rating_word: string;
}

export interface Result {
  content: {
    listings: Listing[];
    total_listings: string;
  };
}
