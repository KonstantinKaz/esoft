import DemandAdd from '@/components/screens/demands/DemandAdd'
import DemandEdit from '@/components/screens/demands/DemandEdit'
import DemandList from '@/components/screens/demands/DemandList'
import Estate from '@/components/screens/estate/Estate'
import EstateAdd from '@/components/screens/estate/estateAdd/EstateAdd'
import EstateEdit from '@/components/screens/estate/estateEdit/EstateEdit'
import EventAdd from '@/components/screens/events/EventAdd'
import EventEdit from '@/components/screens/events/EventEdit'
import EventList from '@/components/screens/events/EventList'

import Auth from '@/components/screens/auth/Auth'
import Estates from '@/components/screens/estate/Estates'
import EventsToday from '@/components/screens/events/EventsToday'
import OfferAdd from '@/components/screens/offers/OfferAdd'
import OfferEdit from '@/components/screens/offers/OfferEdit'
import OfferList from '@/components/screens/offers/OfferList'
import UserEdit from '@/components/screens/users/UserEdit'
import UserList from '@/components/screens/users/UserList'
import { IRoute } from './navigation.types'

export const userRoutes: IRoute[] = [
	// {
	// 	name: 'Home',
	// 	component: Home,
	// 	isAdmin: false
	// },

	{
		name: 'EventsToday',
		component: EventsToday,
		isAdmin: false
	},
	{
		name: 'EventList',
		component: EventList,
		isAdmin: false
	},
	{
		name: 'EventAdd',
		component: EventAdd,
		isAdmin: false
	},
	{
		name: 'EventEdit',
		component: EventEdit,
		isAdmin: false
	},
	{
		name: 'OfferList',
		component: OfferList,
		isAdmin: false
	},
	{
		name: 'OfferAdd',
		component: OfferAdd,
		isAdmin: false
	},
	{
		name: 'OfferEdit',
		component: OfferEdit,
		isAdmin: false
	},
	{
		name: 'DemandList',
		component: DemandList,
		isAdmin: false
	},
	{
		name: 'DemandAdd',
		component: DemandAdd,
		isAdmin: false
	},
	{
		name: 'DemandEdit',
		component: DemandEdit,
		isAdmin: false
	},
	{
		name: 'Estates',
		component: Estates,
		isAdmin: false
	},
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
	},
	// {
	// 	name: 'Auth',
	// 	component: Auth,
	// 	isAdmin: false
	// }
]

export const routes = [...userRoutes]
