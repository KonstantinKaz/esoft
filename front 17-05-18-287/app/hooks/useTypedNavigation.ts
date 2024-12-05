import { NavigationProp, useNavigation } from '@react-navigation/native'
import { TypeRootStackParamList } from 'app/navigation/navigation.types'

export const useTypedNavigation = () =>
	useNavigation<NavigationProp<TypeRootStackParamList>>()
