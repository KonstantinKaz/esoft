import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import Toast from 'react-native-toast-message'

import { useTypedRoute } from '@/hooks/useTypedRoute'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { EstateService, IEstate } from '@/services/estate.service'

export const useEstateEdit = (setValue: UseFormSetValue<IEstate>) => {
	const { params } = useTypedRoute<'EstateEdit'>()
	const { goBack } = useTypedNavigation()
	const estateId = params.id

	const { isLoading, data: estate } = useQuery({
		queryKey: ['get estate', estateId],
		queryFn: () => EstateService.getById(estateId),
		enabled: !!estateId
	})

	useEffect(() => {
		if (!estate) return

		setValue('city', estate.city || '')
		setValue('street', estate.street || '')
		setValue('house', estate.house || '')
		setValue('apartment', estate.apartment || '')
		setValue('type', estate.type)

		if (estate.type === 'APARTMENT' && estate.apartmentData) {
			setValue('apartmentData', {
				rooms: estate.apartmentData.rooms || null,
				floor: estate.apartmentData.floor || null,
				totalArea: estate.apartmentData.totalArea || null
			})
		}
		if (estate.type === 'HOUSE' && estate.houseData) {
			setValue('houseData', {
				rooms: estate.houseData.rooms || null,
				floors: estate.houseData.floors || null,
				totalArea: estate.houseData.totalArea || null
			})
		}
		if (estate.type === 'LAND' && estate.landData) {
			setValue('landData', {
				totalArea: estate.landData.totalArea || null
			})
		}
	}, [estate, setValue])

	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationKey: ['update estate'],
		mutationFn: (data: IEstate) => {
			console.log('Sending update data:', data)
			return EstateService.update(estateId, {
				...data,
				type: estate?.type || 'APARTMENT'
			})
		},
		onSuccess: async () => {
			Toast.show({
				type: 'success',
				text1: 'Обновление недвижимости',
				text2: 'успешно обновлено'
			})

			await queryClient.invalidateQueries({ queryKey: ['estates'] })
			goBack()
		},
		onError: (error) => {
			console.error('Update error:', error)
			Toast.show({
				type: 'error',
				text1: 'Ошибка',
				text2: 'Не удалось обновить данные'
			})
		}
	})

	const onSubmit: SubmitHandler<IEstate> = async data => {
		try {
			console.log('Form submitted with data:', data)
			await mutateAsync(data)
		} catch (error) {
			console.error('Submit error:', error)
		}
	}

	return { onSubmit, isLoading, estate }
}
