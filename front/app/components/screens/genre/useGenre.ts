import { useQuery } from '@tanstack/react-query'

import { useTypedRoute } from '@/hooks/useTypedRoute'
import { GenreService } from '@/services/genre.service'
import { MovieService } from '@/services/movie.service'

export const useGenre = () => {
	const { params } = useTypedRoute<'Genre'>()

	const { isLoading, data: genre } = useQuery({
		queryKey: ['get genre by slug', params.slug],
		queryFn: () => GenreService.getBySlug(params.slug)
	})

	const genreId = genre?._id || ''

	const { isLoading: isMovieLoading, data: movies } = useQuery({
		queryKey: ['get movies by genre', genreId],
		queryFn: () => MovieService.getByGenres([genreId]),
		enabled: !!genreId
	})

	return { genre, movies, isLoading: isLoading || isMovieLoading }
}
