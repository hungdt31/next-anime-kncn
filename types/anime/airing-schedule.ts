// Define the type for each result item
export interface TopAiringAnime {
  id: string;
  title: string;
  image: string;
  url: string;
  genres: string[]; // Array of genres
}

// Define the type for the entire response
export interface TopAiringAnimeResponse<T> {
  currentPage: number;
  hasNextPage: boolean;
  results: T[];
}