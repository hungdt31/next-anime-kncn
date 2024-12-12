export async function AddAnimeToList ({
  userId, 
  animeId,
  animeImage,
  animeTitle,
  animeType,
  animeColor,
  nextEpisodeTime,
} : {
  userId: string,
  animeId: string,
  animeImage: string,
  animeTitle: string,
  animeType: string,
  animeColor: string,
  nextEpisodeTime: number,
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_END_URL}/list`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', // Đặt kiểu dữ liệu cho request
    },
    body: JSON.stringify({
      userId, 
      animeId,
      animeImage,
      animeTitle,
      animeType,
      animeColor,
      nextEpisodeTime,
    })
  })
  if (!response.ok) {
    throw new Error('Failed to like the episode');
  }

  const res = await response.json();
  return res.data; // Trả về dữ liệu nhận được từ API
}

export async function DeleteAnimeFromList ({
  userId, 
  animeId,
} : {
  userId: string,
  animeId: string,
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_END_URL}/list`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json', // Đặt kiểu dữ liệu cho request
    },
    body: JSON.stringify({
      userId, 
      animeId,
    })
  })
  if (!response.ok) {
    throw new Error('Failed to delete the episode');
  }

  const res = await response.json();
  return res.isDeleted; // Trả về dữ liệu nhận được từ API
}