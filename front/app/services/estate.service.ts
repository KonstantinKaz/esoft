import { getEstatesUrl } from '@/config/api.config'
import { request } from '@/services/api/request.api'

interface IApartmentData {
	floor?: number
	rooms?: number
	totalArea?: number
}

interface IHouseData {
	floors?: number
	rooms?: number
	totalArea?: number
}

interface ILandData {
	totalArea?: number
}

export interface IEstate {
	id: string
	type: 'APARTMENT' | 'HOUSE' | 'LAND'
	city?: string
	street?: string
	house?: string
	apartment?: string
	latitude?: number
	longitude?: number
	apartmentData?: IApartmentData
	houseData?: IHouseData
	landData?: ILandData
}

export interface IEstateSearch {
	city?: string
	street?: string
	house?: string
	apartment?: string
	polygon?: Array<{ latitude: number; longitude: number }>
}

export const EstateService = {
	async getAll(filter?: Partial<IEstate>) {
		return request<IEstate[]>({
			url: getEstatesUrl('get-all'),
			method: 'GET',
			params: filter || {}
		})
	},

	async create(data: IEstate) {
		return request({
			url: getEstatesUrl('create'),
			method: 'POST',
			data
		})
	},

	async update(id: string, data: Partial<IEstate>) {
		return request({
			url: getEstatesUrl(`update/${id}`),
			method: 'PUT',
			data
		})
	},

	async delete(id: string) {
		return request({
			url: getEstatesUrl(`delete/${id}`),
			method: 'DELETE'
		})
	},

	async search(searchParams: IEstateSearch) {
		return request<IEstate[]>({
			url: getEstatesUrl('search'),
			method: 'POST',
			data: searchParams
		})
	},

	async getById(id: string) {
		return request<IEstate>({
			url: getEstatesUrl(`${id}`),
			method: 'GET'
		})
	}
}
