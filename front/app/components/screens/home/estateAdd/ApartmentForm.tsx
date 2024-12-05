import React, { FC } from 'react'
import { View } from 'react-native'
import { Control, FieldValues } from 'react-hook-form'
import Field from '@/components/ui/form/field/Field'

interface IApartmentFormProps {
	control: Control<FieldValues>
}

const ApartmentForm: FC<IApartmentFormProps> = ({ control }) => {
	return (
		<View>
			<Field
				control={control}
				name='apartmentData.rooms'
				placeholder='Количество комнат'
				keyboardType='numeric'
				rules={{ required: 'Укажите количество комнат' }}
			/>
			<Field
				control={control}
				name='apartmentData.floor'
				placeholder='Этаж'
				keyboardType='numeric'
				rules={{ required: 'Укажите этаж' }}
			/>
			<Field
				control={control}
				name='apartmentData.totalArea'
				placeholder='Общая площадь (м²)'
				keyboardType='numeric'
				rules={{ required: 'Укажите площадь' }}
			/>
		</View>
	)
}

export default ApartmentForm
