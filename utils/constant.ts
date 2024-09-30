import { Title } from "@/types/utils";
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