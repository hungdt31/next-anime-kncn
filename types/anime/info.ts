interface Trailer {
  id: string;
  site: string;
  thumbnail: string;
}

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

interface Recommendation {
  id: string;
  malId: string;
  title: string[];
  status: string;
  episodes: number;
  image: string;
  cover: string;
  rating: number;
  type: string;
}

interface Character {
  id: string;
  role: string;
  name: string[];
  image: string;
}

interface Relation {
  id: number;
  relationType: string;
  malId: number;
  title: string[];
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
  title: string[];
  malId: number;
  trailer: Trailer;
  image: string;
  popularity: number;
  color: string;
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
  recommendations: Recommendation[];
  characters: Character[];
  relations: Relation[];
  episodes: Episode[];
}
