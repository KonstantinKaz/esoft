import Field from '@/components/ui/form/field/Field'
import Layout from '@/components/ui/layout/Layout'
import cn from 'classnames'
import { FC, useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import UserItem from './UserItem'
import { useUsers } from './useUsers'

const UserList: FC = () => {
	const { users, isLoading, deleteAsync, control } = useUsers()
	const [selectedRole, setSelectedRole] = useState<string | null>(null)

	const filteredUsers = selectedRole
		? users?.filter(user => user.role === selectedRole)
		: users

	return (
		<Layout isHasPadding>
			<Text className='text-2xl text-white font-semibold mb-4'>
				Пользователи
			</Text>

			<View className='flex-row justify-around my-4'>
				<Pressable
					className={cn(
						'py-2 px-4 rounded-xl',
						!selectedRole ? 'bg-primary' : 'bg-[#232323]'
					)}
					onPress={() => setSelectedRole(null)}
				>
					<Text className='text-white'>Все</Text>
				</Pressable>
				<Pressable
					className={cn(
						'py-2 px-4 rounded-xl',
						selectedRole === 'CLIENT' ? 'bg-primary' : 'bg-[#232323]'
					)}
					onPress={() => setSelectedRole('CLIENT')}
				>
					<Text className='text-white'>Клиенты</Text>
				</Pressable>
				<Pressable
					className={cn(
						'py-2 px-4 rounded-xl',
						selectedRole === 'REALTOR' ? 'bg-primary' : 'bg-[#232323]'
					)}
					onPress={() => setSelectedRole('REALTOR')}
				>
					<Text className='text-white'>Риэлторы</Text>
				</Pressable>
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				<View className='mb-32'>
					{filteredUsers?.map(user => (
						<UserItem
							key={user.id}
							{...user}
							onDelete={() => deleteAsync(user.id)}
						/>
					))}
				</View>
			</ScrollView>
		</Layout>
	)
}

export default UserList
