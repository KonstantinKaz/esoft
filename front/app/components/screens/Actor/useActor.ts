import { useQuery } from '@tanstack/react-query'

import { useTypedRoute } from '@/hooks/useTypedRoute'

import { ActorService } from '@/services/actor.service'
import { MovieService } from '@/services/movie.service'

export const useActor = () => {
	const { params } = useTypedRoute<'Actor'>()

	const { isLoading, data: actor } = useQuery({
		queryKey: ['get actor by slug', params.slug],
		queryFn: () => ActorService.getBySlug(params.slug)
	})

	const actorId = actor?._id || ''

	const { isLoading: isMovieLoading, data: movies } = useQuery({
		queryKey: ['get movies by actor', actorId],
		queryFn: () => MovieService.getByActor(actorId),
		enabled: !!actorId
	})

	return { actor, movies, isLoading: isLoading || isMovieLoading }
}
