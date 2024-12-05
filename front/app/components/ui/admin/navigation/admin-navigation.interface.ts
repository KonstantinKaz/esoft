import { TypeRootStackParamList } from '@/navigation/navigation.types'
import { TypeMaterialIconNames } from '@/shared/types/icon.interface'

export interface INavItem {
	icon: TypeMaterialIconNames
	title: string
	routeName: keyof TypeRootStackParamList
}

