import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { DemandService } from '@/services/demand.service'
import Toast from 'react-native-toast-message'

export const useDemandMutations = () => {
  const { goBack } = useTypedNavigation()
  const queryClient = useQueryClient()

  const { mutateAsync: createAsync } = useMutation({
    mutationKey: ['create demand'],
    mutationFn: (data: any) => {
      console.log('Sending create request with data:', data)
      return DemandService.create(data)
    },
    onSuccess() {
      Toast.show({
        type: 'success',
        text1: 'Создание потребности',
        text2: 'успешно создана'
      })
      queryClient.invalidateQueries({ queryKey: ['demands'] })
      goBack()
    },
    onError(error: any) {
      console.error('Create demand error:', error.response?.data || error)
      Toast.show({
        type: 'error',
        text1: 'Ошибка создания',
        text2: error.response?.data?.message || 'Что-то пошло не так'
      })
    }
  })

  const { mutateAsync: updateAsync } = useMutation({
    mutationKey: ['update demand'],
    mutationFn: (data: { id: string; data: any }) =>
      DemandService.update(data.id, data.data),
    onSuccess() {
      Toast.show({
        type: 'success',
        text1: 'Обновление потребности',
        text2: 'успешно обновлена'
      })
      queryClient.invalidateQueries({ queryKey: ['demands'] })
      goBack()
    }
  })

  const { mutateAsync: deleteAsync } = useMutation({
    mutationKey: ['delete demand'],
    mutationFn: (id: string) => DemandService.delete(id),
    onSuccess() {
      Toast.show({
        type: 'success',
        text1: 'Удаление потребности',
        text2: 'успешно удалена'
      })
      queryClient.invalidateQueries({ queryKey: ['demands'] })
      goBack()
    }
  })

  return { createAsync, updateAsync, deleteAsync }
} 