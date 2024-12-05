import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'

import MovieCatalog from '@/components/ui/movie/catalog/MovieCatalog'
import { FC } from 'react'
import { useFavorites } from './useFavorites'

const Favorites: FC = () => {
	const { favoriteMovies, isLoading } = useFavorites()

	if (isLoading) return <Loader />

	return (
		<Layout isHasPadding>
			<MovieCatalog movies={favoriteMovies} title='Favorites' />
		</Layout>
	)
}

export default Favorites
