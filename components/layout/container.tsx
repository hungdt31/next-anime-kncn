"use client"
import TitlePrimary from "../common/title-primary"
import { LucideProps } from "lucide-react"
import { ElementType } from "react"

export default function Container({
  title,
  subTitle,
  icon,
  children
} : {
  title: string;
  subTitle?: string;
  icon?: ElementType<LucideProps>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-4 p-5">
      <TitlePrimary title={title} subTitle={subTitle} icon={icon}/>
      {children}
    </div>
  )
}
