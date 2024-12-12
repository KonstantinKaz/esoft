import { useQuery } from '@tanstack/react-query'
import { EventService } from '@/services/event.service'

export const useEventsToday = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ['events', 'today'],
    queryFn: () => EventService.getTodayEvents()
  })

  return { events, isLoading }
} 