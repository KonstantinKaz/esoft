import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import MovieCatalog from '@/components/ui/movie/catalog/MovieCatalog'
import React, { FC } from 'react'
import { useTrending } from './useTrending'

const Trending: FC = () => {
	const { movies, isLoading } = useTrending()

	if (isLoading) return <Loader />

	return (
		<Layout isHasPadding>
			<MovieCatalog
				title='Trending'
				movies={movies}
				description='Trending movies in excellent quality: legal, safe, without ads'
			/>
		</Layout>
	)
}

export default Trending
