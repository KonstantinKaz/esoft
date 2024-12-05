import { ComponentType } from 'react'

export type TypeRootStackParamList = {
	// Auth: undefined
	Home: undefined
	Screen404: undefined
	Trending: undefined
	Search: undefined
	Favorites: undefined
	Profile: undefined
	Movie: { slug: string }
	Genre: { slug: string }
	Actor: { slug: string }
} & TypeRootStackAdminList

type TypeRootStackAdminList = {
	Admin: undefined
	ActorEdit: { id: string }
	ActorList: undefined
	MovieEdit: { id: string }
	MovieList: undefined
	GenreEdit: { id: string }
	GenreList: undefined
	UserEdit: { id: string }
	UserList: undefined
}

export interface IRoute {
	name: keyof TypeRootStackParamList;
	component: React.ComponentType<any>;
	isAdmin: boolean;
	props?: any;
}
