import Select from '@/components/ui/form/select/Select'
import { EstateService } from '@/services/estate.service'
import { useQuery } from '@tanstack/react-query'
import React, { FC } from 'react'
import { Control } from 'react-hook-form'
import { View } from 'react-native'

interface IEstateSelect {
	control: Control<any>
	rules?: any
}

const EstateSelect: FC<IEstateSelect> = ({ control, rules }) => {
	const { data: estates, isLoading } = useQuery({
		queryKey: ['estates'],
		queryFn: () => EstateService.getAll()
	})

	const options = estates?.map(estate => ({
		label: `${estate.city}, ${estate.street} ${estate.house}`,
		value: estate.id
	})) || []

	return (
		<View className='mb-4'>
			<Select
				control={control}
				name='estateId'
				placeholder='Выберите объект недвижимости'
				options={options}
				rules={rules}
				isLoading={isLoading}
				useScrollView={true}
			/>
		</View>
	)
}

export default EstateSelect
