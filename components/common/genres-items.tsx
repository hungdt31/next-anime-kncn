"use client";
import { GenresItem } from "./genres-item";

interface GenresItemsProps {
  items: string[];
  color?: string
}

export default function GenresItems({ items, color }: GenresItemsProps) {
  return (
    <div className="flex flex-wrap my-3 gap-[10px]">
      {items?.map((el, ind) => (
        <GenresItem item={el} key={ind} color={color}/>
      ))}
    </div>
  );
}
