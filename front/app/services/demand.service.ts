import { request } from './api/request.api'
import { getDemandsUrl } from '@/config/api.config'

export interface IDemand {
  id?: string
  clientId: string
  realtorId: string
  estateType: 'APARTMENT' | 'HOUSE' | 'LAND'
  address?: string
  minPrice?: number
  maxPrice?: number
  
  // Apartment/House fields
  minArea?: number
  maxArea?: number
  minRooms?: number
  maxRooms?: number
  
  // Apartment fields
  minFloor?: number
  maxFloor?: number
  
  // House fields
  minFloors?: number
  maxFloors?: number

  client?: {
    clientProfile: {
      firstName: string
      lastName: string
      middleName: string
    }
  }
  realtor?: {
    realtorProfile: {
      firstName: string
      lastName: string
      middleName: string
    }
  }
}

export const DemandService = {
  async getAll() {
    return request<IDemand[]>({
      url: getDemandsUrl(''),
      method: 'GET'
    })
  },

  async create(data: Omit<IDemand, 'id'>) {
    // Преобразуем все числовые поля в числа
    const preparedData = {
      ...data,
      minPrice: data.minPrice ? parseInt(String(data.minPrice).replace(/\s/g, ''), 10) : undefined,
      maxPrice: data.maxPrice ? parseInt(String(data.maxPrice).replace(/\s/g, ''), 10) : undefined,
      minArea: data.minArea ? parseInt(String(data.minArea).replace(/\s/g, ''), 10) : undefined,
      maxArea: data.maxArea ? parseInt(String(data.maxArea).replace(/\s/g, ''), 10) : undefined,
      minRooms: data.minRooms ? parseInt(String(data.minRooms).replace(/\s/g, ''), 10) : undefined,
      maxRooms: data.maxRooms ? parseInt(String(data.maxRooms).replace(/\s/g, ''), 10) : undefined,
      minFloor: data.minFloor ? parseInt(String(data.minFloor).replace(/\s/g, ''), 10) : undefined,
      maxFloor: data.maxFloor ? parseInt(String(data.maxFloor).replace(/\s/g, ''), 10) : undefined,
      minFloors: data.minFloors ? parseInt(String(data.minFloors).replace(/\s/g, ''), 10) : undefined,
      maxFloors: data.maxFloors ? parseInt(String(data.maxFloors).replace(/\s/g, ''), 10) : undefined,
    }

    console.log('DemandService sending create request:', preparedData)
    try {
      const response = await request<IDemand>({
        url: getDemandsUrl('create'),
        method: 'POST',
        data: preparedData
      })
      console.log('Create response:', response)
      return response
    } catch (error) {
      console.error('DemandService create error:', error)
      throw error
    }
  },

  async update(id: string, data: Omit<IDemand, 'id'>) {
    // Применяем ту же логику преобразования для обновления
    const preparedData = {
      ...data,
      minPrice: data.minPrice ? parseInt(String(data.minPrice).replace(/\s/g, ''), 10) : undefined,
      maxPrice: data.maxPrice ? parseInt(String(data.maxPrice).replace(/\s/g, ''), 10) : undefined,
      minArea: data.minArea ? parseInt(String(data.minArea).replace(/\s/g, ''), 10) : undefined,
      maxArea: data.maxArea ? parseInt(String(data.maxArea).replace(/\s/g, ''), 10) : undefined,
      minRooms: data.minRooms ? parseInt(String(data.minRooms).replace(/\s/g, ''), 10) : undefined,
      maxRooms: data.maxRooms ? parseInt(String(data.maxRooms).replace(/\s/g, ''), 10) : undefined,
      minFloor: data.minFloor ? parseInt(String(data.minFloor).replace(/\s/g, ''), 10) : undefined,
      maxFloor: data.maxFloor ? parseInt(String(data.maxFloor).replace(/\s/g, ''), 10) : undefined,
      minFloors: data.minFloors ? parseInt(String(data.minFloors).replace(/\s/g, ''), 10) : undefined,
      maxFloors: data.maxFloors ? parseInt(String(data.maxFloors).replace(/\s/g, ''), 10) : undefined,
    }

    return request<IDemand>({
      url: getDemandsUrl(id),
      method: 'PUT',
      data: preparedData
    })
  },

  async delete(id: string) {
    return request<void>({
      url: getDemandsUrl(id),
      method: 'DELETE'
    })
  },

  async getById(id: string) {
    return request<IDemand>({
      url: getDemandsUrl(id),
      method: 'GET'
    })
  }
} 