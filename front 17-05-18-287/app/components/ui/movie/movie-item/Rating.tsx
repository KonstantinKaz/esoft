import { getColor } from '@/config/color.config'
import { AntDesign } from '@expo/vector-icons'

import { FC } from 'react'
import { View, Text } from 'react-native'
import clsx from 'clsx'

interface IRating {
	size?: number
	rating: number
}

const Rating: FC<IRating> = ({ size = 20, rating }) => {
	return (
		<View className='flex-row items-center'>
			<AntDesign name='star' size={size} color={getColor('yellow')} />
			<Text
				className={clsx(
					'text-white ml-2 font-bold',
					size === 20 ? 'text-lg' : 'text-base'
				)}
			>
				{rating.toFixed(1)}
			</Text>
		</View>
	)
}

export default Rating
