import { IconType } from "react-icons/lib";
import Link from "next/link";
type ArrayProps = {
  title: string;
  items: IconType;
  action: (() => void);
  linkHref?: string;
}[];

export const InfoGroup = ({
  infoData,
  title,
}: {
  infoData: ArrayProps;
  title?: string;
}) => {
  return (
    <div className="space-y-5 border-t-4 p-5 border-background">
      <p className="text-lg font-semibold underline-offset-2 underline">{title || ""}</p>
      <div className="flex flex-col gap-5">
        {infoData.map((info, index) => (
          <Link href={info.linkHref ? info.linkHref : "/"} key={index}>
            <button
              className="flex items-center gap-5"
              onClick={info.action}
            >
              {info?.items && <info.items />}
              <span className="cursor-pointer">{info?.title}</span>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};
