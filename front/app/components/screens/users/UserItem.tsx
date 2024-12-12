import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { IUser } from '@/shared/types/user.interface'
import { MaterialIcons } from '@expo/vector-icons'
import { FC, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import UserDeals from './UserDeals'

interface IUserItem extends IUser {
	onDelete: () => void
}

const UserItem: FC<IUserItem> = ({
	id,
	role,
	clientProfile,
	realtorProfile,
	onDelete
}) => {
	const { navigate } = useTypedNavigation()
	const [isDealsVisible, setIsDealsVisible] = useState(false)
	const profile = role === 'REALTOR' ? realtorProfile : clientProfile

	const getName = () => {
		if (!profile) return <Text className='text-white text-sm opacity-70'>ID: {id}</Text>

		const name = [profile.lastName, profile.firstName, profile.middleName]
			.filter(Boolean)
			.join(' ')

		return name ? (
			<Text className='text-white text-lg font-medium'>{name}</Text>
		) : (
			<Text className='text-white text-sm opacity-70'>ID: {id}</Text>
		)
	}

	return (
		<View className='bg-[#222222] p-4 rounded-xl mb-4'>
			<View className='flex-row justify-between items-center mb-2'>
				<Pressable 
					className='flex-1 mr-2'
					onPress={() => setIsDealsVisible(!isDealsVisible)}
				>
					{getName()}
				</Pressable>
				<View className='flex-row items-center'>
					<Pressable
						onPress={() => navigate('UserEdit', { id })}
						className='mr-3'
					>
						<MaterialIcons name='edit' size={20} color='white' />
					</Pressable>
					<Pressable onPress={onDelete}>
						<MaterialIcons name='delete' size={20} color='#FF4B4B' />
					</Pressable>
				</View>
			</View>

			{profile && (
				<View>
					{profile.email && (
						<Text className='text-gray-400 text-base'>
							Email: {profile.email}
						</Text>
					)}
					{profile.phone && (
						<Text className='text-gray-400 text-base mt-1'>
							Телефон: {profile.phone}
						</Text>
					)}
				</View>
			)}

			<Text className='text-white opacity-70 text-sm mt-2'>
				{role === 'CLIENT' ? 'Клиент' : 'Риэлтор'}
			</Text>

			{isDealsVisible && (
				<UserDeals userId={id} role={role} />
			)}
		</View>
	)
}

export default UserItem
