"use client";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import type { Trailer } from "@/types/utils";

interface TrailerSectionProps {
  video: Trailer | undefined;
  title: string;
}

export default function TrailerSection({ video, title }: TrailerSectionProps) {
  return (
    <div>
      {video && video.site === "youtube" ? (
        <LiteYouTubeEmbed
          thumbnail={video.thumbnail}
          id={video.id}
          poster="hqdefault"
          title={title}
        />
      ) : (
        <p className="p-7">There are no preview</p>
      )}
    </div>
  );
}
