interface AnimeTitle {
  romaji: string;
  english: string;
  native: string;
  userPreferred: string;
}

interface AnimeTrailer {
  id: string;
  site: string;
  thumbnail: string;
  thumbnailHash: string;
}

export interface TrendingAnime {
  id: string;
  malId: number;
  title: AnimeTitle;
  image: string;
  imageHash: string;
  trailer?: AnimeTrailer; // Optional since some entries might not have a trailer
  description: string;
  status: string;
  cover: string;
  coverHash: string;
  rating: number;
  releaseDate: number;
  color: string;
  genres: string[];
  totalEpisodes: number;
  duration: number;
  type: string;
}

export interface TrendingResponse <T> {
  currentPage: number;
  results: T[];
}