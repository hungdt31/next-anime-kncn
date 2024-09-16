import path from "@/utils/path";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link className="flex items-center gap-3 font-bold" href={path.home}>
      <div className="border-4 border-red-500 w-10 h-10 text-red-500 flex items-center justify-center relative rounded-bl-full rounded-tr-full">
        <span>N</span>
        <span className="absolute top-0 left-2">N</span>
      </div>
      <h3 className="text-red-500">Anime</h3>
    </Link>
  );
};
