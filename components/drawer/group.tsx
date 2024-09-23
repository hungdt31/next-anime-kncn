import { IconType } from "react-icons/lib";

type ArrayProps = {
  title: string;
  items: IconType;
  action: (() => void);
}[];

export const InfoGroup = ({
  infoData,
  title,
}: {
  infoData: ArrayProps;
  title?: string;
}) => {
  return (
    <div className="space-y-5 border-t-4 px-3 py-5 border-background">
      <p className="text-lg font-semibold underline-offset-2 underline">{title || ""}</p>
      <div className="space-y-2">
        {infoData.map((info, index) => (
          <button
            key={index}
            className="flex items-center gap-5"
            onClick={info.action}
          >
            {info?.items && <info.items />}
            <span className="cursor-pointer">{info?.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
