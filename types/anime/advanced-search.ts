type Sort =
  | "POPULARITY_DESC"
  | "POPULARITY"
  | "TRENDING_DESC"
  | "TRENDING"
  | "UPDATED_AT_DESC"
  | "UPDATED_AT"
  | "START_DATE_DESC"
  | "START_DATE"
  | "END_DATE_DESC"
  | "END_DATE"
  | "FAVOURITES_DESC"
  | "FAVOURITES"
  | "SCORE_DESC"
  | "SCORE"
  | "TITLE_ROMAJI_DESC"
  | "TITLE_ROMAJI"
  | "TITLE_ENGLISH_DESC"
  | "TITLE_ENGLISH"
  | "TITLE_NATIVE_DESC"
  | "TITLE_NATIVE"
  | "EPISODES_DESC"
  | "EPISODES"
  | "ID"
  | "ID_DESC";
type Status =
  | "FINISHED"
  | "RELEASING"
  | "NOT_YET_RELEASED"
  | "CANCELLED"
  | "HIATUS";
type Format =
  | "TV"
  | "TV_SHORT"
  | "MOVIE"
  | "SPECIAL"
  | "OVA"
  | "ONA"
  | "MUSIC";
export type Genres =
  | "Action"
  | "Adventure"
  | "Cars"
  | "Comedy"
  | "Drama"
  | "Fantasy"
  | "Horror"
  | "Mahou Shoujo"
  | "Mecha"
  | "Music"
  | "Mystery"
  | "Psychological"
  | "Romance"
  | "Sci-Fi"
  | "Slice of Life"
  | "Sports"
  | "Supernatural"
  | "Thriller";
export interface SearchAdvancedQuery {
  query?: string;
  type?: "ANIME" | "MANGA";
  page?: number;
  perPage?: number;
  season?: string;
  format?: Format;
  sort?: string;
  genres?: string;
  year?: number;
  status?: Status;
}