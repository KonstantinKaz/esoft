import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { EventService } from '@/services/event.service'
import Toast from 'react-native-toast-message'

export const useEventMutations = () => {
  const { goBack } = useTypedNavigation()
  const queryClient = useQueryClient()

  const { mutateAsync: createAsync } = useMutation({
    mutationKey: ['create event'],
    mutationFn: (data: any) => EventService.create(data),
    onSuccess() {
      Toast.show({
        type: 'success',
        text1: 'Создание события',
        text2: 'успешно создано'
      })
      queryClient.invalidateQueries({ queryKey: ['events'] })
      queryClient.invalidateQueries({ queryKey: ['events-today'] })
      goBack()
    }
  })

  const { mutateAsync: updateAsync } = useMutation({
    mutationKey: ['update event'],
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      EventService.update(id, data),
    onSuccess() {
      Toast.show({
        type: 'success',
        text1: 'Обновление события',
        text2: 'успешно обновлено'
      })
      queryClient.invalidateQueries({ queryKey: ['events'] })
      queryClient.invalidateQueries({ queryKey: ['events-today'] })
      goBack()
    }
  })

  const { mutateAsync: deleteAsync } = useMutation({
    mutationKey: ['delete event'],
    mutationFn: (id: string) => EventService.delete(id),
    onSuccess() {
      Toast.show({
        type: 'success',
        text1: 'Удаление события',
        text2: 'успешно удалено'
      })
      queryClient.invalidateQueries({ queryKey: ['events'] })
      queryClient.invalidateQueries({ queryKey: ['events-today'] })
      goBack()
    }
  })

  return { createAsync, updateAsync, deleteAsync }
} 