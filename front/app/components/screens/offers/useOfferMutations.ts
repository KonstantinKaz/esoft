import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { OfferService } from '@/services/offer.service'
import Toast from 'react-native-toast-message'

export const useOfferMutations = () => {
  const { goBack } = useTypedNavigation()
  const queryClient = useQueryClient()

  const { mutateAsync: createAsync } = useMutation({
    mutationKey: ['create offer'],
    mutationFn: (data: any) => OfferService.create(data),
    onSuccess() {
      Toast.show({
        type: 'success',
        text1: 'Создание предложения',
        text2: 'успешно создано'
      })
      queryClient.invalidateQueries({ queryKey: ['offers'] })
      goBack()
    }
  })

  const { mutateAsync: updateAsync } = useMutation({
    mutationKey: ['update offer'],
    mutationFn: (data: { id: string; data: any }) => 
      OfferService.update(data.id, data.data),
    onSuccess() {
      Toast.show({
        type: 'success',
        text1: 'Обновление предложения',
        text2: 'успешно обновлено'
      })
      queryClient.invalidateQueries({ queryKey: ['offers'] })
      goBack()
    },
    onError(error: any) {
      Toast.show({
        type: 'error',
        text1: 'Ошибка обновления',
        text2: error.response?.data?.message || 'Что-то пошло не так'
      })
    }
  })

  const { mutateAsync: deleteAsync } = useMutation({
    mutationKey: ['delete offer'],
    mutationFn: (id: string) => OfferService.delete(id),
    onSuccess() {
      Toast.show({
        type: 'success',
        text1: 'Удаление предложения',
        text2: 'успешно удалено'
      })
      queryClient.invalidateQueries({ queryKey: ['offers'] })
      goBack()
    },
    onError(error: any) {
      Toast.show({
        type: 'error',
        text1: 'Ошибка удаления',
        text2: error.response?.data?.message || 'Что-то пошло не так'
      })
    }
  })

  return { createAsync, updateAsync, deleteAsync }
} 