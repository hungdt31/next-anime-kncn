"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DrawerTrigger } from "../drawer";

export function UAvatar({ imgUrl, alt, size }: { imgUrl: string; alt: string, size?: number }) {
  return (
    <div className="flex gap-3 items-center">
      <DrawerTrigger>
      <Avatar size={size}>
        <AvatarImage src={imgUrl} alt={alt}/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      </DrawerTrigger>
    </div>
  );
}
