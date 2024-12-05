import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import Toast from 'react-native-toast-message'

import { useSearchForm } from '@/components/screens/search/useSearchForm'

import { useTypedNavigation } from '@/hooks/useTypedNavigation'

import { ITableItem } from '@/components/ui/admin/table/admin-table.interface'
import { GenreService } from '@/services/genre.service'

export const useGenres = () => {
	const { debouncedSearch, control } = useSearchForm()

	const { navigate } = useTypedNavigation()

	const queryData = useQuery({
		queryKey: ['search genres', debouncedSearch],
		queryFn: () => GenreService.getAll(debouncedSearch),

		select: data =>
			data.map(
				(genre): ITableItem => ({
					_id: genre._id,
					editNavigate: () =>
						navigate('GenreEdit', {
							id: genre._id
						}),
					items: [genre.name, genre.slug]
				})
			)
	})

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create genre'],
		mutationFn: () => GenreService.create(),

		onSuccess: async _id => {
			Toast.show({
				type: 'success',
				text1: 'Create genre',
				text2: 'create was successful'
			})

			navigate('GenreEdit', {
				id: _id
			})
		}
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete genre'],
		mutationFn: (genreId: string) => GenreService.delete(genreId),

		onSuccess: async () => {
			Toast.show({
				type: 'success',
				text1: 'Delete genre',
				text2: 'delete was successful'
			})

			await queryData.refetch()
		}
	})

	return useMemo(
		() => ({ ...queryData, control, deleteAsync, createAsync }),
		[queryData, deleteAsync, createAsync]
	)
}
