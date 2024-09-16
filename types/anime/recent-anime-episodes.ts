interface AnimeTitle {
  romaji: string;
  english: string;
  native: string;
}

export interface RecentEpisode {
  id: string;
  malId: string;
  title: AnimeTitle;
  image: string;
  imageHash: string;
  episodeId: string;
  episodeTitle: string;
  episodeNumber: number;
  type: string;
}

export interface RecentEpisodesResponse<T> {
  currentPage: number;
  totalResults: number;
  results: T[];
}