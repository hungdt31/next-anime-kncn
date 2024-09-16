export interface SearchAnime {
  id: string;
  title: string;
  image: string;
  type: string;
  rating: number;
  releaseDate: string
}
export interface SearchAnimeResponse <T> {
  currentPage: number;
  results: T[];
}