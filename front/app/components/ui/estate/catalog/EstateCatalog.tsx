import EstateItem from '@/components/screens/estate/EstateItem'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { IEstate } from '@/services/estate.service'
import Ionicons from '@expo/vector-icons/Ionicons'
import { FC } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import Heading from '../../heading/Heading'

interface IEstateCatalog {
	title?: string
	description?: string
	estates?: IEstate[]
	isBackButton?: boolean
}

const EstateCatalog: FC<IEstateCatalog> = ({
	title,
	description,
	estates = [],
	isBackButton
}) => {
	const { goBack } = useTypedNavigation()

	return (
		<View>
			<View className='flex-row items-center justify-between'>
				<Heading title={title} className='mb-3' />
				{isBackButton && (
					<Pressable onPress={goBack}>
						<Ionicons
							name='arrow-back-circle-outline'
							size={32}
							color='white'
						/>
					</Pressable>
				)}
			</View>

			{/* {description && <Description text={description} />} */}

			<ScrollView showsVerticalScrollIndicator={false}>
				<View className='mb-32'>
					{estates?.length ? (
						estates.map(estate => (
							<EstateItem key={estate.id} estate={estate} />
						))
					) : (
						<Text className='text-white text-lg'>Elements not found</Text>
					)}
				</View>
			</ScrollView>
		</View>
	)
}

export default EstateCatalog
