import { useSearchForm } from '@/components/screens/search/useSearchForm'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { UserService } from '@/services/user.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

export const useUsers = () => {
	const { debouncedSearch, control } = useSearchForm()
	const { navigate } = useTypedNavigation()
	const queryClient = useQueryClient()

	const { isLoading, data: users } = useQuery({
		queryKey: ['users', debouncedSearch],
		queryFn: () => UserService.getAll(debouncedSearch)
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete user'],
		mutationFn: (userId: string) => UserService.deleteUser(userId),
		onSuccess: () => {
			Toast.show({
				type: 'success',
				text1: 'Удаление пользователя',
				text2: 'Пользователь успешно удален'
			})
			queryClient.invalidateQueries(['users'])
		}
	})

	const { mutateAsync: addUser } = useMutation({
		mutationKey: ['add user'],
		mutationFn: (data: any) => UserService.createUser(data),
		onSuccess: () => {
			Toast.show({
				type: 'success',
				text1: 'Добавление пользователя',
				text2: 'Пользователь успешно добавлен'
			})
			queryClient.invalidateQueries(['users'])
		},
		onError: (error: any) => {
			Toast.show({
				type: 'error',
				text1: 'Ошибка',
				text2: error.message || 'Не удалось добавить пользователя'
			})
		}
	})

	return { users, isLoading, deleteAsync, control, addUser }
}
