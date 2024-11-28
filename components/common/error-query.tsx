import { TriangleAlert } from "lucide-react";
export default function ErrorQuery() {
  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center w-[80%] lg:[60%] h-[80px] text-primary gap-3">
        <TriangleAlert size={30}/>
        <p className="font-semibold text-xl">You can't access this topic!</p>
      </div>
    </div>
  );
}
