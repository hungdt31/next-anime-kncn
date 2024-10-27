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
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CommentProps {
  id: string;
}
const RecursiveComment = React.memo(
  ({
    depth,
    parentId,
    id,
    sortTime,
  }: {
    depth: number;
    parentId: string;
    id: string;
    sortTime: string;
  }) => {
    const [showMore, setShowMore] = useState(false);

    // Using useQuery to fetch data based on parentId and id
    const {
      data: comments = [],
      isLoading,
      isError,
    } = useQuery({
      queryKey: ["comments", id, parentId, sortTime],
      queryFn: () => getCommentForAnime(id, parentId, sortTime),
      // refetchInterval: 5000,
      enabled: showMore || depth == 0, // Only fetch data when showMore is true or at the root level
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
              sortTime={sortTime}
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
RecursiveComment.displayName = "RecursiveComment";

export default function Comment({ id }: CommentProps) {
  const { data: session } = useSession();
  const [sortTime, setSortTime] = useState<string>("desc");
  const dispatch = useAppDispatch();
  const frame = useAppSelector(selectFrame);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
          onChange={setComment}
          defaultContent={"Write your comment here..."}
          focusFunc={() => {
            if (frame.isFrame) dispatch(disableFrame());
          }}
        />
        <Button
          disabled={loading}
          className="text-center flex items-center gap-3"
          onClick={async () => {
            setLoading(true);
            await CreateNewComment({
              text: comment,
              userId: session.user.id,
              animeId: id,
              parentId: "",
            });
            setLoading(false);
          }}
        >
          <Plus />
          Submit
        </Button>
      </div>
      <Select
        onValueChange={(value: string) => {
          setSortTime(value);
        }}
        defaultValue="desc"
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Oldest comment</SelectItem>
          <SelectItem value="desc">Latest comments</SelectItem>
        </SelectContent>
      </Select>
      {loading ? (
        <Spinner />
      ) : (
        <RecursiveComment depth={0} parentId="" id={id} sortTime={sortTime} />
      )}
    </>
  );
}
