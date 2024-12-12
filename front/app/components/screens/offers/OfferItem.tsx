import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { IOffer } from '@/services/offer.service'
import { AntDesign } from '@expo/vector-icons'
import { FC } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'

const OfferItem: FC<{ offer: IOffer }> = ({ offer }) => {
	const { navigate } = useTypedNavigation()

	const getFullName = (profile: any) => {
		return `${profile?.lastName} ${profile?.firstName} ${profile?.middleName}`.trim()
	}

	return (
		<TouchableOpacity
			onPress={() => navigate('OfferEdit', { id: offer.id })}
			className='bg-[#222222] p-4 rounded-2xl mb-4'
		>
			<View className='flex-row justify-between items-center mb-2'>
				<Text className='text-white text-xl'>
					{offer.estate?.city}, {offer.estate?.street} {offer.estate?.house}
				</Text>
				<AntDesign name='edit' color='white' size={20} />
			</View>

			<Text className='text-white text-lg mb-1'>
				Клиент: {getFullName(offer.client?.clientProfile)}
			</Text>

			<Text className='text-white text-lg mb-2'>
				Риэлтор: {getFullName(offer.realtor?.realtorProfile)}
			</Text>

			<Text className='text-white text-xl'>
				Цена: {offer.price.toLocaleString()} ₽
			</Text>
		</TouchableOpacity>
	)
}

export default OfferItem
