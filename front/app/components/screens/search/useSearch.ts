import { MovieService } from '@/services/movie.service'
import { useQuery } from '@tanstack/react-query'
import { useSearchForm } from './useSearchForm'

export const useSearch = () => {
	const { searchTerm, debouncedSearch, control } = useSearchForm()

	const { isLoading, data: movies } = useQuery({
		queryKey: ['search movies', debouncedSearch],
		queryFn: () => MovieService.getAll(debouncedSearch),
		enabled: !!debouncedSearch
	})
	return { movies, isLoading, control, searchTerm }
}
