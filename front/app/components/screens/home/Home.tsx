import { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import EstateCatalog from '@/components/ui/estate/catalog/EstateCatalog'
import Search from '@/components/ui/search/Search'
import { useSearch } from '@/components/ui/search/useSearch'

const Home: FC = () => {
	const { navigate } = useTypedNavigation()
	const { control, searchResults: estates, isLoading } = useSearch(false)

	return (
		<Layout isHasPadding>
			<View className='flex-row justify-between items-center mb-4'>
				<Text className='text-white text-2xl font-semibold'>Недвижимость</Text>
				<Pressable onPress={() => navigate('EstateAdd')}>
					<Ionicons name='add-circle' size={32} color='white' />
				</Pressable>
			</View>
			
			<Search 
				control={control}
				placeholder='Поиск по адресу...'
			/>
			
			{isLoading ? (
				<Loader />
			) : (
				<EstateCatalog estates={estates} />
			)}
		</Layout>
	)
}

export default Home
