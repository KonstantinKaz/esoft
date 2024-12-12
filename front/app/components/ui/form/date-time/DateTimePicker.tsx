import { FC, useState } from 'react'
import { View, Text, Pressable, Platform } from 'react-native'
import { Control, Controller } from 'react-hook-form'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { MaterialIcons } from '@expo/vector-icons'

interface IDateTimePicker {
  control: Control<any>
  name: string
  placeholder?: string
  rules?: Object
}

const DateTimePicker: FC<IDateTimePicker> = ({
  control,
  name,
  placeholder = 'Выберите дату и время',
  rules = {}
}) => {
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState<'date' | 'time'>('date')

  const onChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShow(false)
    }
    return selectedDate
  }

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true)
    setMode(currentMode)
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className='mb-4'>
          <View className='flex-row justify-between'>
            <Pressable
              onPress={() => showMode('date')}
              className='bg-[#222222] rounded-lg p-4 flex-1 mr-2'
            >
              <View className='flex-row justify-between items-center'>
                <Text className='text-white'>
                  {value ? format(new Date(value), 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                </Text>
                <MaterialIcons name='date-range' size={20} color='white' />
              </View>
            </Pressable>

            <Pressable
              onPress={() => showMode('time')}
              className='bg-[#222222] rounded-lg p-4 flex-1'
            >
              <View className='flex-row justify-between items-center'>
                <Text className='text-white'>
                  {value ? format(new Date(value), 'HH:mm', { locale: ru }) : 'Выберите время'}
                </Text>
                <MaterialIcons name='access-time' size={20} color='white' />
              </View>
            </Pressable>
          </View>

          {error && (
            <Text className='text-red-500 text-sm mt-1'>{error.message}</Text>
          )}

          {show && (
            <RNDateTimePicker
              testID='dateTimePicker'
              value={value ? new Date(value) : new Date()}
              mode={mode}
              is24Hour={true}
              onChange={(event, date) => {
                if (event.type === 'set' && date) {
                  onChange(date.toISOString())
                }
                setShow(false)
              }}
            />
          )}
        </View>
      )}
    />
  )
}

export default DateTimePicker
