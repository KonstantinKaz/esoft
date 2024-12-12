import { request } from './api/request.api'
import { getOffersUrl } from '@/config/api.config'

export interface IOffer {
  id?: string
  price: string | number
  estateId: string
  clientId: string
  realtorId: string
  estate?: {
    id: string
    type: string
    city: string
    street: string
    house: string
  }
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

export const OfferService = {
  async getAll() {
    return request<IOffer[]>({
      url: getOffersUrl(''),
      method: 'GET'
    })
  },

  async create(data: Omit<IOffer, 'id'>) {
    return request<IOffer>({
      url: getOffersUrl('create'),
      method: 'POST',
      data
    })
  },

  async update(id: string, data: Omit<IOffer, 'id'>) {
    return request<IOffer>({
      url: getOffersUrl(id),
      method: 'PUT',
      data
    })
  },

  async delete(id: string) {
    return request<void>({
      url: getOffersUrl(id),
      method: 'DELETE'
    })
  },

  async getById(id: string) {
    return request<IOffer>({
      url: getOffersUrl(id),
      method: 'GET'
    })
  }
} 