import { Controller } from 'react-hook-form'
import { View, Text, Pressable, ScrollView, FlatList } from 'react-native'
import { FC, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

interface ISelect {
  options: { label: string; value: string }[]
  isLoading?: boolean
  placeholder?: string
  error?: string
  control: any
  rules?: any
  name: string
  useScrollView?: boolean
}

const Select: FC<ISelect> = ({
  options = [],
  isLoading,
  placeholder,
  error,
  control,
  rules,
  name,
  useScrollView
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string>('')

  return (
    <View className='mb-4'>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Pressable
              onPress={() => !isLoading && options.length > 0 && setIsOpen(!isOpen)}
              className={`rounded-lg bg-[#222222] p-4 flex-row justify-between items-center ${
                isLoading || options.length === 0 ? 'opacity-50' : ''
              }`}
            >
              <Text className='text-white'>
                {isLoading 
                  ? 'Загрузка...'
                  : options.length === 0
                  ? 'Нет доступных опций'
                  : options.find(option => option.value === value)?.label || placeholder}
              </Text>
              <Ionicons
                name={isOpen ? 'chevron-up' : 'chevron-down'}
                size={20}
                color='white'
              />
            </Pressable>

            {isOpen && options.length > 0 && (
              <View className='rounded-lg bg-[#222222] mt-2 py-2 max-h-52'>
                <ScrollView>
                  {options.map(option => (
                    <Pressable
                      key={option.value}
                      className='p-4'
                      onPress={() => {
                        onChange(option.value)
                        setSelected(option.value)
                        setIsOpen(false)
                      }}
                    >
                      <Text
                        className={
                          selected === option.value
                            ? 'text-primary'
                            : 'text-white'
                        }
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}

            {error?.message && (
              <Text className='text-red-500 text-sm mt-1'>{error.message}</Text>
            )}
          </>
        )}
      />
    </View>
  )
}

export default Select 