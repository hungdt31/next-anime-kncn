"use client";
import { LucideProps } from "lucide-react";
import React, { ElementType } from "react";

interface TitlePrimaryProps {
  title: string;
  icon?: ElementType<LucideProps>;
  subTitle?: string;
}

export default function TitlePrimary({ title, subTitle, icon: Icon }: TitlePrimaryProps) {
  return (
    <div className="p-3 rounded-lg text-white dark:bg-[#FFE53B] dark:bg-gradient-to-r dark:from-[#e15904] dark:to-[#bc2d2d] bg-[#333] bg-gradient-to-r from-[#4d433d] to-[#5f6c79] w-fit">
      <h3 className="flex items-center gap-3">
        {Icon && <Icon />} {title}
      </h3>
      {subTitle && <p className="mt-3 font-thin">{subTitle}</p>}
    </div>
  );
}
