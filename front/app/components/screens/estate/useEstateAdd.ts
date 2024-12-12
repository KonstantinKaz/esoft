import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EstateService, IEstate } from '@/services/estate.service'
import Toast from 'react-native-toast-message'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'

export const useEstateAdd = () => {
    const { goBack } = useTypedNavigation()
    const queryClient = useQueryClient()

    const { mutateAsync: addEstate, isLoading } = useMutation({
        mutationKey: ['add estate'],
        mutationFn: (data: IEstate) => EstateService.create(data),
        onSuccess: () => {
            Toast.show({
                type: 'success',
                text1: 'Добавление недвижимости',
                text2: 'успешно добавлено'
            })
            queryClient.invalidateQueries(['estates'])
            goBack()
        }
    })

    const onSubmit = async (data: IEstate) => {
        await addEstate(data)
    }

    return { onSubmit, isLoading }
} 