import { getAuthUrl } from '@/config/api.config'
import { EnumAsyncStorage, IAuthResponse } from '@/shared/types/auth.interface'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { request } from '../api/request.api'
import { deleteTokensStorage, saveToStorage, getAccessToken } from './auth.helper'

export const AuthService = {
	async main(variant: 'reg' | 'login', email: string, password: string) {
		console.log('AuthService.main:', { variant, email, password })
		
		const response = await request<IAuthResponse>({
			url: getAuthUrl(`${variant === 'reg' ? 'register/realtor' : 'login'}`),
			method: 'POST',
			data: { email, password }
		}).catch(error => {
			console.error('Auth request error:', error.response?.data || error)
			throw error
		})

		console.log('Auth response:', response)

		if (response.accessToken) await saveToStorage(response)

		return response
	},

	async checkAuth() {
		const accessToken = await getAccessToken()
		
		if (accessToken) {
			const user = await AsyncStorage.getItem(EnumAsyncStorage.USER)
			return { user: user ? JSON.parse(user) : null }
		}
		
		return null
	},

	async logout() {
		await deleteTokensStorage()
		await AsyncStorage.removeItem(EnumAsyncStorage.USER)
	}
}
