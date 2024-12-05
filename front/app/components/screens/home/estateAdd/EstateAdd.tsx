import Button from '@/components/ui/button/Button'
import Field from '@/components/ui/form/field/Field'
import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import { IEstate } from '@/services/estate.service'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import { useEstateAdd } from '../useEstateAdd'
import ApartmentForm from './ApartmentForm'
import HouseForm from './HouseForm'
import LandForm from './LandForm'
import TypeSelect from './TypeSelect'

const EstateAdd: FC = () => {
	const { control, handleSubmit, watch } = useForm<IEstate>({
		mode: 'onChange'
	})
	const { onSubmit, isLoading } = useEstateAdd()

	const estateType = watch('type')

	const renderEstateTypeForm = () => {
		switch (estateType) {
			case 'APARTMENT':
				return <ApartmentForm control={control} />
			case 'HOUSE':
				return <HouseForm control={control} />
			case 'LAND':
				return <LandForm control={control} />
			default:
				return null
		}
	}

	return (
		<Layout isHasPadding>
			<View>
				{isLoading ? (
					<Loader />
				) : (
					<ScrollView showsVerticalScrollIndicator={false}>
						<TypeSelect control={control} />

						<Field
							control={control}
							name='city'
							placeholder='Город'
							rules={{ required: 'Город обязателен' }}
						/>
						<Field
							control={control}
							name='street'
							placeholder='Улица'
							rules={{ required: 'Улица обязательна' }}
						/>
						<Field control={control} name='house' placeholder='Дом' />
						<Field control={control} name='apartment' placeholder='Квартира' />

						{renderEstateTypeForm()}

						<Button onPress={handleSubmit(onSubmit)} icon='plus'>
							Добавить
						</Button>
					</ScrollView>
				)}
			</View>
		</Layout>
	)
}

export default EstateAdd
