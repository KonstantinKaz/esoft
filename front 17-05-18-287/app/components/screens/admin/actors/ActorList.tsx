import { FC } from 'react'

import AdminNavigation from '@/components/ui/admin/navigation/AdminNavigation'
import AdminTable from '@/components/ui/admin/table/AdminTable'

import AdminHeader from '@/components/ui/admin/table-header/AdminHeader'
import Layout from '@/components/ui/layout/Layout'
import { useActors } from './useActors'

const ActorList: FC = () => {
	const { control, isLoading, data, deleteAsync, createAsync } = useActors()

	return (
		<Layout isHasPadding>
			<AdminNavigation title='Actors' />
			<AdminHeader control={control} onPress={createAsync} />
			<AdminTable
				tableItems={data}
				isLoading={isLoading}
				headerItems={['Name', 'Count movies']}
				removeHandler={deleteAsync}
			/>
		</Layout>
	)
}

export default ActorList
