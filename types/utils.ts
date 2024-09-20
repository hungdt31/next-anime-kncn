import { Trailer } from "./anime/random-anime";
export interface Layout {
  children: React.ReactNode;
}
export interface Title {
  romaji: string;
  english?: string;
  native: string;
  userPreferred?: string;
}

export interface Anime {
  id: string;
  malId: number;
  title: Title;
  image: string;
  trailer: Trailer;
  description: string;
  status: string;
  cover: string;
  rating: number;
  releaseDate: number;
  color: string;
  genres: string[];
  totalEpisodes: number;
  duration: number;
  type: string;
}