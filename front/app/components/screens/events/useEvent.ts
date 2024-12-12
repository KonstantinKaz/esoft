import { EventService } from '@/services/event.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import Toast from 'react-native-toast-message'

export const useEvent = (id: string) => {
	const { goBack } = useTypedNavigation()
	const queryClient = useQueryClient()

	const { data: event, isLoading } = useQuery({
		queryKey: ['event', id],
		queryFn: () => EventService.getById(id),
		enabled: !!id
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete event'],
		mutationFn: (id: string) => EventService.delete(id),
		onSuccess() {
			Toast.show({
				type: 'success',
				text1: 'Удаление события',
				text2: 'Событие успешно удалено'
			})
			queryClient.invalidateQueries({ queryKey: ['events'] })
			goBack()
		},
		onError(error: any) {
			Toast.show({
				type: 'error',
				text1: 'Ошибка удаления',
				text2: error.response?.data?.message || 'Что-то пошло не так'
			})
		}
	})

	return { event, isLoading, deleteAsync }
}
