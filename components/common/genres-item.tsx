"use client";
import { cn } from "@/lib/utils";
import path from "@/utils/path";
import Link from "next/link";

interface SlideProps {
  item: string;
  color?: string;
}

export const GenresItem: React.FC<SlideProps> = ({ item, color }) => {
  return (
    <Link
      href={path.genres(item)}
      className={cn(
        "border-2 rounded-lg px-3 py-1 font-semibold text-[12px]",
        color ? `text-${color} border-white` : "border-foreground"
      )}
    >
      {item}
    </Link>
  );
};
