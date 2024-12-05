import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import Toast from 'react-native-toast-message'

import { useSearchForm } from '@/components/screens/search/useSearchForm'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { ITableItem } from '@/components/ui/admin/table/admin-table.interface'
import { ActorService } from '@/services/actor.service'

export const useActors = () => {
	const { debouncedSearch, control } = useSearchForm()
	const { navigate } = useTypedNavigation()

	const queryData = useQuery({
		queryKey: ['search actors', debouncedSearch],
		queryFn: () => ActorService.getAll(debouncedSearch),
		select: data =>
			data.map(
				(actor): ITableItem => ({
					_id: actor._id,
					editNavigate: () =>
						navigate('ActorEdit', {
							id: actor._id
						}),
					items: [actor.name, String(actor.countMovies)]
				})
			)
	})

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create actor'],
		mutationFn: () => ActorService.create(),
		onSuccess: async _id => {
			Toast.show({
				type: 'success',
				text1: 'Create actor',
				text2: 'create was successful'
			})

			navigate('ActorEdit', {
				id: _id
			})
		}
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete actor'],
		mutationFn: (actorId: string) => ActorService.delete(actorId),
		onSuccess: async () => {
			Toast.show({
				type: 'success',
				text1: 'Delete actor',
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
