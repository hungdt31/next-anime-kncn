import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCards() {
  // Array to dynamically create the skeletons, in this case, 3 skeleton cards
  const skeletonArray = Array(3).fill(0); 

  return (
    <div className="flex gap-5 my-7 justify-center flex-wrap">
      {skeletonArray.map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
