import { useQuery } from '@tanstack/react-query'
import { EventService } from '@/services/event.service'

export const useEvents = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => EventService.getAll()
  })

  return { events, isLoading }
} 