import { FC, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { DemandService } from '@/services/demand.service'
import { OfferService } from '@/services/offer.service'
import cn from 'classnames'
import Loader from '@/components/ui/Loader'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'

interface IUserDeals {
  userId: string
  role: 'CLIENT' | 'REALTOR'
}

const UserDeals: FC<IUserDeals> = ({ userId, role }) => {
  const [activeTab, setActiveTab] = useState<'demands' | 'offers'>('demands')
  const { navigate } = useTypedNavigation()

  const { data: demands, isLoading: isDemandsLoading } = useQuery({
    queryKey: ['user-demands', userId],
    queryFn: () => DemandService.getAll(),
    select: (data) => data.filter(demand => 
      role === 'CLIENT' ? demand.clientId === userId : demand.realtorId === userId
    )
  })

  const { data: offers, isLoading: isOffersLoading } = useQuery({
    queryKey: ['user-offers', userId],
    queryFn: () => OfferService.getAll(),
    select: (data) => data.filter(offer => 
      role === 'CLIENT' ? offer.clientId === userId : offer.realtorId === userId
    )
  })

  const formatPrice = (price?: number) => {
    if (!price && price !== 0) return ''
    return price.toLocaleString('ru-RU') + ' ₽'
  }

  if (isDemandsLoading || isOffersLoading) return <Loader />

  return (
    <View className='mt-4'>
      <View className='flex-row justify-around mb-4'>
        <Pressable
          onPress={() => setActiveTab('demands')}
          className={cn(
            'py-2 px-4 rounded-xl',
            activeTab === 'demands' ? 'bg-primary' : 'bg-[#232323]'
          )}
        >
          <Text className='text-white'>
            Потребности ({demands?.length || 0})
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('offers')}
          className={cn(
            'py-2 px-4 rounded-xl',
            activeTab === 'offers' ? 'bg-primary' : 'bg-[#232323]'
          )}
        >
          <Text className='text-white'>
            Предложения ({offers?.length || 0})
          </Text>
        </Pressable>
      </View>

      {activeTab === 'demands' ? (
        <View>
          {demands?.map(demand => (
            <Pressable
              key={demand.id}
              onPress={() => navigate('DemandEdit', { id: demand.id })}
              className='bg-[#232323] p-3 rounded-xl mb-3'
            >
              <Text className='text-white text-base mb-1'>
                {demand.estateType === 'APARTMENT' ? 'Квартира' :
                 demand.estateType === 'HOUSE' ? 'Дом' : 'Участок'}
              </Text>
              <Text className='text-white opacity-70 text-sm'>
                {formatPrice(demand.minPrice)} - {formatPrice(demand.maxPrice)}
              </Text>
              {demand.address && (
                <Text className='text-white opacity-70 text-sm mt-1'>
                  {demand.address}
                </Text>
              )}
            </Pressable>
          ))}
        </View>
      ) : (
        <View>
          {offers?.map(offer => (
            <Pressable
              key={offer.id}
              onPress={() => navigate('OfferEdit', { id: offer.id })}
              className='bg-[#232323] p-3 rounded-xl mb-3'
            >
              <Text className='text-white text-base mb-1'>
                {offer.estate?.city}, {offer.estate?.street} {offer.estate?.house}
              </Text>
              <Text className='text-white opacity-70 text-sm'>
                {formatPrice(offer.price)}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  )
}

export default UserDeals 