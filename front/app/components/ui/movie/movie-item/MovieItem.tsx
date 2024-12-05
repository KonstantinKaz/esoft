import { useTypedRoute } from '@/hooks/useTypedRoute'
import { IMovie } from '@/shared/types/movie.interface'
import { getMediaSource } from '@/utils/getMediaSource'
import { useNavigation } from '@react-navigation/native'
import { BlurView } from 'expo-blur'
import { FC } from 'react'
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native'
import Animated from 'react-native-reanimated'
import FavoriteButton from './favorite-button/FavoriteButton'
import Rating from './Rating'
import { useMovieItemAnimation } from './useMovieItemAnimation'

const ReanimatedPressable = Animated.createAnimatedComponent(Pressable)

interface IMovieItem {
	index: number
	className?: string
	movie: IMovie
	style?: ViewStyle
}

const MovieItem: FC<IMovieItem> = ({ index, movie, className, style }) => {
	const { navigate } = useNavigation()
	const { name } = useTypedRoute()

	const isFavoritePage = name === 'Favorites'

	const { styleAnimation } = useMovieItemAnimation(index, style)

	return (
		<ReanimatedPressable
			style={styleAnimation}
			onPress={() =>
				navigate('Movie', {
					slug: movie.slug
				})
			}
			className='rounded-xl overflow-hidden h-56'
		>
			{isFavoritePage && (
				<View className='absolute top-1.5 right-1.5 z-1'>
					<FavoriteButton movieId={movie._id} isSmall />
				</View>
			)}

			<Image
				style={{
					resizeMode: 'cover',
					...StyleSheet.absoluteFillObject
				}}
				source={getMediaSource(movie.poster)}
			/>

			<BlurView
				intensity={25}
				className='absolute left-0 right-0 bottom-0 w-full items-center pt-0.5 px-2'
			>
				<View className='-ml-2 -mb-0.5'>
					<Rating rating={movie.rating} size={16} />
				</View>

				<Text
					className='text-white text-lg font-semibold mb-1'
					numberOfLines={1}
				>
					{movie.title}
				</Text>
			</BlurView>
		</ReanimatedPressable>
	)
}

export default MovieItem
