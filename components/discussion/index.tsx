import React from "react";
import Container from "../layout/container";
import { MessagesSquare } from "lucide-react";
import DiscussionCard from "./discussion-card";
import { useQuery } from "@tanstack/react-query";
import { getCommentsForHomePage } from "@/data/anime";
import { SkeletonCards } from "../loading/skeleton";
import ErrorQuery from "../common/error-query";
import { Comment } from "@/types/utils";

export default function Feedback() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["feedback"],
    queryFn: () => getCommentsForHomePage(),
  });
  if (isLoading) return <SkeletonCards />;
  if (isError) return <ErrorQuery />;
  return (
    <Container title="Discussion" icon={MessagesSquare}>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-7 justify-center lg:w-[80%] mx-auto sm:w-[50%] w-[85%]">
        {data?.map((el: Comment, index: number) => (
          <DiscussionCard
            animeColor={el.animeColor}
            animeCover={el.animeCover}
            animeName={el.animeName}
            animeId={el.animeId}
            userAvatar={el.user.image}
            userName={el.user.name}
            createdAt={el.createdAt}
            key={index}
            comment={el.text}
          />
        ))}
      </div>
    </Container>
  );
}
