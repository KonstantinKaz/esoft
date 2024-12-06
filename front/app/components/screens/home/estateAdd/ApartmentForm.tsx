import React, { FC } from 'react'
import { View } from 'react-native'
import { Control } from 'react-hook-form'
import Field from '@/components/ui/form/field/Field'
import { IEstate } from '@/services/estate.service'

interface IApartmentFormProps {
	control: Control<IEstate>
}

const ApartmentForm: FC<IApartmentFormProps> = ({ control }) => {
	return (
		<View>
			<Field
				control={control}
				name='apartmentData.rooms'
				placeholder='Количество комнат'
				keyboardType='numeric'
			/>
			<Field
				control={control}
				name='apartmentData.floor'
				placeholder='Этаж'
				keyboardType='numeric'
			/>
			<Field
				control={control}
				name='apartmentData.totalArea'
				placeholder='Общая площадь (м²)'
				keyboardType='numeric'
			/>
		</View>
	)
}

export default ApartmentForm
