import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import Toast from 'react-native-toast-message'

import { useTypedRoute } from '@/hooks/useTypedRoute'
import { EstateService, IEstate } from '@/services/estate.service'

export const useEstateEdit = (setValue: UseFormSetValue<IEstate>) => {
	const { params } = useTypedRoute<'EstateEdit'>()
	const estateId = params.id

	const { isLoading, data: estate } = useQuery({
		queryKey: ['get estate', estateId],
		queryFn: () => EstateService.getById(estateId),
		enabled: !!estateId
	})

	useEffect(() => {
		if (!estate) return

		setValue('type', estate.type)
		setValue('city', estate.city)
		setValue('street', estate.street)
		setValue('house', estate.house)
		setValue('apartment', estate.apartment)
		setValue('latitude', estate.latitude)
		setValue('longitude', estate.longitude)

		if (estate.type === 'APARTMENT' && estate.apartmentData) {
			setValue('apartmentData', estate.apartmentData)
		}
		if (estate.type === 'HOUSE' && estate.houseData) {
			setValue('houseData', estate.houseData)
		}
		if (estate.type === 'LAND' && estate.landData) {
			setValue('landData', estate.landData)
		}
	}, [estate, setValue])

	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationKey: ['update estate'],
		mutationFn: (data: IEstate) => EstateService.update(estateId, data),
		async onSuccess() {
			Toast.show({
				type: 'success',
				text1: 'Обновление недвижимости',
				text2: 'успешно обновлено'
			})

			await queryClient.invalidateQueries({ queryKey: ['estates'] })
		}
	})

	const onSubmit: SubmitHandler<IEstate> = async data => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading, estate }
}
