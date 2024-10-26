import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { Button } from '../ui/button'
import { useMutation, useQuery } from '@tanstack/react-query';
import { getLikeCountForEpisode } from '@/data/anime';
import Spinner from '../loading/spinner';
import { LikeEpisodeAction } from '@/action/like-episode';

interface LikeEpisodeProps {
  userId: string;
  episodeId: string;
}

const LikeEpisode: React.FC<LikeEpisodeProps> = ({ userId, episodeId }) => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['like-episode', { episodeId, userId }],
    queryFn: () => getLikeCountForEpisode(episodeId, userId),
  })
  const mute = useMutation({
    mutationKey: ["LikeEpisodeAction", { userId, episodeId }],
    mutationFn: ({ userId, episodeId }: {
      userId: string,
      episodeId: string
    }) => LikeEpisodeAction({ userId, episodeId }),
    onSettled: () => refetch()
  })
  if (isLoading) return <Spinner />
  return (
    <Button className="rounded-full flex items-center bg-orange-700 hover:bg-orange-500 gap-2" onClick={() => mute.mutateAsync({
      userId,
      episodeId
    })}>
      {data?.userLike ? <AiFillLike /> : <AiOutlineLike />} <span className='rounded-full text-white px-1 text-xs font-bold'>{data?.count}</span>
    </Button>
  )
}
export default LikeEpisode;