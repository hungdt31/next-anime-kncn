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