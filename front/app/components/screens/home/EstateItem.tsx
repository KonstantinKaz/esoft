import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { IEstate } from '@/services/estate.service'
import { AntDesign } from '@expo/vector-icons'
import { FC } from 'react'
import { Pressable, Text, View } from 'react-native'

interface IEstateItem {
	estate: IEstate
	onPress?: () => void
}

const EstateItem: FC<IEstateItem> = ({ estate, onPress }) => {
	const { navigate } = useTypedNavigation()

	const getEstateDetails = () => {
		switch (estate.type) {
			case 'APARTMENT':
				return estate.apartmentData
					? `${estate.apartmentData.rooms} комн. · ${estate.apartmentData.totalArea} м² · Этаж ${estate.apartmentData.floor}`
					: ''
			case 'HOUSE':
				return estate.houseData
					? `${estate.houseData.rooms} комн. · ${estate.houseData.totalArea} м² · ${estate.houseData.floors} эт.`
					: ''
			case 'LAND':
				const coordinates = estate.landData?.coordinates
					? estate.landData.coordinates
					: null
				const area = estate.landData?.totalArea
					? `${estate.landData.totalArea} м²`
					: ''
				const coords = coordinates
					? `· ${coordinates.latitude.toFixed(6)}, ${coordinates.longitude.toFixed(6)}`
					: ''
				return `${area} ${coords}`
			default:
				return ''
		}
	}

	const getEstateType = () => {
		switch (estate.type) {
			case 'APARTMENT':
				return 'Квартира'
			case 'HOUSE':
				return 'Дом'
			case 'LAND':
				return 'Участок'
			default:
				return ''
		}
	}

	const handlePress = () => {
		if (onPress) onPress()
		else navigate('Estate', { id: estate.id })
	}

	return (
		<Pressable
			onPress={handlePress}
			className='bg-[#222222] p-4 rounded-2xl mb-4'
		>
			<View className='flex-row justify-between items-center mb-2'>
				<Text className='text-white text-lg font-medium'>
					{getEstateType()}
				</Text>
				<AntDesign name='right' size={18} color='white' />
			</View>

			<Text className='text-white text-base mb-2'>
				{[
					estate.street,
					estate.house,
					estate.apartmentData?.apartment,
					estate.city
				]
					.filter(Boolean)
					.join(', ')}
			</Text>

			<Text className='text-white opacity-70 text-sm'>
				{getEstateDetails()}
			</Text>

			{estate.latitude && estate.longitude && (
				<View className='mt-2'>
					<Text className='text-white text-xs'>
						{`${estate.latitude.toFixed(6)}, ${estate.longitude.toFixed(6)}`}
					</Text>
				</View>
			)}
		</Pressable>
	)
}

export default EstateItem
