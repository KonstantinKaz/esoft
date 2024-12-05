import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import Toast from 'react-native-toast-message'
import { useEffect } from 'react'

import { useTypedRoute } from '@/hooks/useTypedRoute'

import { IMovieEditInput, IParameters } from '@/shared/types/movie.interface'

import { MovieService } from '@/services/movie.service'
import { IActor } from '@/shared/types/actor.interface'
import { IGenre } from '@/shared/types/genre.interface'

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const { params } = useTypedRoute<'MovieEdit'>()
	const movieId = params.id

	const { isLoading, data } = useQuery<IMovieEditInput, Error>({
		queryKey: ['get movie', movieId],
		queryFn: () => MovieService.getById(movieId),
		enabled: !!movieId
	})

	useEffect(() => {
		if (data) {
			Object.entries(data).forEach(([key, value]) => {
				setValue(key as keyof IMovieEditInput, value as string | number | IParameters | IGenre[] | IActor[])
			})
		}
	}, [data, setValue])

	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationKey: ['update movie'],
		 mutationFn: (data: IMovieEditInput) => MovieService.update(movieId, data),
		onSuccess: async () => {
			Toast.show({
				type: 'success',
				text1: 'Update movie',
				text2: 'update was successful'
			})

			await queryClient.invalidateQueries({ queryKey: ['search movies'] })
		}
	})

	const onSubmit: SubmitHandler<IMovieEditInput> = async data => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
