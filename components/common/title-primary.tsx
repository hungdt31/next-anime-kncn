"use client"

export default function TitlePrimary({
  title,
  subTitle
}: {
  title: string;
  subTitle?: string;
}) {
  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      {subTitle && <p className="text-lg text-gray-500">{subTitle}</p>}
    </div>
  )
}
