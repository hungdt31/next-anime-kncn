import path from "@/utils/path";
import Link from "next/link";
import React from "react";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import Image from "next/image";
import { CirclePlay } from "lucide-react";

interface SeasonItemProps {
  title: string;
  image: string;
  id: string;
  color?: string;
  type?: string;
  ep?: number;
}
export default function SeasonItem({
  title,
  image,
  id,
  color,
  type,
  ep,
}: SeasonItemProps) {
  return (
    <Link
      href={path.anime(id)}
      className="grid grid-cols-2 aspect-[16/6] object-cover overflow-hidden gap-3"
    >
      {/* <LazyLoadImage
        src={image}
        width="100%"
        height="100%"
        effect="blur"
        alt={image}
        className="w-[100%]"
      /> */}
      <Image
        src={image}
        width={500}
        height={500}
        placeholder="blur"
        loading="lazy"
        alt={title}
        blurDataURL={image}
      />
      <div className="flex gap-3 flex-col">
        <p
          style={{
            color: color,
            fontWeight: "bold"
          }}
          className="truncate"
        >
          {title}
        </p>
        <div className="flex items-center gap-5 font-thin">
          <div className="flex items-center gap-1">
            <CirclePlay />
            <p>{type}</p>
          </div>
          <p>Episodes: {ep}</p>
        </div>
      </div>
    </Link>
  );
}
