type AnimeTitle = {
  romaji: string;
  english: string;
  native: string;
  userPreferred: string;
};

export type SearchAnime = {
  id: string;
  malId: number;
  title: AnimeTitle;
  status: string;
  image: string;
  imageHash: string;
  cover: string;
  coverHash: string;
  popularity: number;
  totalEpisodes: number;
  currentEpisode: number | null;
  countryOfOrigin: string;
  description: string;
  genres: string[];
  rating: number;
  color: string;
  type: string;
  releaseDate: number;
};

export type SearchAnimeResponse<T> = {
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
  totalResults: number;
  results: T[];
};
