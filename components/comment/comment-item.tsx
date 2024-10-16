"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { DeleteComment } from "@/action/comment";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import TextEditor from "../text-editor";
import { Button } from "../ui/button";
import { CreateNewComment } from "@/action/comment";
import { useSession } from "next-auth/react";
import { getLikeFromUserForComment, getOneCommentForAnime } from "@/data/anime";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LuMessageCircle } from "react-icons/lu";
import { Badge } from "../ui/badge";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { disableFrame, selectFrame } from "@/hooks/slices/use-isframe";
import { calculateCreatedTime } from "@/utils/constant";
import { History } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../loading/spinner";
import type { Comment } from "@/types/utils";
import { LikeComment, UnlikeComment } from "@/action/like";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CommentItemProps {
  id: string;
  showMore: boolean;
  setShowMore: Dispatch<SetStateAction<boolean>>;
  animeId: string;
}

const CommentItem: React.FC<CommentItemProps> = ({
  id,
  showMore,
  setShowMore,
  animeId,
}) => {
  const queryClient = useQueryClient();
  const { data } = useSession();
  const frame = useAppSelector(selectFrame);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [mess, setMess] = useState<string>("");
  const { data: comment, refetch } = useQuery({
    queryKey: ["comment", id],
    queryFn: () => getOneCommentForAnime(id),
    enabled: !showMore,
  });
  const { data: userLike, refetch: likeRefetch } = useQuery({
    queryKey: ["like", data?.user.id, comment?.id], // Lấy userId từ session và id từ comment
    queryFn: () =>
      getLikeFromUserForComment(data?.user.id, comment?.id as string), // Hàm kiểm tra like của người dùng
    enabled: !!data?.user.id && !!comment?.id, // Chỉ kích hoạt khi có cả userId và commentId
  });
  const likeMutation = useMutation({
    mutationFn: LikeComment,
    onSuccess: async () => {
      likeRefetch();
    },
  });
  const unlikeMutation = useMutation({
    mutationFn: UnlikeComment,
    onSuccess: async () => {
      likeRefetch();
    },
  });
  const deleteMutation = useMutation({
    mutationFn: DeleteComment,
    onSuccess: () => {
      setMess("Removed");
      setTimeout(async () => {
        refetch();
        await queryClient.invalidateQueries({
          queryKey: ["comments", animeId, id], // Chỉnh đúng queryKey
        });
      }, 3000);
    },
  });
  const postMutation = useMutation({
    mutationFn: CreateNewComment,
    onSuccess: async () => {
      refetch();
      await queryClient.invalidateQueries({
        queryKey: ["comments", animeId, id], // Chỉnh đúng queryKey
      });
      setLoading(false);
    },
  });
  const updateLike = () => {
    if (data) {
      queryClient.setQueryData(
        ["comment", id],
        (oldData: Comment | undefined) => {
          if (!oldData || !oldData._count) return oldData; // Nếu chưa có dữ liệu hoặc _count không tồn tại thì không làm gì
          if (userLike) {
            unlikeMutation.mutateAsync(userLike.id as string);
            return {
              ...oldData,
              _count: {
                ...oldData._count, // Giữ nguyên các giá trị khác trong _count
                likes: oldData._count.likes - 1,
              },
            };
          }
          likeMutation.mutateAsync({
            userId: data.user.id,
            commentId: id,
          });
          return {
            ...oldData,
            _count: {
              ...oldData._count, // Giữ nguyên các giá trị khác trong _count
              likes: oldData._count.likes + 1,
            },
          };
        }
      );
    }
  };
  return (
    <div>
      {comment && (
        <div className="flex gap-3 items-start w-fit px-3 py-2">
          <Avatar>
            <AvatarImage src={comment?.user.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold flex gap-3 items-center">
              {comment?.user.name}
              <span className="text-gray-600 text-xs">
                <History className="text-gray-600 inline" size={14} />{" "}
                {calculateCreatedTime(new Date(comment.createdAt))}
              </span>
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: comment?.text as string }}
            />

            {mess === "Removed" ? (
              <Badge>{mess}</Badge>
            ) : (
              <div className="flex gap-5 items-center text-gray-600 text-xs mt-1">
                <button
                  className="flex gap-1 items-center"
                  onClick={() => updateLike()}
                >
                  {userLike ? <AiFillLike /> : <AiOutlineLike />}
                  <span>{comment?._count.likes}</span>
                </button>
                <button className="flex gap-1 items-center">
                  <LuMessageCircle />
                  <span>{comment?._count.children}</span>
                </button>
                <button
                  onClick={() => {
                    setOpen(true);
                    if (frame.isFrame) dispatch(disableFrame());
                  }}
                  className="text-sm"
                >
                  Reply
                </button>
                {comment.user.id === data?.user.id && (
                  <AlertDialog>
                    <AlertDialogTrigger className="text-sm">
                      Remove
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your comment from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            deleteMutation.mutateAsync({ id });
                          }}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {open && (
        <div className="mb-3">
          <TextEditor
            onChange={setText}
            defaultContent={"<p>Hello World</p>"}
          />
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex gap-3 items-center">
              <Button onClick={() => setOpen(false)} variant={"outline"}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setLoading(true);
                  postMutation.mutateAsync({
                    text,
                    animeId: comment?.animeId as string,
                    userId: data?.user.id as string,
                    parentId: comment?.id as string,
                  });
                }}
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      )}
      {comment && comment._count.children > 0 && (
        <button onClick={() => setShowMore((prev) => !prev)}>
          {showMore ? (
            <p className="text-xs flex gap-1 items-center">
              Hide all <ChevronUp size={12} />
            </p>
          ) : (
            <p className="text-xs flex gap-1 items-center">
              Show {comment?._count.children} replies <ChevronDown size={12} />
            </p>
          )}
        </button>
      )}
    </div>
  );
};
export default CommentItem;
