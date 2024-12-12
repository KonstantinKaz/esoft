import { ISearchFormData } from '@/components/screens/search/search.interface'
import { getEstatesUrl } from '@/config/api.config'
import { request } from '@/services/api/request.api'
import { Control } from 'react-hook-form'

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
	coordinates?: {
		latitude: number
		longitude: number
	}
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
	control: Control<ISearchFormData>
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
		const { apartmentData, houseData, landData, ...estateData } = data
		const payload = {
			...estateData,
			...(data.type === 'APARTMENT' && apartmentData && {
				floor: apartmentData.floor,
				rooms: apartmentData.rooms,
				totalArea: apartmentData.totalArea
			}),
			...(data.type === 'HOUSE' && houseData && {
				floors: houseData.floors,
				rooms: houseData.rooms,
				totalArea: houseData.totalArea
			}),
			...(data.type === 'LAND' && landData && {
				totalArea: landData.totalArea
			})
		}
		return request({
			url: getEstatesUrl('create'),
			method: 'POST',
			data: payload
		})
	},

	async update(id: string, data: Partial<IEstate>) {
		const { apartmentData, houseData, landData, ...estateData } = data
		const payload = {
			...estateData,
			...(data.type === 'APARTMENT' && apartmentData && {
				floor: Number(apartmentData.floor),
				rooms: Number(apartmentData.rooms),
				totalArea: apartmentData.totalArea ? Number(apartmentData.totalArea) : null
			}),
			...(data.type === 'HOUSE' && houseData && {
				floors: Number(houseData.floors),
				rooms: Number(houseData.rooms),
				totalArea: houseData.totalArea ? Number(houseData.totalArea) : null
			}),
			...(data.type === 'LAND' && landData && {
				totalArea: landData.totalArea ? Number(landData.totalArea) : null
			})
		}
		return request({
			url: getEstatesUrl(`update/${id}`),
			method: 'PUT',
			data: payload
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
