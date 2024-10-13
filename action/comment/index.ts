import axios from "axios";

export async function CreateNewComment({
  text,
  userId,
  animeId,
  parentId
} : {
  text: string,
  userId: string,
  animeId: string,
  parentId:string
}) {
  try {
    await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_FRONT_END_URL}/comment`,
      data: {
        text,
        userId,
        animeId,
        parentId,
      },
    })
    return { success: true, message: "Comment created successfully" };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { success: false, message: "Failed to create comment" };
  }
}

export async function DeleteComment({ id }: { id: string }) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_END_URL}/comment/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return { success: true, message: "Comment deleted successfully" };
    } else {
      return { success: false, message: "Failed to delete comment" };
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    return { success: false, message: "Failed to delete comment" };
  }
}
