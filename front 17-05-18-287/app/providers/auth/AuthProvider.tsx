import {
	createContext,
	FC,
	PropsWithChildren,
	useEffect,
	useState
} from 'react'
import { IContext, TypeUserState } from './auth-provider.interface'

import { getAccessToken, getUserFromStorage } from '@/services/auth/auth.helper'
import * as SplashScreen from 'expo-splash-screen'

export const AuthContext = createContext({} as IContext)

// SplashScreen.preventAutoHideAsync()
let ignore = SplashScreen.preventAutoHideAsync()

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [user, setUser] = useState<TypeUserState>(null)

	useEffect(() => {
		let isMounted = true

		const checkAccessToken = async () => {
			try {
				const accessToken = await getAccessToken()

				if (accessToken) {
					const user = await getUserFromStorage()

					if (isMounted) {
						setUser(user)
					}
				}
			} catch (error) {
				console.log(error)
			} finally {
				await SplashScreen.hideAsync()
			}
		}

		let ignore = checkAccessToken()

		return () => {
			isMounted = false
		}
	}, [])

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
