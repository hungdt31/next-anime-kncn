export async function LikeEpisodeAction ({
  userId, 
  episodeId
} : {
  userId: string,
  episodeId: string
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_END_URL}/like-episode`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', // Đặt kiểu dữ liệu cho request
    },
    body: JSON.stringify({
      userId,
      episodeId
    })
  })
  if (!response.ok) {
    throw new Error('Failed to like the episode');
  }

  const res = await response.json();
  return res.data; // Trả về dữ liệu nhận được từ API
}