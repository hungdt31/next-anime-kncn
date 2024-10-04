export interface Source {
  url: string;
  isM3U8: boolean;
  quality: string;
}
export interface AnimeEpisodeStreaming {
  headers: {
    Referer: string
  }
  sources: Source[]
  download: string
}