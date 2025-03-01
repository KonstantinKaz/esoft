import Auth from '@/components/screens/auth/Auth'
import Screen404 from '@/components/screens/system/Screen404'
import { useAuth } from '@/hooks/useAuth'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TypeRootStackParamList } from './navigation.types'
import { routes } from './user.routes'

const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const PrivateNavigator = () => {
	const { user } = useAuth()

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: '#090909' }
			}}
		>
			{user ? (
				<>
					{routes.map(route =>
						user.isAdmin || !route.isAdmin ? (
							<Stack.Screen key={route.name} {...route} />
						) : null
					)}
					<Stack.Screen name='Screen404' component={Screen404} />
				</>
			) : (
				<Stack.Screen name='Auth' component={Auth} />
			)}
		</Stack.Navigator>
	)
}

export default PrivateNavigator
