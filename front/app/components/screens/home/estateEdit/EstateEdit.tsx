import { Ionicons } from '@expo/vector-icons'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Pressable, ScrollView, Text, View } from 'react-native'

import Button from '@/components/ui/button/Button'
import Field from '@/components/ui/form/field/Field'
import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { IEstate } from '@/services/estate.service'
import { useEstateEdit } from './useEstateEdit'
import ApartmentForm from '../estateAdd/ApartmentForm'
import HouseForm from '../estateAdd/HouseForm'
import LandForm from '../estateAdd/LandForm'

const EstateEdit: FC = () => {
	const { control, setValue, handleSubmit } = useForm<IEstate>({
		mode: 'onChange'
	})

	const { isLoading, onSubmit, estate } = useEstateEdit(setValue)
	const { goBack } = useTypedNavigation()

	if (isLoading) {
		return (
			<Layout isHasPadding>
				<Loader />
			</Layout>
		)
	}

	if (!estate) {
		return (
			<Layout isHasPadding>
				<Text className='text-white text-lg'>Объект не найден</Text>
			</Layout>
		)
	}

	const renderEstateTypeForm = () => {
		switch (estate.type) {
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
			<View className='flex-row items-center mb-6'>
				<Pressable onPress={goBack} className='mr-3'>
					<Ionicons
						name='arrow-back-circle-outline'
						size={32}
						color='white'
					/>
				</Pressable>
				<Text className='text-white text-2xl font-semibold'>
					{estate.type === 'APARTMENT'
						? 'Квартира'
						: estate.type === 'HOUSE'
							? 'Дом'
							: 'Участок'}
				</Text>
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				<Field
					control={control}
					name='city'
					placeholder='Город'
					defaultValue={estate.city}
				/>
				<Field
					control={control}
					name='street'
					placeholder='Улица'
					defaultValue={estate.street}
				/>
				<Field
					control={control}
					name='house'
					placeholder='Дом'
					defaultValue={estate.house}
				/>
				{estate.type === 'APARTMENT' && (
					<Field
						control={control}
						name='apartment'
						placeholder='Квартира'
						defaultValue={estate.apartmentData?.apartment}
					/>
				)}

				{renderEstateTypeForm()}

				<Button onPress={handleSubmit(onSubmit)} icon='pen-tool'>
					Обновить
				</Button>
			</ScrollView>
		</Layout>
	)
}

export default EstateEdit
