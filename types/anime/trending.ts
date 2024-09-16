export interface TrendingAnime {
  id: string;
  title: string;
  image: string;
  type: string;
  rating: number;
  releaseDate: string;
}

export interface TrendingResponse <T> {
  currentPage: number;
  results: T[];
}