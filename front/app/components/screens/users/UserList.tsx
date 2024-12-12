import Field from '@/components/ui/form/field/Field'
import Layout from '@/components/ui/layout/Layout'
import cn from 'classnames'
import { FC, useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import UserItem from './UserItem'
import { useUsers } from './useUsers'
import { Ionicons } from '@expo/vector-icons'
import { useForm } from 'react-hook-form'
import RoleSelect from './RoleSelect'
import Button from '@/components/ui/button/Button'
import Search from '@/components/ui/search/Search'
import { useSearch } from '@/components/ui/search/useSearch'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useAuth } from '@/hooks/useAuth'
import { AuthService } from '@/services/auth/auth.service'

const UserList: FC = () => {
	const { deleteAsync, addUser } = useUsers()
	const { control: searchControl, searchResults: users, isLoading } = useSearch(true)
	const [selectedRole, setSelectedRole] = useState<string | null>(null)
	const [isAddMode, setIsAddMode] = useState(false)
	const { navigate } = useTypedNavigation()
	const { setUser } = useAuth()

	const { control, handleSubmit, watch, reset } = useForm({
		mode: 'onChange'
	})

	const selectedUserRole = watch('role')

	const filteredUsers = selectedRole
		? users?.filter(user => user.role === selectedRole)
		: users

	const handleToggleAddMode = () => {
		if (isAddMode) {
			reset()
		}
		setIsAddMode(!isAddMode)
	}

	const onSubmit = (data: any) => {
		const formData = {
			...data,
			UserRole: data.role,
			commission: data.role === 'REALTOR' ? Number(data.commission) : undefined
		}
		addUser(formData)
		reset()
		setIsAddMode(false)
	}

	const handleLogout = async () => {
		await AuthService.logout()
		setUser(null)
		navigate('Auth')
	}

	return (
		<Layout isHasPadding>
			<View className='flex-1'>
				<View className='flex-row justify-between items-center mb-4'>
					<Text className='text-2xl text-white font-semibold'>
						Пользователи
					</Text>
					<View className='flex-row items-center'>
						<Pressable onPress={handleLogout} className='mr-2'>
							<Ionicons 
								name='log-out-outline'
								size={32} 
								color='white' 
							/>
						</Pressable>
						<Pressable onPress={handleToggleAddMode}>
							<Ionicons 
								name={isAddMode ? 'close-circle' : 'add-circle'} 
								size={32} 
								color='white' 
							/>
						</Pressable>
					</View>
				</View>

				{!isAddMode && (
					<Search 
						control={searchControl} 
						placeholder='Поиск по ФИО...'
					/>
				)}

				{isAddMode ? (
					<View className='mb-4'>
						<RoleSelect control={control} />
						<Field
							control={control}
							name='password'
							placeholder='Пароль'
							secureTextEntry={true}
							rules={{ required: 'Пароль обязателен' }}
						/>
						<Field
							control={control}
							name='lastName'
							placeholder='Фамилия'
							rules={selectedUserRole === 'REALTOR' ? 
								{ required: 'Обязательное поле' } : 
								{}}
						/>
						<Field
							control={control}
							name='firstName'
							placeholder='Имя'
							rules={selectedUserRole === 'REALTOR' ? 
								{ required: 'Обязательное поле' } : 
								{}}
						/>
						<Field
							control={control}
							name='middleName'
							placeholder='Отчество'
							rules={selectedUserRole === 'REALTOR' ? 
								{ required: 'Обязательное поле' } : 
								{}}
						/>
						<Field
							control={control}
							name='email'
							placeholder='Email'
							rules={{
								validate: (value: string) => {
									if (selectedUserRole === 'REALTOR') {
										return value ? true : 'Обязательное поле'
									}
									return value || watch('phone') ? true : 'Укажите email или телефон'
								}
							}}
						/>
						<Field
							control={control}
							name='phone'
							placeholder='Телефон'
							rules={{
								validate: (value: string) => {
									if (selectedUserRole === 'REALTOR') {
										return value ? true : 'Обязательное поле'
									}
									return value || watch('email') ? true : 'Укажите email или телефон'
								}
							}}
						/>
						{selectedUserRole === 'REALTOR' && (
							<Field
								control={control}
								name='commission'
								placeholder='Комиссия'
								keyboardType='numeric'
								rules={{ required: 'Обязательное поле' }}
							/>
						)}
						<Button onPress={handleSubmit(onSubmit)} icon='plus'>
							Добавить
						</Button>
					</View>
				) : (
					<>
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
					</>
				)}
			</View>
		</Layout>
	)
}

export default UserList
