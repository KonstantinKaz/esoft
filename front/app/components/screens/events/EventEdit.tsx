import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'

import Button from '@/components/ui/button/Button'
import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { Ionicons } from '@expo/vector-icons'
import EventForm from './EventForm'
import { useEvent } from './useEvent'
import { useUpdateEvent } from './useUpdateEvent'

const EventEdit: FC = () => {
	const { goBack } = useTypedNavigation()
	const { params } = useTypedRoute<'EventEdit'>()
	const { event, isLoading, deleteAsync } = useEvent(params.id)
	const { updateAsync } = useUpdateEvent()

	const { control, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues: {
			type: event?.type || '',
			dateTime: event?.dateTime || new Date().toISOString(),
			duration: event?.duration?.toString() || '',
			comment: event?.comment || ''
		}
	})

	const onSubmit: SubmitHandler<any> = data => {
		updateAsync({
			id: params.id,
			data
		})
	}

	if (isLoading) return <Loader />

	return (
		<Layout isHasPadding>
			<View>
				<View className='flex-row justify-between items-center mb-4'>
					<Pressable onPress={goBack} className='mr-3'>
						<Ionicons
							name='arrow-back-circle-outline'
							size={32}
							color='white'
						/>
					</Pressable>
					<Text className='text-white text-2xl font-semibold'>
						Редактирование события
					</Text>
				</View>
				<EventForm control={control} />
				<View className='flex-row justify-between mt-4'>
					<Button 
						onPress={handleSubmit(onSubmit)} 
						icon='edit'
						className='w-[48%]'
					>
						Обновить
					</Button>
					<Button 
						onPress={() => deleteAsync(params.id)} 
						icon='trash'
						variant='danger'
						className='w-[48%]'
					>
						Удалить
					</Button>
				</View>
			</View>
		</Layout>
	)
}

export default EventEdit
