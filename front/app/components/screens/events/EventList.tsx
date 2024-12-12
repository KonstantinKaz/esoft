import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import React, { FC } from 'react'
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import EventItem from './EventItem'
import { useEvents } from './useEvents'

const EventList: FC = () => {
	const { events, isLoading } = useEvents()
	const { navigate } = useTypedNavigation()
	const { goBack } = useTypedNavigation()

	if (isLoading) return <Loader />

	return (
		<Layout isHasPadding>
			<View className='flex-row justify-between items-center mb-4'>
				<Text className='text-2xl text-white font-semibold'>Все события</Text>
				<View className='flex-row justify-between items-center'>
					<TouchableOpacity onPress={goBack} className='mr-3'>
						<Ionicons
							name='arrow-back-circle-outline'
							size={32}
							color='white'
						/>
					</TouchableOpacity>
					<Pressable onPress={() => navigate('EventAdd')}>
						<MaterialIcons name='add-circle' size={32} color='white' />
					</Pressable>
				</View>
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				{events?.map(event => <EventItem key={event.id} event={event} />)}
			</ScrollView>
		</Layout>
	)
}

export default EventList
