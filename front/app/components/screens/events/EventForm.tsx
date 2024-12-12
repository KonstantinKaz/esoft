import Field from '@/components/ui/form/field/Field'
import Select from '@/components/ui/form/select/Select'
import DateTimePicker from '@/components/ui/form/date-time/DateTimePicker'
import { IEvent } from '@/services/event.service'
import React, { FC } from 'react'
import { Control } from 'react-hook-form'
import { ScrollView } from 'react-native'

const eventTypes = [
	{ label: 'Встреча с клиентом', value: 'CLIENT_MEETING' },
	{ label: 'Показ', value: 'SHOWING' },
	{ label: 'Запланированный звонок', value: 'SCHEDULED_CALL' }
]

interface IEventForm {
	control: Control<IEvent>
}

const EventForm: FC<IEventForm> = ({ control }) => {
	return (
		<ScrollView showsVerticalScrollIndicator={false} className='mb-5'>
			<Select
				control={control}
				name='type'
				placeholder='Выберите тип события'
				options={eventTypes}
				rules={{ required: 'Выберите тип события' }}
			/>

			<DateTimePicker
				control={control}
				name='dateTime'
				placeholder='Выберите дату и время'
				rules={{ required: 'Выберите дату и время' }}
			/>

			<Field
				control={control}
				name='duration'
				placeholder='Длительность (в минутах)'
				keyboardType='numeric'
			/>

			<Field
				control={control}
				name='comment'
				placeholder='Комментарий'
				multiline
			/>
		</ScrollView>
	)
}

export default EventForm
