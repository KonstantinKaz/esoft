import { API_URL } from '@/config/api.config'
import { ImageSourcePropType } from 'react-native'

export const getMediaSource = (path: string) => ({
	uri: `${API_URL}/files${path}`
})
