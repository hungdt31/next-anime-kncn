import { Recommendation, Relation } from "@/types/anime/info";
import React, { useState } from "react";
import ShowCaseItem from "./show-case-item";
import { Button } from "../ui/button";

interface MoreLikeThisProps {
  relations: Relation[];
  recommendations: Recommendation[];
}

const MoreLikeThis: React.FC<MoreLikeThisProps> = ({
  recommendations,
  relations,
}) => {
  const [selectType, setSelectType] = useState("Recommendations");
  const moreLikeThis = selectType === "Related" ? relations : recommendations;

  return (
    <div className="lg:w-[300px] w-full lg:pt-0 p-4">
      <div className="space-x-4">
        {["Recommendations", "Related"].map((item) => (
          <Button
            variant={selectType == item ? "default" : "secondary"}
            key={item}
            onClick={() => setSelectType(item)}
            className="font-semibold"
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="mt-5 space-y-5">
        {moreLikeThis.length === 0 && (
          <h6 className="text-sm font-semibold text-gray-500">
            No {selectType} found!
          </h6>
        )}
        {moreLikeThis?.map((item) => (
          <ShowCaseItem
            key={item.id}
            id={item?.id.toString()}
            image={item?.image}
            title={item?.title}
            type={item?.type}
            border={false}
          />
        ))}
      </div>
    </div>
  );
};

export default MoreLikeThis;