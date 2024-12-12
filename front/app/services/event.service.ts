import { request } from './api/request.api'
import { getEventsUrl } from '@/config/api.config'

export interface IEvent {
  id: string
  type: string
  dateTime: string
  duration?: number
  comment?: string
  realtorId: string
}

export const EventService = {
  async getAll() {
    return request<IEvent[]>({
      url: getEventsUrl(''),
      method: 'GET'
    })
  },

  async getTodayEvents() {
    return request<IEvent[]>({
      url: getEventsUrl('/today'),
      method: 'GET'
    })
  },

  async getById(id: string) {
    return request<IEvent>({
      url: getEventsUrl(`/${id}`),
      method: 'GET'
    })
  },

  async create(data: any) {
    return request<IEvent>({
      url: getEventsUrl(''),
      method: 'POST',
      data
    })
  },

  async update(id: string, data: any) {
    return request<IEvent>({
      url: getEventsUrl(`/${id}`),
      method: 'PUT',
      data
    })
  },

  async delete(id: string) {
    return request<IEvent>({
      url: getEventsUrl(`/${id}`),
      method: 'DELETE'
    })
  }
} 