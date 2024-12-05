import Actor from '@/components/screens/Actor/Actor'
import Favorites from '@/components/screens/favorites/Favorites'
import Genre from '@/components/screens/genre/Genre'
import Movie from '@/components/screens/movie/Movie'
import Profile from '@/components/screens/profile/Profile'
import Search from '@/components/screens/search/Search'
import Trending from '@/components/screens/trending/Trending'
import Home from 'components/screens/home/Home'
import { adminRoutes } from './admin.routes'
import { IRoute } from './navigation.types'
import UserList from '@/components/screens/users/UserList'

export const userRoutes: IRoute[] = [
	{
		name: 'Home',
		component: Home,
		isAdmin: false
	},
	{
		name: 'UserList',
		component: UserList,
		isAdmin: false
	},
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
	// }
]

export const routes = [...userRoutes, ...adminRoutes]
