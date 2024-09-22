"use client";
import { LucideProps } from "lucide-react";
import React, { ElementType } from "react";

interface TitlePrimaryProps {
  title: string;
  icon?: ElementType<LucideProps>;
  subTitle?: string;
}

export default function TitlePrimary({
  title,
  subTitle,
  icon: Icon,
}: TitlePrimaryProps) {
  return (
    <div className="flex items-center gap-3">
      {Icon && <Icon color="red" />}
      <div className="flex flex-col gap-3">
        <h3
          style={{
            background: "linear-gradient(to right, #e15904, #bc2d2d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </h3>
        {subTitle && <p className="font-thin text-red-500">{subTitle}</p>}
      </div>
    </div>
  );
}
// dark:bg-[#FFE53B] dark:bg-gradient-to-r dark:from-[#e15904] dark:to-[#bc2d2d] bg-[#333] bg-gradient-to-r from-[#4d433d] to-[#5f6c79]
