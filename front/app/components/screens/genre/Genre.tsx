import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import MovieCatalog from '@/components/ui/movie/catalog/MovieCatalog'
import NotFound from '@/components/ui/NotFound'
import React from 'react'
import { useGenre } from './useGenre'

const Genre = () => {
	const { movies, isLoading, genre } = useGenre()

	if (isLoading) return <Loader />

	return (
		<Layout isHasPadding>
			{genre ? (
				<MovieCatalog
					movies={movies}
					title={genre.name}
					description={genre.description}
					isBackButton
				/>
			) : (
				<NotFound />
			)}
		</Layout>
	)
}

export default Genre
