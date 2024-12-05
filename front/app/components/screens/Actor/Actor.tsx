import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import MovieCatalog from '@/components/ui/movie/catalog/MovieCatalog'
import NotFound from '@/components/ui/NotFound'
import React from 'react'
import { useActor } from './useActor'

const Actor = () => {
	const { movies, isLoading, actor } = useActor()

	if (isLoading) return <Loader />

	return (
		<Layout isHasPadding>
			{actor ? (
				<MovieCatalog
					movies={movies}
					title={actor.name}
					isBackButton
				/>
			) : (
				<NotFound />
			)}
		</Layout>
	)
}

export default Actor
