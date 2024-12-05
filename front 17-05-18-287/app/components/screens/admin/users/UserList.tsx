import AdminNavigation from '@/components/ui/admin/navigation/AdminNavigation'

import AdminHeader from '@/components/ui/admin/table-header/AdminHeader'
import AdminTable from '@/components/ui/admin/table/AdminTable'
import Layout from '@/components/ui/layout/Layout'
import React, { FC } from 'react'
import { useUsers } from './useUsers'

const UserList: FC = () => {
	const { control, data, deleteAsync, isLoading } = useUsers()

	return (
		<Layout>
			<AdminNavigation title='Statistics' />
			<AdminHeader control={control} />
			<AdminTable
				tableItems={data}
				isLoading={isLoading}
				headerItems={['Email', 'Date register']}
				removeHandler={deleteAsync}
			/>
		</Layout>
	)
}

export default UserList
