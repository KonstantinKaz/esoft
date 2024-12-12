import { FC } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Layout from '@/components/ui/layout/Layout'
import Button from '@/components/ui/button/Button'
import { useForm } from 'react-hook-form'
import { IDemand } from '@/services/demand.service'
import { useDemandMutations } from './useDemandMutations'
import DemandForm from './DemandForm'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { Ionicons } from '@expo/vector-icons'

const DemandAdd: FC = () => {
  const { goBack } = useTypedNavigation()
  const { control, handleSubmit } = useForm<IDemand>({
    mode: 'onChange',
    defaultValues: {
      clientId: '',
      realtorId: '',
      estateType: 'APARTMENT',
      address: '',
      minPrice: undefined,
      maxPrice: undefined,
      minArea: undefined,
      maxArea: undefined,
      minRooms: undefined,
      maxRooms: undefined,
      minFloor: undefined,
      maxFloor: undefined,
      minFloors: undefined,
      maxFloors: undefined
    }
  })

  const { createAsync } = useDemandMutations()

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
            Добавление потребности
          </Text>
        </View>
        <DemandForm control={control} />
        <Button onPress={handleSubmit(createAsync)} icon='plus-circle'>
          Создать
        </Button>
      </View>
    </Layout>
  )
}

export default DemandAdd