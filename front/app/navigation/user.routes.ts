import Estate from '@/components/screens/home/Estate'
import EstateAdd from '@/components/screens/home/estateAdd/EstateAdd'
import EstateEdit from '@/components/screens/home/estateEdit/EstateEdit'
import UserEdit from '@/components/screens/users/UserEdit'
import UserList from '@/components/screens/users/UserList'
import Home from 'components/screens/home/Home'
import { adminRoutes } from './admin.routes'
import { IRoute } from './navigation.types'

export const userRoutes: IRoute[] = [
	{
		name: 'Home',
		component: Home,
		isAdmin: false
	},
	// {
	// 	name: 'Profile',
	// 	component: Profile,
	// 	isAdmin: false
	// },
	// {
	// 	name: 'Favorites',
	// 	component: Favorites,
	// 	isAdmin: false
	// },
	// {
	// 	name: 'Trending',
	// 	component: Trending,
	// 	isAdmin: false
	// },
	// {
	// 	name: 'Search',
	// 	component: Search,
	// 	isAdmin: false
	// },
	// {
	// 	name: 'Genre',
	// 	component: Genre,
	// 	isAdmin: false
	// },
	// {
	// 	name: 'Actor',
	// 	component: Actor,
	// 	isAdmin: false
	// },
	// {
	// 	name: 'Movie',
	// 	component: Movie,
	// 	isAdmin: false
	// },
	{
		name: 'Estate',
		component: Estate,
		isAdmin: false
	},
	{
		name: 'EstateEdit',
		component: EstateEdit,
		isAdmin: false
	},
	{
		name: 'EstateAdd',
		component: EstateAdd,
		isAdmin: false
	},
	{
		name: 'UserList',
		component: UserList,
		isAdmin: false
	},
	{
		name: 'UserEdit',
		component: UserEdit,
		isAdmin: false
	}
]

export const routes = [...userRoutes, ...adminRoutes]
