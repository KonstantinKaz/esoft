import { useMutation, useQuery } from '@tanstack/react-query'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import Toast from 'react-native-toast-message'

import { IAuthFormData } from '@/shared/types/auth.interface'

import { UserService } from '@/services/user.service'
import { useEffect } from 'react'

export const useProfile = (setValue: UseFormSetValue<IAuthFormData>) => {
	const { isLoading, data } = useQuery({
		queryKey: ['profile'],
		queryFn: () => UserService.getProfile()
	})

	useEffect(() => {
		if (data) {
			setValue('email', data.email)
		}
	}, [data, setValue])

	const { mutateAsync } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: IAuthFormData) => UserService.updateProfile(data),
		onSuccess() {
			Toast.show({
				type: 'success',
				text1: 'Update profile',
				text2: 'update was successful'
			})
		}
	})

	const onSubmit: SubmitHandler<IAuthFormData> = async data => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
