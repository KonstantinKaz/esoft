import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { FC } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'

import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useEstate } from './useEstate'

const Estate: FC = () => {
	const { estate, isLoading, deleteAsync } = useEstate()
	const { goBack, navigate } = useTypedNavigation()

	if (isLoading) return <Loader />
	if (!estate) return null

	const getEstateDetails = () => {
		switch (estate.type) {
			case 'APARTMENT':
				return (
					estate.apartmentData && (
						<>
							<Text className='text-white text-base mb-2'>
								Количество комнат: {estate.apartmentData.rooms}
							</Text>
							<Text className='text-white text-base mb-2'>
								Этаж: {estate.apartmentData.floor}
							</Text>
							<Text className='text-white text-base mb-2'>
								Общая площадь: {estate.apartmentData.totalArea} м²
							</Text>
						</>
					)
				)
			case 'HOUSE':
				return (
					estate.houseData && (
						<>
							<Text className='text-white text-base mb-2'>
								Количество комнат: {estate.houseData.rooms}
							</Text>
							<Text className='text-white text-base mb-2'>
								Этажей: {estate.houseData.floors}
							</Text>
							<Text className='text-white text-base mb-2'>
								Общая площадь: {estate.houseData.totalArea} м²
							</Text>
						</>
					)
				)
			case 'LAND':
				return (
					estate.landData && (
						<Text className='text-white text-base mb-2'>
							Площадь участка: {estate.landData.totalArea} м²
						</Text>
					)
				)
			default:
				return null
		}
	}

	return (
		<Layout isHasPadding>
			<View className='flex-row items-center justify-between mb-6'>
				<View className='flex-row items-center'>
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
				<View className='flex-row items-center'>
					<Pressable
						onPress={() => navigate('EstateEdit', { id: estate.id })}
						className='mr-4'
					>
						<MaterialIcons name='edit' size={24} color='white' />
					</Pressable>
					<Pressable onPress={() => deleteAsync()} className='mr-4'>
						<MaterialIcons name='delete' size={24} color='#FF4B4B' />
					</Pressable>
				</View>
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				<View className='mb-32'>
					<Text className='text-white text-xl mb-4'>
						{[estate.street, estate.house, estate.city, estate.apartment]
							.filter(Boolean)
							.join(', ')}
					</Text>

					{getEstateDetails()}

					{estate.latitude && estate.longitude && (
						<View className='mt-4'>
							<Text className='text-gray-400 mb-2'>Координаты:</Text>
							<Text className='text-white'>
								{`${estate.latitude.toFixed(6)}, ${estate.longitude.toFixed(6)}`}
							</Text>
						</View>
					)}
				</View>
			</ScrollView>
		</Layout>
	)
}

export default Estate
