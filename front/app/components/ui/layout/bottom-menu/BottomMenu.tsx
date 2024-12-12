import React, { FC } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TypeNavigate } from '@/navigation/navigation.types'
import { menuItems } from './menu.data'
import MenuItem from './MenuItem'
import { useAuth } from '@/hooks/useAuth'
import { AuthService } from '@/services/auth/auth.service'

interface IBottomMenu {
	nav: TypeNavigate
	currentRoute?: string
}

const BottomMenu: FC<IBottomMenu> = ({ nav, currentRoute }) => {
	const { bottom } = useSafeAreaInsets()
	const { setUser } = useAuth()

	const handleLogout = async () => {
		await AuthService.logout()
		setUser(null)
		nav('Auth')
	}

	return (
		<View
			className='pt-5 px-2 flex-row justify-between items-center w-full border-t border-t-solid border-t-[#929292] bg-[#090909]'
			style={{
				paddingBottom: bottom + 5
			}}
		>
			{menuItems.map(item => (
				<MenuItem
					key={item.path}
					item={item}
					nav={nav}
					currentRoute={currentRoute}
					onPress={item.path === 'Auth' ? handleLogout : undefined}
				/>
			))}
		</View>
	)
}

export default BottomMenu
