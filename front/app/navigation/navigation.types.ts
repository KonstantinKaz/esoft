export type TypeRootStackParamList = {
	Auth: undefined
	Home: undefined
	Screen404: undefined
	Trending: undefined
	Search: undefined
	Favorites: undefined
	Profile: undefined
	Offers: undefined
	OfferList: undefined
	OfferAdd: undefined
	UserEdit: { id: string }
	UserList: undefined
	OfferEdit: { id: string }
	Estate: {
		id: string
	}
	EstateEdit: {
		id: string
	}
	EstateAdd: undefined
	DemandList: undefined
	DemandAdd: undefined
	DemandEdit: {
		id: string
	}
	EventList: undefined
	EventAdd: undefined
	Estates: undefined
	EventEdit: {
		id: string
	}
	EventsToday: undefined
} & TypeRootStackAdminList

type TypeRootStackAdminList = {
	Admin: undefined
}

export interface IRoute {
	name: keyof TypeRootStackParamList
	component: React.ComponentType<any>
	isAdmin: boolean
	props?: any
}
