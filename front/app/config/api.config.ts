export const SERVER_URL = process.env.SERVER_URL
export const API_URL = `${SERVER_URL}/api`

export const getAuthUrl = (string: string) => `/auth/${string}`
export const getUsersUrl = (string: string) => `/users/${string}`
export const getEstatesUrl = (string: string) => `/estate/${string}`
export const getOffersUrl = (string: string) => `/offers/${string}`
export const getDemandsUrl = (string: string) => `/demands/${string}`
