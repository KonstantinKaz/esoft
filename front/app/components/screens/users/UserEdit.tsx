import Button from '@/components/ui/button/Button'
import Field from '@/components/ui/form/field/Field'
import { IUserEditInput } from '@/shared/types/user.interface'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import { useUserEdit } from './useUserEdit'
import AdminNavigation from '@/components/ui/admin/navigation/AdminNavigation'

const UserEdit: FC = () => {
	const { control, setValue, handleSubmit } = useForm<IUserEditInput>({
		mode: 'onChange'
	})

	const { isLoading, onSubmit } = useUserEdit(setValue)

	return (
		<Layout isHasPadding>
			<AdminNavigation title='Редактировать пользователя' isBackButton />
			<View>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<Field
							control={control}
							name='lastName'
							placeholder='Фамилия'
							rules={{
								required: 'Фамилия обязательна'
							}}
						/>
						<Field
							control={control}
							name='firstName'
							placeholder='Имя'
							rules={{
								required: 'Имя обязательно'
							}}
						/>
						<Field
							control={control}
							name='middleName'
							placeholder='Отчество'
						/>
						<Field
							control={control}
							name='email'
							placeholder='Email'
							rules={{
								required: 'Email обязателен'
							}}
						/>
						<Field
							control={control}
							name='phone'
							placeholder='Телефон'
							rules={{
								required: 'Телефон обязателен'
							}}
						/>

						<Button onPress={handleSubmit(onSubmit)} icon='pen-tool'>
							Обновить
						</Button>
					</>
				)}
			</View>
		</Layout>
	)
}

export default UserEdit
