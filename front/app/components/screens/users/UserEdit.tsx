import Button from '@/components/ui/button/Button'
import Field from '@/components/ui/form/field/Field'
import { IUserEditInput } from '@/shared/types/user.interface'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import { useUserEdit } from './useUserEdit'
import { Ionicons } from '@expo/vector-icons'
import { Pressable, Text } from 'react-native'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'

const UserEdit: FC = () => {
	const { control, setValue, handleSubmit, watch } = useForm<IUserEditInput>({
		mode: 'onChange'
	})
	const { goBack } = useTypedNavigation()

	const { isLoading, onSubmit, data, error } = useUserEdit(setValue)

	console.log('UserEdit render:', { isLoading, data })

	if (error) {
		return (
			<Layout isHasPadding>
				<Text className='text-white text-lg'>
					Произошла ошибка при загрузке данных
				</Text>
			</Layout>
		)
	}

	if (isLoading) {
		return (
			<Layout isHasPadding>
				<Loader />
			</Layout>
		)
	}

	if (!data) {
		return (
			<Layout isHasPadding>
				<Text className='text-white text-lg'>Пользователь не найден</Text>
			</Layout>
		)
	}

	const profile = data.role === 'REALTOR' ? data.realtorProfile : data.clientProfile

	if (!profile) {
		return (
			<Layout isHasPadding>
				<Text className='text-white text-lg'>Профиль не найден</Text>
			</Layout>
		)
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
					{data.role === 'REALTOR' ? 'Риэлтор' : 'Клиент'}
				</Text>
			</View>

			<View>
				<Field
					control={control}
					name='lastName'
					placeholder='Фамилия'
					defaultValue={profile.lastName}
					rules={data.role === 'REALTOR' ? 
						{ required: 'Обязательное поле' } : 
						{}}
				/>
				<Field
					control={control}
					name='firstName'
					placeholder='Имя'
					defaultValue={profile.firstName}
					rules={data.role === 'REALTOR' ? 
						{ required: 'Обязательное поле' } : 
						{}}
				/>
				<Field
					control={control}
					name='middleName'
					placeholder='Отчество'
					defaultValue={profile.middleName}
					rules={data.role === 'REALTOR' ? 
						{ required: 'Обязательное поле' } : 
						{}}
				/>
				<Field
					control={control}
					name='email'
					placeholder='Email'
					defaultValue={profile.email}
					rules={{
						validate: (value: string) => {
							if (data.role === 'REALTOR') {
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
					defaultValue={profile.phone}
					rules={{
						validate: (value: string) => {
							if (data.role === 'REALTOR') {
								return value ? true : 'Обязательное поле'
							}
							return value || watch('email') ? true : 'Укажите email или телефон'
						}
					}}
				/>
				{data.role === 'REALTOR' && (
					<Field
						control={control}
						name='commission'
						placeholder='Комиссия'
						defaultValue={profile.commission?.toString()}
						keyboardType='numeric'
						rules={{ required: 'Обязательное поле' }}
					/>
				)}

				<Button onPress={handleSubmit(onSubmit)} icon='pen-tool'>
					Обновить
				</Button>
			</View>
		</Layout>
	)
}

export default UserEdit
