import { useQuery } from '@tanstack/react-query'
import { OfferService } from '@/services/offer.service'

export const useOffers = () => {
  const { data: offers, isLoading } = useQuery({
    queryKey: ['offers'],
    queryFn: () => OfferService.getAll()
  })

  return { offers, isLoading }
} 