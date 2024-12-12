import { FC } from 'react'
import { ScrollView, TextInput, Text, View } from 'react-native'
import { Control, Controller } from 'react-hook-form'
import Field from '@/components/ui/form/field/Field'
import { IOffer } from '@/services/offer.service'
import UserSelect from './UserSelect'
import EstateSelect from './EstateSelect'

interface IOfferForm {
  control: Control<IOffer>
  isEdit?: boolean
}

const OfferForm: FC<IOfferForm> = ({ control, isEdit }) => {
  const formatPrice = (value: string) => {
    if (!value) return ''
    // Удаляем все нечисловые символы
    const numbers = value.replace(/\D/g, '')
    // Форматируем число с разделителями
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} className='mb-5'>
      <UserSelect
        control={control}
        name='clientId'
        placeholder='Выберите клиента'
        role='CLIENT'
        rules={{ required: 'Выберите клиента' }}
      />

      <UserSelect
        control={control}
        name='realtorId'
        placeholder='Выберите риэлтора'
        role='REALTOR'
        rules={{ required: 'Выберите риэлтора' }}
      />

      <EstateSelect
        control={control}
        rules={{ required: 'Выберите объект недвижимости' }}
      />

      <Controller
        control={control}
        name='price'
        rules={{
          required: 'Укажите цену',
          min: {
            value: 1,
            message: 'Цена должна быть больше 0'
          }
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View className='mb-4'>
            <TextInput
              placeholder='Цена'
              placeholderTextColor='#666'
              onChangeText={(text: string) => {
                const formatted = formatPrice(text)
                onChange(formatted.replace(/\s/g, '')) // Сохраняем без пробелов
              }}
              value={value ? formatPrice(value.toString()) : ''}
              keyboardType='numeric'
              className='rounded-lg bg-[#222222] text-white p-3'
            />
            {error?.message && (
              <Text className='text-red-500 text-sm mt-1'>{error.message}</Text>
            )}
          </View>
        )}
      />
    </ScrollView>
  )
}

export default OfferForm 