import { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { IDemand } from '@/services/demand.service'
import { AntDesign } from '@expo/vector-icons'

const DemandItem: FC<{ demand: IDemand }> = ({ demand }) => {
  const { navigate } = useTypedNavigation()

  const getFullName = (profile: any) => {
    return `${profile?.lastName} ${profile?.firstName} ${profile?.middleName}`.trim()
  }

  const getEstateType = () => {
    switch (demand.estateType) {
      case 'APARTMENT':
        return 'Квартира'
      case 'HOUSE':
        return 'Дом'
      case 'LAND':
        return 'Участок'
      default:
        return ''
    }
  }

  const formatPrice = (price?: number) => {
    if (!price && price !== 0) return ''
    return price.toLocaleString('ru-RU')
  }

  const getDemandDetails = () => {
    switch (demand.estateType) {
      case 'APARTMENT':
        return [
          demand.minRooms && demand.maxRooms ? `${demand.minRooms}-${demand.maxRooms} комн.` : '',
          demand.minArea && demand.maxArea ? `${demand.minArea}-${demand.maxArea} м²` : '',
          demand.minFloor && demand.maxFloor ? `Этаж ${demand.minFloor}-${demand.maxFloor}` : ''
        ].filter(Boolean).join(' · ')
      case 'HOUSE':
        return [
          demand.minRooms && demand.maxRooms ? `${demand.minRooms}-${demand.maxRooms} комн.` : '',
          demand.minArea && demand.maxArea ? `${demand.minArea}-${demand.maxArea} м²` : '',
          demand.minFloors && demand.maxFloors ? `${demand.minFloors}-${demand.maxFloors} эт.` : ''
        ].filter(Boolean).join(' · ')
      case 'LAND':
        return demand.minArea && demand.maxArea ? `${demand.minArea}-${demand.maxArea} м²` : ''
      default:
        return ''
    }
  }

  return (
    <Pressable
      onPress={() => navigate('DemandEdit', { id: demand.id })}
      className='bg-[#222222] p-4 rounded-2xl mb-4'
    >
      <View className='flex-row justify-between items-center mb-2'>
        <Text className='text-white text-lg font-medium'>
          {getEstateType()}
        </Text>
        <AntDesign name='right' size={18} color='white' />
      </View>

      <Text className='text-white text-base mb-2'>
        {`${formatPrice(demand.minPrice)} - ${formatPrice(demand.maxPrice)} ₽`}
      </Text>

      <Text className='text-white opacity-70 text-sm mb-2'>
        {getDemandDetails()}
      </Text>

      {demand.address && (
        <Text className='text-white text-sm mb-2'>
          {demand.address}
        </Text>
      )}

      <View className='mt-1'>
        <Text className='text-white text-xs opacity-70'>
          Клиент: {getFullName(demand.client?.clientProfile)}
        </Text>
        <Text className='text-white text-xs opacity-70'>
          Риэлтор: {getFullName(demand.realtor?.realtorProfile)}
        </Text>
      </View>
    </Pressable>
  )
}

export default DemandItem 