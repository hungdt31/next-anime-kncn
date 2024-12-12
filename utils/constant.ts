import { Title } from "@/types/utils";
import { time } from "console";
import { late } from "zod";
export const getAnimeTitle = (title: Title) => {
  return typeof title !== "string"
    ? title.english || title.native || title.romaji || title.userPreferred
    : title;
};

export const setBackgroundImage = (imageUrl: string) => {
  return {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
};

export const convertQueryArrayParams = (queries: string[]) => {
  return `[${queries?.map((item) => `"${item}"`) || []}]`;
};

export interface Ingredient {
  icon: string;
  label: string;
}

export const AllSeason = [
  { icon: "🍂", label: "AUTUMN", value: "FALL"   },
  { icon: "❄️", label: "WINTER", value: "WINTER" },
  { icon: "☀️", label: "SUMMER", value: "SUMMER" },
  { icon: "🌷", label: "SPRING", value: "SPRING" },
];

export const providers = [
  {
    icon: "/share-icon/facebook.svg",
    link: (url: string, title: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}&t=${title}`,
    name: "Facebook",
  },
  {
    icon: "/share-icon/twitter.svg",
    link: (url: string, title: string) =>
      `http://twitter.com/share?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
    name: "Twitter",
  },
  {
    icon: "/share-icon/reddit.svg",
    link: (url: string, title: string) =>
      `http://www.reddit.com/submit?url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`,
    name: "Reddit",
  },
  {
    icon: "/share-icon/email.svg",
    link: (url: string, title: string) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${url}`,
    name: "Email",
  },
];

export const calculateCreatedTime = (timeCreated: Date): string => {
  const periods: { [key: string]: number } = {
    year: 365 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };

  const diff: number = Date.now() - timeCreated.getTime();

  for (const key in periods) {
    if (diff >= periods[key]) {
      const result: number = Math.floor(diff / periods[key]);
      return `${result} ${result === 1 ? key : key + "s"} ago`;
    }
  }

  return "Just now";
};

export const getCreatedTime = (timeCreated: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // Lấy ngày trong tuần (Thứ hai, Thứ ba,...)
    day: "2-digit",  // Định dạng ngày với 2 chữ số
    month: "2-digit", // Định dạng tháng với 2 chữ số
    year: "numeric",  // Định dạng năm đầy đủ
    hour: "2-digit",  // Định dạng giờ với 2 chữ số
    minute: "2-digit", // Định dạng phút với 2 chữ số
    hour12: false,    // Sử dụng định dạng 24h (không có AM/PM)
  };

  // Lấy ra chuỗi ngày định dạng theo Tiếng Việt
  const formattedDate = timeCreated.toLocaleDateString("en-US", options);

  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

export const SeasonConstant = [
  {
    label: "Winter",
    value: "WINTER",
  },
  {
    label: "Spring",
    value: "SPRING",
  },
  {
    label: "Summer",
    value: "SUMMER",
  },
  {
    label: "Fall",
    value: "FALL",
  }
]

export const FormatConstant = [
  {
    label: "TV",
    value: "TV"
  },
  {
    label: "TV_SHORT",
    value: "TV_SHORT"
  },
  {
    label: "MOVIE",
    value: "MOVIE"
  },
  {
    label: "SPECIAL",
    value: "SPECIAL"
  },
  {
    label: "OVA",
    value: "OVA"
  },
  {
    label: "ONA",
    value: "ONA"
  },
  {
    label: "MUSIC",
    value: "MUSIC"
  }
]

export const StatusConstant = [
  {
    label: "Finished",
    value: "FINISHED"
  },
  {
    label: "Releasing",
    value: "RELEASING"
  },
  {
    label: "Not yet released",
    value: "NOT_YET_RELEASED"
  },
  {
    label: "Cancelled",
    value: "CANCELLED"
  },
  {
    label: "Hiatus",
    value: "HIATUS"
  }
]

export const SortConstant = [
  { label: "Popularity (Descending)", value: "POPULARITY_DESC" },
  { label: "Popularity (Ascending)", value: "POPULARITY" },
  { label: "Trending (Descending)", value: "TRENDING_DESC" },
  { label: "Trending (Ascending)", value: "TRENDING" },
  { label: "Updated At (Descending)", value: "UPDATED_AT_DESC" },
  { label: "Updated At (Ascending)", value: "UPDATED_AT" },
  { label: "Start Date (Descending)", value: "START_DATE_DESC" },
  { label: "Start Date (Ascending)", value: "START_DATE" },
  { label: "End Date (Descending)", value: "END_DATE_DESC" },
  { label: "End Date (Ascending)", value: "END_DATE" },
  { label: "Favourites (Descending)", value: "FAVOURITES_DESC" },
  { label: "Favourites (Ascending)", value: "FAVOURITES" },
  { label: "Score (Descending)", value: "SCORE_DESC" },
  { label: "Score (Ascending)", value: "SCORE" },
  { label: "Title (Romaji, Descending)", value: "TITLE_ROMAJI_DESC" },
  { label: "Title (Romaji, Ascending)", value: "TITLE_ROMAJI" },
  { label: "Title (English, Descending)", value: "TITLE_ENGLISH_DESC" },
  { label: "Title (English, Ascending)", value: "TITLE_ENGLISH" },
  { label: "Title (Native, Descending)", value: "TITLE_NATIVE_DESC" },
  { label: "Title (Native, Ascending)", value: "TITLE_NATIVE" },
  { label: "Episodes (Descending)", value: "EPISODES_DESC" },
  { label: "Episodes (Ascending)", value: "EPISODES" },
  { label: "ID (Descending)", value: "ID_DESC" },
  { label: "ID (Ascending)", value: "ID" }
];

export const Genres = [
  {
    label: "Action",
    value: "Action"
  },
  {
    label: "Adventure",
    value: "Adventure"
  },
  {
    label: "Comedy",
    value: "Comedy"
  },
  {
    label: "Drama",
    value: "Drama"
  },
  {
    label: "Fantasy",
    value: "Fantasy"
  },
  {
    label: "Horror",
    value: "Horror"
  },
  {
    label: "Mecha",
    value: "Mecha"
  },
  {
    label: "Music",
    value: "Music"
  },
  {
    label: "Mystery",
    value: "Mystery"
  },
  {
    label: "Psychological",
    value: "Psychological"
  },
  {
    label: "Romance",
    value: "Romance"
  },
  {
    label: "Sci-Fi",
    value: "Sci-Fi"
  },
  {
    label: "Slice of Life",
    value: "Slice of Life"
  },
  {
    label: "Sports",
    value: "Sports"
  },
  {
    label: "Supernatural",
    value: "Supernatural"
  }
]