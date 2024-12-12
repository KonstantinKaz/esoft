import { useQuery } from '@tanstack/react-query'
import { DemandService } from '@/services/demand.service'

export const useDemands = () => {
  const { data: demands, isLoading } = useQuery({
    queryKey: ['demands'],
    queryFn: () => DemandService.getAll()
  })

  return { demands, isLoading }
} 