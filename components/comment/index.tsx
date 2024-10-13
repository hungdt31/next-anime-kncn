"use client";
import { getCommentForAnime } from "@/data/anime";
import type { Comment } from "@/types/utils";
import CommentItem from "./comment-item";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import TextEditor from "../text-editor";
import ErrorQuery from "../common/error-query";
import Link from "next/link";
import Spinner from "../loading/spinner";
import { CreateNewComment } from "@/action/comment";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Button } from "../ui/button";
import { disableFrame, selectFrame } from "@/hooks/slices/use-isframe";
import { MessageSquareDiff } from "lucide-react";
interface CommentProps {
  id: string;
}

const RecursiveComment = React.memo(
  ({
    depth,
    parentId,
    id,
  }: {
    depth: number;
    parentId: string;
    id: string;
  }) => {
    const [showMore, setShowMore] = useState(false);

    // Using useQuery to fetch data based on parentId and id
    const {
      data: comments = [],
      isLoading,
      isError,
    } = useQuery({
      queryKey: ["comments", id, parentId],
      queryFn: () => getCommentForAnime(id, parentId),
      refetchInterval: 5000,
      enabled: showMore || depth === 0, // Only fetch data when showMore is true or at the root level
    });

    return (
      <div
        style={{ marginLeft: `${depth * 15}px`, marginTop: "10px" }}
        key={parentId}
      >
        <CommentItem
          animeId={id}
          showMore={showMore}
          setShowMore={setShowMore}
          id={parentId}
        />
        {isLoading && <Spinner />}
        {isError && <ErrorQuery />}
        {((showMore && comments.length > 0) || depth === 0) &&
          comments.map((comment) => (
            <RecursiveComment
              key={comment.id}
              depth={depth + 1}
              parentId={comment.id}
              id={id}
            />
          ))}
      </div>
    );
  }
);

export default function Comment({ id }: CommentProps) {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const frame = useAppSelector(selectFrame);
  const [comment, setComment] = useState<string>("");

  // Function to refresh comments
  const { refetch: refetchComments } = useQuery({
    queryKey: ["comments", id, ""],
    queryFn: () => getCommentForAnime(id, ""),
  });

  if (!session)
    return (
      <p className="font-semibold text-gray-700 px-5">
        You need to{" "}
        <Link href="/sign-in" className="underline-offset-2 text-red-700">
          login
        </Link>{" "}
        to comment
      </p>
    );

  return (
    <>
      <div className="flex flex-col items-end">
        <TextEditor
          onChange={(value) => {
            setComment(value);
          }}
          defaultContent={"Write your comment here..."}
          focusFunc={() => {
            if (frame.isFrame) dispatch(disableFrame());
          }}
        />
        <Button
          className="text-center flex items-center gap-3 rounded-full"
          onClick={async () => {
            await CreateNewComment({
              text: comment,
              userId: session.user.id,
              animeId: id,
              parentId: "",
            });
            refetchComments(); // Refresh comments after creating a new comment
          }}
        >
          <MessageSquareDiff />
          Submit
        </Button>
      </div>
      <RecursiveComment depth={0} parentId="" id={id} />
    </>
  );
}
