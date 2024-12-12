import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EventService } from '@/services/event.service'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'

export const useUpdateEvent = () => {
  const { goBack } = useTypedNavigation()
  const queryClient = useQueryClient()

  const { mutateAsync: updateAsync } = useMutation({
    mutationKey: ['update event'],
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      EventService.update(id, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      goBack()
    }
  })

  return { updateAsync }
} 