import { Title } from "../utils";
import { NextAiringEpisode, Character, Trailer } from "../utils";

interface StartDate {
  year: number;
  month: number;
  day: number;
}

interface EndDate {
  year: number;
  month: number;
  day: number;
}

export interface Recommendation {
  id: string;
  malId: string;
  title: Title;
  status: string;
  episodes: number;
  image: string;
  cover: string;
  rating: number;
  type: string;
}


export interface Relation {
  id: number;
  relationType: string;
  malId: number;
  title: Title;
  status: string;
  episodes: number;
  image: string;
  color: string;
  type: string;
  cover: string;
  rating: number;
}

interface Episode {
  id: string;
  title: string;
  episode: string;
}

export interface InfoResponse {
  id: string;
  title: Title;
  malId: number;
  trailer: Trailer;
  image: string;
  popularity: number;
  color: string;
  cover: string;
  description: string;
  status: string;
  releaseDate: number;
  startDate: StartDate;
  endDate: EndDate;
  rating: number;
  genres: string[];
  season: string;
  studios: string[];
  type: string;
  duration: number;
  currentEpisode: number;
  totalEpisodes: number;
  countryOfOrigin: string;
  recommendations: Recommendation[];
  characters: Character[];
  relations: Relation[];
  episodes: Episode[];
  nextAiringEpisode: NextAiringEpisode;
  synonyms: string[];
}
