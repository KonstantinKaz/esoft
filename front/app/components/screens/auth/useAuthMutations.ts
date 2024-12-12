import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import { UseFormReset } from 'react-hook-form'

import { useAuth } from '@/hooks/useAuth'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'

import { IAuthFormData } from '@/shared/types/auth.interface'

import { AuthService } from '@/services/auth/auth.service'

export const useAuthMutations = (reset: () => void) => {
	const { setUser } = useAuth()
	const { navigate } = useTypedNavigation()

	const { mutateAsync: loginSync, isLoading: isLoginLoading } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IAuthFormData) => {
			console.log('Login mutation data:', data)
			return AuthService.main('login', data.email, data.password)
		},
		onSuccess(data) {
			console.log('Login success:', data)
			reset()
			setUser(data.user)
			navigate('EventsToday')
		},
		onError(error: any) {
			console.error('Login error:', error.response?.data || error)
		}
	})

	const { mutateAsync: registerSync, isLoading: isRegisterLoading } = useMutation({
		mutationKey: ['register'],
		mutationFn: ({ email, password }: IAuthFormData) =>
			AuthService.main('reg', email, password),
		onSuccess(data) {
			reset()
			setUser(data.user)
		}
	})

	return useMemo(
		() => ({
			loginSync,
			registerSync,
			isLoading: isLoginLoading || isRegisterLoading
		}),
		[isLoginLoading, isRegisterLoading]
	)
}
