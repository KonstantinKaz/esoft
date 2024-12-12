import { useQuery } from '@tanstack/react-query'
import { DemandService } from '@/services/demand.service'
import { UseFormSetValue } from 'react-hook-form'
import { IDemand } from '@/services/demand.service'

export const useDemand = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['get demand', id],
    queryFn: () => DemandService.getById(id)
  })

  return { data, isLoading }
} 