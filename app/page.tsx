"use client";
import RecentAnime from "@/components/recent";
import PopularAnime from "@/components/popular";
import Slider from "@/components/slider";

export default function Home() {
  return (
    <div className="h-[1200px]">
      <Slider/>
      <RecentAnime />
      <PopularAnime />
    </div>
  );
}
