import { useMutation } from '@tanstack/react-query'
import { EstateService } from '@/services/estate.service'
import Toast from 'react-native-toast-message'

export const useEstateAdd = () => {
    const { mutateAsync: addEstate } = useMutation({
        mutationKey: ['add estate'],
        mutationFn: (data) => EstateService.create(data),
        onSuccess: () => {
            Toast.show({
                type: 'success',
                text1: 'Добавление недвижимости',
                text2: 'успешно добавлено'
            })
        }
    })

    const onSubmit = async (data) => {
        await addEstate(data)
    }

    return { onSubmit }
} 