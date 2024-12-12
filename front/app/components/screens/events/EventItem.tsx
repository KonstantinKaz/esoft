import { FC } from 'react'
import { View, Text, Pressable } from 'react-native'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { IEvent } from '@/services/event.service'
import { MaterialIcons } from '@expo/vector-icons'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const EventItem: FC<{ event: IEvent }> = ({ event }) => {
  const { navigate } = useTypedNavigation()

  const getEventTypeText = (type: string) => {
    switch (type) {
      case 'CLIENT_MEETING':
        return 'Встреча с клиентом'
      case 'SHOWING':
        return 'Показ'
      case 'SCHEDULED_CALL':
        return 'Запланированный звонок'
      default:
        return type
    }
  }

  return (
    <Pressable
      onPress={() => navigate('EventEdit', { id: event.id })}
      className='bg-[#222222] p-4 rounded-xl mb-4'
    >
      <View className='flex-row justify-between items-center mb-2'>
        <Text className='text-white text-lg font-medium'>
          {getEventTypeText(event.type)}
        </Text>
        <MaterialIcons name='edit' size={20} color='white' />
      </View>

      <Text className='text-white text-base mb-2'>
        {format(new Date(event.dateTime), 'dd MMMM, HH:mm', { locale: ru })}
      </Text>

      {event.duration && (
        <Text className='text-white opacity-70 text-sm'>
          Длительность: {event.duration} мин.
        </Text>
      )}

      {event.comment && (
        <Text className='text-white opacity-70 text-sm mt-2'>
          {event.comment}
        </Text>
      )}
    </Pressable>
  )
}

export default EventItem 