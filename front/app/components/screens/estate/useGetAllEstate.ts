import { EstateService } from '@/services/estate.service'
import { useQuery } from '@tanstack/react-query'

export const useGetAllEstate = () => {
	const { data: estates, isLoading } = useQuery({
		queryKey: ['get estates'],
		queryFn: () => EstateService.getAll(),
		select: data => data.slice(0, 10)
	})

	return { estates, isLoading }
}
