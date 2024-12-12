import Button from '@/components/ui/button/Button'
import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { FC } from 'react'
import { ScrollView, Text, View } from 'react-native'
import DemandItem from './DemandItem'
import { useDemands } from './useDemands'

const DemandList: FC = () => {
	const { navigate } = useTypedNavigation()
	const { demands, isLoading } = useDemands()

	return (
		<Layout isHasPadding>
			<View className='flex-row justify-between items-center mb-4'>
				<Text className='text-2xl text-white font-semibold'>Потребности</Text>
				<Button onPress={() => navigate('DemandAdd')} icon='plus-circle'>
					Создать
				</Button>
			</View>

			{isLoading ? (
				<Loader />
			) : (
				<ScrollView showsVerticalScrollIndicator={false}>
					{demands?.map(demand => (
						<DemandItem key={demand.id} demand={demand} />
					))}
				</ScrollView>
			)}
		</Layout>
	)
}

export default DemandList
