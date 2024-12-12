import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { IOffer } from '@/services/offer.service'
import { AntDesign } from '@expo/vector-icons'
import { FC } from 'react'
import { Pressable, Text, View } from 'react-native'

const OfferItem: FC<{ offer: IOffer }> = ({ offer }) => {
	const { navigate } = useTypedNavigation()

	const getFullName = (profile: any) => {
		return `${profile?.lastName} ${profile?.firstName} ${profile?.middleName}`.trim()
	}

	return (
		<Pressable
			onPress={() => navigate('OfferEdit', { id: offer.id })}
			className='bg-[#222222] p-4 rounded-2xl mb-4'
		>
			<View className='flex-row justify-between items-center mb-2'>
				<Text className='text-white text-lg font-medium'>
					{offer.estate?.city}, {offer.estate?.street} {offer.estate?.house}
				</Text>
				<AntDesign name='right' size={18} color='white' />
			</View>

			<Text className='text-white text-base mb-2'>
				{offer.price.toLocaleString()} ₽
			</Text>

			<View className='mt-1'>
				<Text className='text-white text-xs opacity-70'>
					Клиент: {getFullName(offer.client?.clientProfile)}
				</Text>
				<Text className='text-white text-xs opacity-70'>
					Риэлтор: {getFullName(offer.realtor?.realtorProfile)}
				</Text>
			</View>
		</Pressable>
	)
}

export default OfferItem
