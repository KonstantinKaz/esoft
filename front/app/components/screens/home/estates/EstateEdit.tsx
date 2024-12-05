import { Ionicons } from '@expo/vector-icons'
import React, { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, ScrollView, Text, View } from 'react-native'

import Button from '@/components/ui/button/Button'
import Field from '@/components/ui/form/field/Field'
import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { IEstate } from '@/services/estate.service'
import { useEstateEdit } from './useEstateEdit'

const EstateEdit: FC = () => {
	const { control, setValue, handleSubmit } = useForm<IEstate>({
		mode: 'onChange'
	})

	const { isLoading, onSubmit, estate } = useEstateEdit(setValue)

	const { goBack } = useTypedNavigation()

	return (
		<Layout isHasPadding>
			<View className='flex-row items-center'>
				<Pressable onPress={goBack} className='mr-3'>
					<Ionicons name='arrow-back-circle-outline' size={32} color='white' />
				</Pressable>
				<Text className='text-white text-2xl font-semibold'>
					{estate.type === 'APARTMENT'
						? 'Квартира'
						: estate.type === 'HOUSE'
							? 'Дом'
							: 'Участок'}
				</Text>
			</View>
			<View>
				{isLoading ? (
					<Loader />
				) : (
					<ScrollView showsVerticalScrollIndicator={false}>
						<Field<IEstate> control={control} name='city' placeholder='Город' />
						<Field<IEstate>
							control={control}
							name='street'
							placeholder='Улица'
						/>
						<Field<IEstate> control={control} name='house' placeholder='Дом' />
						<Field<IEstate>
							control={control}
							name='apartment'
							placeholder='Квартира'
						/>

						<Controller
							control={control}
							name='type'
							render={({ field: { value, onChange } }) => (
								<View>
									{/* Здесь можно добавить селектор типа недвижимости */}
								</View>
							)}
						/>

						<Button onPress={handleSubmit(onSubmit)} icon='pen-tool'>
							Update
						</Button>
					</ScrollView>
				)}
			</View>
		</Layout>
	)
}

export default EstateEdit
