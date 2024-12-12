import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import Layout from '@/components/ui/layout/Layout'
import Button from '@/components/ui/button/Button'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { IOffer } from '@/services/offer.service'
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
				<OfferForm control={control} />
				<Button onPress={handleSubmit(createAsync)} icon='plus-circle'>
					Создать
				</Button>
			</View>
		</Layout>
	)
}

export default OfferAdd
