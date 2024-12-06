import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import Toast from 'react-native-toast-message'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { IUser, IUserEditInput } from '@/shared/types/user.interface'
import { UserService } from '@/services/user.service'

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
	const { params } = useTypedRoute<'UserEdit'>()
	const { goBack } = useTypedNavigation()
	const userId = params.id

	const { isLoading, data, error } = useQuery({
		queryKey: ['user', userId],
		queryFn: () => UserService.getById(userId),
		enabled: !!userId
	})

	useEffect(() => {
		if (!data) return

		const profile = data.role === 'REALTOR' ? data.realtorProfile : data.clientProfile
		if (!profile) return

		Object.entries(profile).forEach(([key, value]) => {
			if (key !== 'userId' && value !== null) {
				setValue(key as keyof IUserEditInput, value)
			}
		})
	}, [data, setValue])

	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationKey: ['update user'],
		mutationFn: (data: IUserEditInput) => {
			console.log('Sending update data:', data)
			return UserService.update(userId, data)
		},
		onSuccess: async () => {
			Toast.show({
				type: 'success',
				text1: 'Обновление пользователя',
				text2: 'Данные успешно обновлены'
			})

			await queryClient.invalidateQueries({ queryKey: ['users'] })
			goBack()
		},
		onError: (error) => {
			console.error('Update error:', error)
			Toast.show({
				type: 'error',
				text1: 'Ошибка',
				text2: 'Не удалось обновить данные'
			})
		}
	})

	const onSubmit: SubmitHandler<IUserEditInput> = async data => {
		try {
			console.log('Form submitted with data:', data)
			await mutateAsync({
				...data,
				role: data?.role || 'CLIENT'
			})
		} catch (error) {
			console.error('Submit error:', error)
		}
	}

	return { onSubmit, isLoading, data, error }
}
