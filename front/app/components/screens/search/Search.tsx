import Field from '@/components/ui/form/field/Field'
import Heading from '@/components/ui/heading/Heading'
import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import MovieCatalog from '@/components/ui/movie/catalog/MovieCatalog'
import React, { FC } from 'react'
import { View } from 'react-native'
import { ISearchFormData } from './search.interface'
import { useSearch } from './useSearch'

const Search: FC = () => {
	const { control, searchTerm, movies, isLoading } =
		useSearch()

	return (
		<Layout isHasPadding>
			<Heading title='Search' />
			<View className='mt-3'>
				<Field<ISearchFormData>
					placeholder='Type something...'
					control={control}
					name='searchTerm'
					keyboardType='web-search'
				/>
			</View>

			{!!searchTerm ? (
				<View className='mt-3'>
					{isLoading ? <Loader /> : <MovieCatalog title='' movies={movies} />}
				</View>
			) : null}
		</Layout>
	)
}

export default Search
