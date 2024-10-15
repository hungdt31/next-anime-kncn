import { Title } from "@/types/utils";
import { time } from "console";
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