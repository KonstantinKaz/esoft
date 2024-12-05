import AuthFields from '@/components/screens/auth/AuthFields'
import Button from '@/components/ui/button/Button'
import { IAuthFormData } from '@/shared/types/auth.interface'
import { IUserEditInput } from '@/shared/types/user.interface'
import ExpoCheckbox from 'expo-checkbox'

import React, { FC } from 'react'
import { Control, Controller, useForm } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'

import AdminNavigation from '@/components/ui/admin/navigation/AdminNavigation'
import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import { getColor } from '@/config/color.config'
import { useUserEdit } from './useUserEdit'

const UserEdit: FC = () => {
	const { control, setValue, handleSubmit } = useForm<IUserEditInput>({
		mode: 'onChange'
	})

	const { isLoading, onSubmit } = useUserEdit(setValue)

	return (
		<Layout isHasPadding>
			<AdminNavigation title='Edit user' isBackButton />
			<View>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<AuthFields
							control={control as unknown as Control<IAuthFormData>}
						/>

						<Controller
							control={control}
							name='isAdmin'
							render={({ field: { onChange, value } }) => (
								<Pressable
									onPress={() => onChange(!value)}
									className='my-5 w-40 flex-row items-center'
								>
									<ExpoCheckbox
										value={value}
										onValueChange={onChange}
										color={value ? getColor('primary') : undefined}
									/>
									<Text className='text-white text-base ml-2.5'>
										Admin rights
									</Text>
								</Pressable>
							)}
						/>

						<Button onPress={handleSubmit(onSubmit)} icon='pen-tool'>
							Update
						</Button>
					</>
				)}
			</View>
		</Layout>
	)
}

export default UserEdit
