import Toast from '@/components/ui/Toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from 'providers/auth/AuthProvider'
import React from 'react'
import { LogBox, StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import './app/assets/global.css'
import Navigation from './app/navigation/Navigation'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<SafeAreaProvider>
					<Navigation />
				</SafeAreaProvider>
			</AuthProvider>
			<StatusBar barStyle='light-content' />
			<Toast />
		</QueryClientProvider>
	)
}

LogBox.ignoreLogs([
	'Warning: TRenderEngineProvider:',
	'Warning: MemoizedTNodeRenderer:',
	'Warning: TNodeChildrenRenderer:'
])
