"use client";

export default function TitlePrimary({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) {
  return (
    <div className="main p-3 rounded-lg text-white dark:bg-[#FFE53B] dark:bg-gradient-to-r dark:from-[#e15904] dark:to-[#bc2d2d] bg-[#333] bg-gradient-to-r from-[#4d433d] to-[#5f6c79] w-fit">
      <h3>{title}</h3>
      {subTitle && <p className="mt-3 font-thin">{subTitle}</p>}
    </div>
  );
}
