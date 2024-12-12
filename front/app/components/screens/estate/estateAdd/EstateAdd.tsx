import Button from '@/components/ui/button/Button'
import Field from '@/components/ui/form/field/Field'
import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import { IEstate } from '@/services/estate.service'
import { Ionicons } from '@expo/vector-icons'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { useEstateAdd } from '../useEstateAdd'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import ApartmentForm from './ApartmentForm'
import HouseForm from './HouseForm'
import LandForm from './LandForm'
import TypeSelect from './TypeSelect'

const EstateAdd: FC = () => {
	const { control, handleSubmit, watch } = useForm<IEstate>({
		mode: 'onChange'
	})
	const { onSubmit, isLoading } = useEstateAdd()
	const { goBack } = useTypedNavigation()

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
			<View className='flex-row items-center mb-6'>
				<Pressable onPress={goBack} className='mr-3'>
					<Ionicons
						name='arrow-back-circle-outline'
						size={32}
						color='white'
					/>
				</Pressable>
				<Text className='text-white text-2xl font-semibold'>
					Добавить объект
				</Text>
			</View>

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
						<Field
							control={control}
							name='house'
							placeholder='Дом'
							rules={{ required: 'Дом обязателен' }}
						/>

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
