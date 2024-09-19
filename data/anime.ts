import { RecentEpisode, RecentEpisodesResponse } from "@/types/anime/recent-anime-episodes";
import { TrendingAnime, TrendingResponse } from "@/types/anime/trending";
import { InfoResponse } from "@/types/anime/info";
import { PopularAnime, PopularResponse } from "@/types/anime/popular";
import { client } from "@/data/base";
import { streaming } from "@/data/base";
import { TopAiringAnime, TopAiringAnimeResponse } from "@/types/anime/airing-schedule";
import { SearchAnime, SearchAnimeResponse } from "@/types/anime/search";
import { SearchAdvancedQuery } from "@/types/anime/advanced-search";
import { AnimeEpisodeStreaming } from "@/types/anime/episode-streaming-links";
export const default_provider = "gogoanime";

// Using the example id of "21" (one piece) and the query of "gogoanime"
export const getAnimeInfo = async (id: string = '1') => {
  const response = await client.get<InfoResponse>(
    `/info/${id}`,
    {
      params: {
        provider: default_provider,
      },
    }
  );
  return response.data;
};

// Using the example query "demon", and looking at the first page of results.
export const getRecentAnime = async (page: number = 1, perPage: number = 12) => {
  const response = await client.get<RecentEpisodesResponse<RecentEpisode>>(
    '/recent-episodes',
    {
      params: {
        page,
        perPage,
        provider: default_provider,
      },
    }
  );
  return response.data.results;
};

// Using the example query "demon", and looking at the first page of results.
export const getTrendingAnime = async (page: number = 1, perPage: number = 20) => {
  const response = await client.get<TrendingResponse<TrendingAnime>>(
    '/trending',
    {
      params: {
        page,
        perPage,
      },
    }
  );
  return response.data.results;
};

// Using the example query "demon", and looking at the first page of results.
export const getPopularAnime = async (page: number = 1, perPage: number = 20) => {
  const response = await client.get<PopularResponse<PopularAnime>>(
    '/popular',
    {
      params: {
        page,
        perPage,
      },
    }
  );
  return response.data.results;
};

// Using the example query "demon", and looking at the first page of results.
export const getTopAiringAnime = async (id: string = '1') => {
  const response = await client.get<TopAiringAnimeResponse<TopAiringAnime>>(
    `/airing-schedule/${id}`,
    {
      params: {
        provider: default_provider,
      },
    }
  );
  return response.data.results;
}

// Using the example query "demon", and looking at the first page of results.
export const getRandomAnime = async () => {
  const response = await client.get<InfoResponse>(
    '/random-anime',
    {
      params: {
        provider: default_provider,
      },
    }
  );
  return response.data;
}

// Using the example query "demon", and looking at the first page of results.
export const searchAnime = async (query: string, page: number = 1) => {
  const response = await client.get<SearchAnimeResponse<SearchAnime>>(`/${query}`, {
    params: page,
  });
  return response.data;
};

// Using the example query "demon", and looking at the first page of results.
export const searchAdvanced = async (queries?: SearchAdvancedQuery) => {
  const response = await client.get<SearchAnimeResponse<SearchAnime>>("/advanced-search", {
    params: {
      ...queries,
      provider: default_provider,
    },
  });

  return response.data;
};

/*
Using the example episode ID of  'spy-x-family-episode-1',
*/
export const getAnimeEpisodeStreaming = async (
  episodeId: string
): Promise<AnimeEpisodeStreaming> => {
  const response = await streaming.get(`/watch/${episodeId}`)
  return response?.data
};

export const getHomePage = async () => {
  const data = await Promise.all([
    getRecentAnime(),
    getTrendingAnime(),
    getPopularAnime(),
    searchAdvanced({
      sort: ["FAVOURITES_DESC"],
      type: "ANIME",
    }),
    searchAdvanced({
      type: "ANIME",
      status: "FINISHED",
      sort: ["SCORE_DESC"],
    }),
    searchAdvanced({
      season: "FALL",
      perPage: 5,
    }),
    searchAdvanced({
      season: "WINTER",
      perPage: 5,
    }),
    searchAdvanced({
      season: "SPRING",
      perPage: 5,
    }),
    searchAdvanced({
      season: "SUMMER",
      perPage: 5,
    }),
  ]);

  return data;
};
