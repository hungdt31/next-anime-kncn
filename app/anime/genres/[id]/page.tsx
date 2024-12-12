"use client"
import { AnimeCard } from '@/components/anime'
import { SkeletonCards } from '@/components/loading/skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { searchAdvanced } from '@/data/anime'
import { convertQueryArrayParams } from '@/utils/constant'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAnimeTitle } from '@/utils/constant'
import Container from '@/components/layout/container'
import { Bolt } from 'lucide-react'


export default function GenresPage({
  params
}: {
  params: {
    id: string
  }
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['genres', params.id],
    queryFn: () => searchAdvanced({
      genres: convertQueryArrayParams([params.id]),
    }),
  })
  return (
    <div className='mt-[100px]'>
      {isLoading && <SkeletonCards />}
      {isError && <div>Đã xảy ra lỗi</div>}
      <Container title={params.id} icon={Bolt}>
        <div className='flex items-center gap-3 flex-wrap'>
          {data && data.map((anime) => (
            <AnimeCard
              key={anime.id}
              id={anime.id}
              title={getAnimeTitle(anime.title) || ""}
              image={anime.image}
              type={anime.type}
            />
          ))}
        </div>
      </Container>
    </div>
  )
}