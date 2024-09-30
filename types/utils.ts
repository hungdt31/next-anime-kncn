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
export interface NextAiringEpisode {
  airingTime: number;
  timeUntilAiring: number;
  episode: number;
}

export interface VoiceActor {
  id: number;
  language: string;
  name: Name;
  image: string;
}

export interface Name {
  first: string;
  last?: string;
  full: string;
  native?: string;
  userPreferred: string;
}

export interface Character {
  id: number;
  role: string;
  name: Name;
  image: string;
  voiceActors: VoiceActor[];
}

export interface Trailer {
  id: string;
  site: string;
  thumbnail: string;
  thumbnailHash: string
}