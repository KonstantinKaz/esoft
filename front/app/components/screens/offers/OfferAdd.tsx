import Button from '@/components/ui/button/Button'
import Layout from '@/components/ui/layout/Layout'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { IOffer } from '@/services/offer.service'
import Ionicons from '@expo/vector-icons/Ionicons'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Text, TouchableOpacity, View } from 'react-native'
import OfferForm from './OfferForm'
import { useOfferMutations } from './useOfferMutations'
const OfferAdd: FC = () => {
	const { goBack } = useTypedNavigation()
	const { control, handleSubmit } = useForm<IOffer>({
		mode: 'onChange',
		defaultValues: {
			price: '',
			clientId: '',
			realtorId: '',
			estateId: ''
		}
	})

	const { createAsync } = useOfferMutations()

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
					<Text className='text-white text-2xl font-semibold'>
						Добавление предложения
					</Text>
				</View>
				<OfferForm control={control} />
				<Button onPress={handleSubmit(createAsync)} icon='plus-circle'>
					Создать
				</Button>
			</View>
		</Layout>
	)
}

export default OfferAdd
