import { FC } from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import { useEventsToday } from './useEventsToday'
import Layout from '@/components/ui/layout/Layout'
import EventItem from './EventItem'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { Ionicons } from '@expo/vector-icons'
import Loader from '@/components/ui/Loader'

const EventsToday: FC = () => {
	const { events, isLoading } = useEventsToday()
	const { navigate } = useTypedNavigation()

	if (isLoading) return <Loader />

	return (
		<Layout isHasPadding>
			<View className='flex-1'>
				<View className='flex-row justify-between items-center mb-4'>
					<Text className='text-2xl text-white font-semibold'>
						События на сегодня
					</Text>
					<View className='flex-row items-center'>
						<Pressable onPress={() => navigate('EventList')} className='mr-2'>
							<Ionicons 
								name='calendar-outline'
								size={32} 
								color='white' 
							/>
						</Pressable>
						<Pressable onPress={() => navigate('EventAdd')}>
							<Ionicons 
								name='add-circle' 
								size={32} 
								color='white' 
							/>
						</Pressable>
					</View>
				</View>

				<ScrollView showsVerticalScrollIndicator={false}>
					<View className='mb-32'>
						{events?.map(event => (
							<EventItem key={event.id} event={event} />
						))}
						{events?.length === 0 && (
							<Text className='text-white text-lg text-center mt-4'>
								На сегодня событий нет
							</Text>
						)}
					</View>
				</ScrollView>
			</View>
		</Layout>
	)
}

export default EventsToday 