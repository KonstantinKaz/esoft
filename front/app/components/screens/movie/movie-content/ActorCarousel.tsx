import HorizontalList from '@/components/ui/HorizontalList'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { IActor } from '@/shared/types/movie.interface'
import { getMediaSource } from '@/utils/getMediaSource'
import { FC } from 'react'
import { Image, Pressable, Text, View } from 'react-native'

const ActorCarousel: FC<{ actors: IActor[] }> = ({ actors }) => {
	const { navigate } = useTypedNavigation()

	return (
		<HorizontalList
			data={actors}
			renderItem={({ item: actor }) => (
				<Pressable
					onPress={() => navigate('Actor', { slug: actor.slug })}
					className='flex-row items-center rounded-xl overflow-hidden w-48 mr-4'
					style={{
						height: 72,
						backgroundColor: 'rgba(255, 255, 255, 0.07)'
					}}
				>
					<Image
						className='h-full'
						style={{ width: 50, resizeMode: 'cover' }}
						source={getMediaSource(actor.photo)}
					/>
					<View className='p-3 w-11/12'>
						<Text
							className='text-white text-base font-medium pr-7'
							numberOfLines={1}
						>
							{actor.name}
						</Text>
					</View>
				</Pressable>
			)}
		></HorizontalList>
	)
}

export default ActorCarousel
