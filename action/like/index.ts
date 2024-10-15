export async function LikeComment ({
  userId, 
  commentId
} : {
  userId: string,
  commentId: string
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_END_URL}/like`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', // Đặt kiểu dữ liệu cho request
    },
    body: JSON.stringify({
      userId,
      commentId
    })
  })
  if (!response.ok) {
    throw new Error('Failed to like the comment');
  }

  const res = await response.json();
  return res.data; // Trả về dữ liệu nhận được từ API
}

export async function UnlikeComment (id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_END_URL}/like/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json', // Đặt kiểu dữ liệu cho request
    },
  })
  if (!response.ok) {
    throw new Error('Failed to unlike the comment');
  }

  const res = await response.json();
  return res.data; // Trả về dữ liệu nhận được từ API
}