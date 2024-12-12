import { FC } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Layout from '@/components/ui/layout/Layout'
import Button from '@/components/ui/button/Button'
import { useForm } from 'react-hook-form'
import { IEvent } from '@/services/event.service'
import { useEventMutations } from './useEventMutations'
import EventForm from './EventForm'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { Ionicons } from '@expo/vector-icons'

const EventAdd: FC = () => {
  const { goBack } = useTypedNavigation()
  const { control, handleSubmit } = useForm<IEvent>({
    mode: 'onChange',
    defaultValues: {
      type: 'CLIENT_MEETING',
      dateTime: new Date().toISOString(),
      duration: undefined,
      comment: ''
    }
  })

  const { createAsync } = useEventMutations()

  return (
    <Layout isHasPadding>
      <View className='flex-1'>
        <View className='flex-row items-center mb-6'>
          <TouchableOpacity onPress={goBack} className='mr-3'>
            <Ionicons
              name='arrow-back-circle-outline'
              size={32}
              color='white'
            />
          </TouchableOpacity>
          <Text className='text-white text-2xl font-semibold'>
            Добавление события
          </Text>
        </View>
        <EventForm control={control} />
        <Button onPress={handleSubmit(createAsync)} icon='plus-circle'>
          Создать
        </Button>
      </View>
    </Layout>
  )
}

export default EventAdd 