import BlurButton from '@/components/ui/button/blur-button/BlurButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import Animated, { withSpring } from 'react-native-reanimated'
import { useFavorite } from './useFavorite'
import { useFavoriteAnimation } from './useFavoriteAnimation'

interface IFavoriteButton {
	movieId: string
	isSmall?: boolean
}

const FavoriteButton: FC<IFavoriteButton> = ({ movieId, isSmall }) => {
	const { toggleFavorite, isSmashed } = useFavorite(movieId)
	const { outLineStyle, fillStyle, liked } = useFavoriteAnimation(isSmashed)

	return (
		<BlurButton
			isSmall={isSmall}
			onPress={() => {
				liked.value = withSpring(liked.value === 1 ? 0 : 1)
				toggleFavorite()
			}}
		>
			<Animated.View
				style={[StyleSheet.absoluteFill, outLineStyle]}
				className='justify-center items-center'
			>
				<MaterialCommunityIcons
					name={'heart-outline'}
					size={isSmall ? 19 : 22}
					color={'white'}
				/>
			</Animated.View>

			<Animated.View style={fillStyle}>
				<MaterialCommunityIcons
					name={'heart'}
					size={isSmall ? 19 : 22}
					color={'#DC3F41'}
				/>
			</Animated.View>
		</BlurButton>
	)
}

export default FavoriteButton
