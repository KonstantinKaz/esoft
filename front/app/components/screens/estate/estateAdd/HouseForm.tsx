import Field from '@/components/ui/form/field/Field'
import { IEstate } from '@/services/estate.service'
import React, { FC } from 'react'
import { Control } from 'react-hook-form'
import { View } from 'react-native'

interface IHouseFormProps {
	control: Control<IEstate>
}

const HouseForm: FC<IHouseFormProps> = ({ control }) => {
	return (
		<View>
			<Field
				control={control}
				name='houseData.rooms'
				placeholder='Количество комнат'
				keyboardType='numeric'
			/>
			<Field
				control={control}
				name='houseData.floors'
				placeholder='Количество этажей'
				keyboardType='numeric'
			/>
			<Field
				control={control}
				name='houseData.totalArea'
				placeholder='Общая площадь (м²)'
				keyboardType='numeric'
			/>
		</View>
	)
}

export default HouseForm
