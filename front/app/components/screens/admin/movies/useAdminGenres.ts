import { useQuery } from '@tanstack/react-query'

import { GenreService } from '@/services/genre.service'

export const useAdminGenres = () =>
	useQuery({
		queryKey: ['List of genre'],
		queryFn: () => GenreService.getAll(),
		select: data =>
			data.map(genre => ({
				label: genre.name,
				value: genre._id
			}))
	})
