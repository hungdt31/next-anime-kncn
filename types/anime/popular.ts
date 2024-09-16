export interface PopularAnime {
  id: string;
  title: string;
  image: string;
  type: string;
  rating: number;
  releaseDate: string;
}

export interface PopularResponse <T> {
  currentPage: number;
  results: T[];
}