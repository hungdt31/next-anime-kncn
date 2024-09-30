"use client";
import { CalendarFold, PictureInPicture2, Clock } from "lucide-react";

interface MiniInfoProps {
  releaseDate: number | undefined;
  type: string | undefined;
  currentEpisode: number | undefined;
  totalEpisodes: number | undefined;
}

export default function MiniInfo({
  releaseDate,
  type,
  currentEpisode,
  totalEpisodes,
}: MiniInfoProps) {
  const infoItems = [
    { icon: CalendarFold, label: releaseDate, show: !!releaseDate },
    { icon: PictureInPicture2, label: type, show: !!type },
    {
      icon: Clock,
      label: `${currentEpisode} / ${totalEpisodes}`,
      show: currentEpisode && totalEpisodes,
    },
  ];

  return (
    <div className="flex gap-5">
      {infoItems
        .filter((item) => item.show)
        .map(({ icon: Icon, label }, index) => (
          <div key={index} className="flex gap-2 text-white text-[14px] items-center">
            <Icon size={14} color="red"/>
            <p>{label}</p>
          </div>
        ))}
    </div>
  );
}