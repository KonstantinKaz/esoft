import { Feather } from '@expo/vector-icons'
import cn from 'clsx'
import { LinearGradient } from 'expo-linear-gradient'
import { FC, PropsWithChildren } from 'react'
import { Pressable, Text, View } from 'react-native'

import { IButton } from './button.interface'

const Button: FC<PropsWithChildren<IButton>> = ({
	className,
	icon,
	children,
	...rest
}) => {
	return (
		<Pressable className={cn('self-center mt-5', className)} {...rest}>
			<LinearGradient
				start={{ x: 0, y: 0.75 }}
				end={{ x: 1, y: 0.25 }}
				style={{ borderRadius: 16 }}
				className={cn('w-full py-3 px-8 items-center', {
					'flex-row': !!icon
				})}
				colors={['#DC3F41', '#a6282b']}
			>
				<View className='py-3.5 px-8 flex-row items-center'>
					{icon && <Feather name={icon} size={18} color='white' />}
					<Text className='text-white font-medium text-lg ml-2'>
						{children}
					</Text>
				</View>
			</LinearGradient>
		</Pressable>
	)
}

export default Button
