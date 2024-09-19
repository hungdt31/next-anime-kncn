import { Title } from "@/types/utils";
export const getAnimeTitle = (title: Title) => {
  return typeof title !== "string" ? (title.english || title.native || title.romaji || title.userPreferred) : title;
};

export const setBackgroundImage = (imageUrl: string) => {
  return {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
};