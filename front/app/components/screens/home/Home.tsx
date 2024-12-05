import { FC } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import EstateCatalog from '@/components/ui/estate/catalog/EstateCatalog'
import { useGetAllEstate } from './useGetAllEstate'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'

const Home: FC = () => {
	const { estates, isLoading } = useGetAllEstate()
	const { navigate } = useTypedNavigation()

	if (isLoading) return <Loader />

	return (
		<Layout isHasPadding>
			<View className='flex-row justify-between items-center mb-4'>
				<Text className='text-white text-2xl font-semibold'>Недвижимость</Text>
				<Pressable onPress={() => navigate('EstateAdd')}>
					<Ionicons name='add-circle' size={32} color='white' />
				</Pressable>
			</View>
			<EstateCatalog estates={estates} title='Недвижимость' />
		</Layout>
	)
}

export default Home
