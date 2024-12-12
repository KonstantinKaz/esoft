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
		setValue('type', estate.type)

		if (estate.type === 'APARTMENT') {
			setValue('apartment', estate.apartmentData?.apartment || '')
			setValue('apartmentData', {
				rooms: estate.apartmentData?.rooms || null,
				floor: estate.apartmentData?.floor || null,
				totalArea: estate.apartmentData?.totalArea || null
			})
		}
		if (estate.type === 'HOUSE') {
			setValue('houseData', {
				rooms: estate.houseData?.rooms || null,
				floors: estate.houseData?.floors || null,
				totalArea: estate.houseData?.totalArea || null
			})
		}
		if (estate.type === 'LAND') {
			setValue('landData', {
				totalArea: estate.landData?.totalArea || null,
				coordinates: estate.landData?.coordinates ? 
					JSON.parse(estate.landData.coordinates as string) : null
			})
		}
	}, [estate, setValue])

	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationKey: ['update estate'],
		mutationFn: (data: IEstate) => {
			const { apartment, ...rest } = data
			const payload = {
				...rest,
				...(estate?.type === 'APARTMENT' && {
					apartmentData: {
						...rest.apartmentData,
						apartment
					}
				})
			}
			return EstateService.update(estateId, payload)
		},
		onSuccess: async () => {
			Toast.show({
				type: 'success',
				text1: 'Обновление недвижимости',
				text2: 'успешно обновлено'
			})

			await queryClient.invalidateQueries({ queryKey: ['estates'] })
			goBack()
		}
	})

	const onSubmit: SubmitHandler<IEstate> = async data => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading, estate }
}
