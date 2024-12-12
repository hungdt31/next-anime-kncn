"use client";
import Container from '@/components/layout/container'
import React, { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { getListForUser } from '@/data/anime'
import { AnimeCard } from '@/components/anime'
import { useSession } from 'next-auth/react';
import { SkeletonCards } from '@/components/loading/skeleton';
import { Button } from '@/components/ui/button';
import { CircleX, X } from 'lucide-react';
import { DeleteAnimeFromList } from '@/action/list';

interface Anime {
  animeColor: string,
  animeId: string,
  animeImage: string,
  animeTitle: string,
  animeType: string,
  id: string,
  userId: string,
  nextEpisodeTime: number,
}

export default function Page() {
  const { data: user } = useSession();
  const [isDeleted, setIsDeleted] = React.useState(false);
  const { data, isPending, isError, mutate } = useMutation({
    mutationKey: ['list'],
    mutationFn: getListForUser,
  });

  const handleDelete = async (animeId: string, userId: string) => {
    const rs = await DeleteAnimeFromList({ animeId, userId });
    if (rs) {
      alert('Deleted anime from list');
      mutate({ userId });
    } else {
      alert('Failed to delete');
    }
  }
  useEffect(() => {
    if (user) {
      mutate({ userId: user.user.id as string })
    }
  }, [user]);

  return (
    <div className='mt-[100px]'>
      <Container title='Anime List'>
        {/* {JSON.stringify(data)} */}
        {isPending && <SkeletonCards />}
        {isError && <div>Error</div>}
        <div className='fixed top-[100px] right-9 z-50'>
          {isDeleted ? <Button variant='secondary' onClick={() => setIsDeleted(false)}>Thoát</Button> : <Button className='rounded-full' onClick={() => setIsDeleted(true)}><CircleX className='
          mr-3' size={20} /> Xóa</Button>}
        </div>
        <div className='flex items-center gap-3'>
          {
            data?.map((anime: Anime, index: number) =>
              <div key={index} className='relative'>
                {isDeleted && <X className='absolute -top-2 -right-2 z-50 bg-red-500 rounded-lg p-2' size={30} onClick={() => handleDelete(anime.animeId, user?.user.id)} />}
                <AnimeCard
                  key={anime.id}
                  id={anime.animeId}
                  title={anime.animeTitle}
                  image={anime.animeImage}
                  type={anime.animeType}
                />
              </div>
            )
          }
        </div>
      </Container>
    </div>
  )
}
