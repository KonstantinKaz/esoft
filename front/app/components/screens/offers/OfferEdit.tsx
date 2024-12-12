import Button from '@/components/ui/button/Button'
import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { IOffer } from '@/services/offer.service'
import { Ionicons } from '@expo/vector-icons'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Text, TouchableOpacity, View } from 'react-native'
import OfferForm from './OfferForm'
import { useOffer } from './useOffer'
import { useOfferMutations } from './useOfferMutations'

const OfferEdit: FC = () => {
	const { goBack } = useTypedNavigation()
	const { params } = useTypedRoute<'OfferEdit'>()
	const { control, handleSubmit, setValue } = useForm<IOffer>({
		mode: 'onChange'
	})

	const { isLoading, offer } = useOffer(params.id, setValue)
	const { updateAsync, deleteAsync } = useOfferMutations()

	if (isLoading) return <Loader />

	return (
		<Layout isHasPadding>
			<View className='flex-1'>
				<View className='flex-row items-center mb-6'>
					<TouchableOpacity onPress={goBack} className='mr-3'>
						<Ionicons
							name='arrow-back-circle-outline'
							size={32}
							color='white'
						/>
					</TouchableOpacity>
					<Text className='text-white text-2xl font-semibold'>Предложение</Text>
				</View>
				<OfferForm control={control} isEdit />
				<View className='flex-row mt-4'>
					<Button
						onPress={handleSubmit(data => updateAsync({ id: params.id, data }))}
						icon='save'
						className='mr-2'
					>
						Сохранить
					</Button>
					<Button
						onPress={() => deleteAsync(params.id)}
						icon='trash'
						variant='danger'
					>
						Удалить
					</Button>
				</View>
			</View>
		</Layout>
	)
}

export default OfferEdit
