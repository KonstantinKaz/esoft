import { TypeFeatherIconNames } from '@/shared/types/icon.interface'
import { PressableProps } from 'react-native'

export interface IButton extends PressableProps {
	className?: string
	icon?: TypeFeatherIconNames
}
