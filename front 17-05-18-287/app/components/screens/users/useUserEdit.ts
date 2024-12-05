import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import Toast from 'react-native-toast-message'

import { useTypedRoute } from '@/hooks/useTypedRoute'

import { IUser, IUserEditInput } from '@/shared/types/user.interface'

import { UserService } from '@/services/user.service'

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
	const { params } = useTypedRoute<'UserEdit'>()
	const userId = params.id

	const { isLoading, data } = useQuery<IUser, Error>({
		queryKey: ['get user', userId],
		queryFn: () => UserService.getById(userId),
		enabled: !!userId
	})

	useEffect(() => {
		if (data) {
			setValue('email', data.email)
			setValue('isAdmin', data.isAdmin)
		}
	}, [data, setValue])

	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationKey: ['update user'],
		mutationFn: (data: IUserEditInput) => UserService.update(userId, data),
		onSuccess: async () => {
			Toast.show({
				type: 'success',
				text1: 'Update user',
				text2: 'update was successful'
			})

			await queryClient.invalidateQueries({ queryKey: ['search users'] })
		}
	})

	const onSubmit: SubmitHandler<IUserEditInput> = async data => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
