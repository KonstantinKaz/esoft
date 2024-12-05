import ActorList from '@/components/screens/admin/actors/ActorList'
import Admin from '@/components/screens/admin/home/Admin'
import MovieList from '@/components/screens/admin/movies/MovieList'
import UserList from '@/components/screens/admin/users/UserList'

import GenreList from '@/components/screens/admin/genres/GenreList'

import ActorEdit from '@/components/screens/admin/actors/ActorEdit'
import GenreEdit from '@/components/screens/admin/genres/GenreEdit'
import UserEdit from '@/components/screens/admin/users/UserEdit'
import { IRoute } from './navigation.types'
import MovieEdit from '@/components/screens/admin/movies/MovieEdit'

export const adminRoutes: IRoute[] = [
	{
		name: 'Admin',
		component: Admin,
		isAdmin: true
	},
	{
		name: 'ActorList',
		component: ActorList,
		isAdmin: true
	},
	{
		name: 'ActorEdit',
		component: ActorEdit,
		isAdmin: true
	},
	{
		name: 'MovieList',
		component: MovieList,
		isAdmin: true
	},
	{
		name: 'MovieEdit',
		component: MovieEdit,
		isAdmin: true
	},
	{
		name: 'GenreList',
		component: GenreList,
		isAdmin: true
	},
	{
		name: 'GenreEdit',
		component: GenreEdit,
		isAdmin: true
	},
	{
		name: 'UserList',
		component: UserList,
		isAdmin: true
	},
	{
		name: 'UserEdit',
		component: UserEdit,
		isAdmin: true
	}
]
