import { FC, useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Layout from '@/components/ui/layout/Layout'
import OfferItem from './OfferItem'
import { useOffers } from './useOffers'
import Loader from '@/components/ui/Loader'
import Button from '@/components/ui/button/Button'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'

const OfferList: FC = () => {
  const { navigate } = useTypedNavigation()
  const { offers, isLoading } = useOffers()

  return (
    <Layout isHasPadding>
      <View className='flex-row justify-between items-center mb-4'>
        <Text className='text-2xl text-white font-semibold'>
          Предложения
        </Text>
        <Button onPress={() => navigate('OfferAdd')} icon='plus-circle'>
          Создать
        </Button>
      </View>

      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {offers?.map(offer => (
            <OfferItem key={offer.id} offer={offer} />
          ))}
        </ScrollView>
      )}
    </Layout>
  )
}

export default OfferList 