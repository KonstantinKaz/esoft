import { useQuery } from '@tanstack/react-query'
import { UseFormSetValue } from 'react-hook-form'
import { useEffect } from 'react'
import { OfferService, IOffer } from '@/services/offer.service'

export const useOffer = (id: string, setValue: UseFormSetValue<IOffer>) => {
  const { isLoading, data: offer } = useQuery({
    queryKey: ['get offer', id],
    queryFn: () => OfferService.getById(id),
    enabled: !!id
  })

  useEffect(() => {
    if (!offer) return

    setValue('price', offer.price)
    setValue('clientId', offer.clientId)
    setValue('realtorId', offer.realtorId)
    setValue('estateId', offer.estateId)
  }, [offer])

  return { isLoading, offer }
} 