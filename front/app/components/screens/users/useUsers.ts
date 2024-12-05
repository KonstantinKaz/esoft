import { useSearchForm } from '@/components/screens/search/useSearchForm'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { UserService } from '@/services/user.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

export const useUsers = () => {
	const { debouncedSearch, control } = useSearchForm()
	const { navigate } = useTypedNavigation()

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
		}
	})

	return { users, isLoading, deleteAsync, control }
}
