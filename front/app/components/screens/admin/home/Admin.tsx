import AdminNavigation from '@/components/ui/admin/navigation/AdminNavigation'
import Layout from '@/components/ui/layout/Layout'
import { FC } from 'react'
import { ScrollView } from 'react-native'
import Statistics from './statistics/Statistics'

const Admin: FC = () => {
	return (
		<Layout>
			<AdminNavigation title='Statistics' />
			<ScrollView showsHorizontalScrollIndicator={false}>
				<Statistics />
			</ScrollView>
		</Layout>
	)
}

export default Admin
