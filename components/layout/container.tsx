"use client"
import TitlePrimary from "../common/title-primary"

export default function Container({
  title,
  subTitle,
  children
} : {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-4 p-5">
      <TitlePrimary title={title} subTitle={subTitle} />
      {children}
    </div>
  )
}
