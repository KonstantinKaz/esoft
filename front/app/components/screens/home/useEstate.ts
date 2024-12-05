import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { EstateService } from '@/services/estate.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

export const useEstate = () => {
	const { params } = useTypedRoute<'Estate'>()
	const { goBack } = useTypedNavigation()
	const queryClient = useQueryClient()

	const { isLoading, data: estate } = useQuery({
		queryKey: ['get estate', params.id],
		queryFn: () => EstateService.getById(params.id)
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete estate'],
		mutationFn: () => EstateService.delete(params.id),
		async onSuccess() {
			Toast.show({
				type: 'success',
				text1: 'Удаление недвижимости',
				text2: 'успешно удалено'
			})

			await queryClient.invalidateQueries({ queryKey: ['estates'] })
			goBack()
		}
	})

	return { estate, isLoading, deleteAsync }
}
