import { FC, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Layout from '@/components/ui/layout/Layout'
import Button from '@/components/ui/button/Button'
import { useForm } from 'react-hook-form'
import { IDemand } from '@/services/demand.service'
import { useDemandMutations } from './useDemandMutations'
import DemandForm from './DemandForm'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { useDemand } from './useDemand'
import { Ionicons } from '@expo/vector-icons'
import Loader from '@/components/ui/Loader'

const DemandEdit: FC = () => {
  const { goBack } = useTypedNavigation()
  const { params } = useTypedRoute<'DemandEdit'>()
  const { control, handleSubmit, setValue } = useForm<IDemand>({
    mode: 'onChange'
  })

  const { data: demand, isLoading } = useDemand(params.id)
  const { updateAsync, deleteAsync } = useDemandMutations()

  useEffect(() => {
    if (demand) {
      setValue('clientId', demand.clientId)
      setValue('realtorId', demand.realtorId)
      setValue('estateType', demand.estateType)
      setValue('address', demand.address)
      setValue('minPrice', demand.minPrice)
      setValue('maxPrice', demand.maxPrice)
      setValue('minArea', demand.minArea)
      setValue('maxArea', demand.maxArea)
      setValue('minRooms', demand.minRooms)
      setValue('maxRooms', demand.maxRooms)
      setValue('minFloor', demand.minFloor)
      setValue('maxFloor', demand.maxFloor)
      setValue('minFloors', demand.minFloors)
      setValue('maxFloors', demand.maxFloors)
    }
  }, [demand, setValue])

  if (isLoading) return <Loader />

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
          <Text className='text-white text-2xl font-semibold'>Потребность</Text>
        </View>
        <DemandForm control={control} isEdit />
        <View className='flex-row mt-4'>
          <Button
            onPress={handleSubmit(data => updateAsync({ id: params.id, data }))}
            icon='save'
            className='mr-2'
          >
            Сохранить
          </Button>
          <Button
            onPress={() => deleteAsync(params.id)}
            icon='trash'
            variant='danger'
          >
            Удалить
          </Button>
        </View>
      </View>
    </Layout>
  )
}

export default DemandEdit 