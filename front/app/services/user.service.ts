import { getUsersUrl } from '@/config/api.config'
import { IAuthFormData } from '@/shared/types/auth.interface'
import { IMovie } from '@/shared/types/movie.interface'
import { IUser, IUserEditInput } from '@/shared/types/user.interface'
import { request } from './api/request.api'

export interface IUser {
	id: string
	email: string
	role: 'CLIENT' | 'REALTOR' | 'ADMIN'
	clientProfile?: {
		firstName: string
		lastName: string
		middleName: string
	}
	realtorProfile?: {
		firstName: string
		lastName: string
		middleName: string
	}
}

export const UserService = {
	async getAll(filter?: { role?: string }) {
		return request<IUser[]>({
			url: getUsersUrl(''),
			method: 'GET',
			params: filter
		})
	},

	async getProfile() {
		return request<IUser>({
			url: getUsersUrl('profile'),
			method: 'GET'
		})
	},

	async getFavorites() {
		return request<IMovie[]>({
			url: getUsersUrl('profile/favorites'),
			method: 'GET'
		})
	},

	async toggleFavorite(movieId: string) {
		return request({
			url: getUsersUrl(`profile/favorites`),
			method: 'PUT',
			data: { movieId }
		})
	},

	async getById(id: string) {
		return request<IUser>({
			url: getUsersUrl(`by-id/${id}`),
			method: 'GET'
		})
	},

	async updateProfile(data: IAuthFormData) {
		return request<IUser>({
			url: getUsersUrl('profile'),
			method: 'PUT',
			data
		})
	},

	async update(id: string, data: IUserEditInput) {
		return request<string>({
			url: getUsersUrl(`update/${id}`),
			method: 'PUT',
			data
		})
	},

	async deleteUser(_id: string) {
		return request<string>({
			url: getUsersUrl(`${_id}`),
			method: 'DELETE'
		})
	},

	async createUser(data: any) {
		return request({
			url: getUsersUrl('create'),
			method: 'POST',
			data
		})
	},

	async fuzzySearch(searchQuery: {
		firstName?: string
		lastName?: string
		middleName?: string
	}) {
		return request<IUser[]>({
			url: getUsersUrl('search'),
			method: 'POST',
			data: searchQuery
		})
	}
}
