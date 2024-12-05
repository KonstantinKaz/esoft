import Button from '@/components/ui/button/Button'
import { IActorEditInput } from '@/shared/types/actor.interface'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'

import { generateSlug } from '@/utils/generateSlug'

import AdminNavigation from '@/components/ui/admin/navigation/AdminNavigation'
import Field from '@/components/ui/form/field/Field'
import SlugWrapper from '@/components/ui/form/field/SlugWrapper'
import UploadField from '@/components/ui/form/upload-field/UploadField'
import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import { useActorEdit } from './useActorEdit'

const ActorEdit: FC = () => {
	const { control, setValue, handleSubmit, getValues } =
		useForm<IActorEditInput>({
			mode: 'onChange'
		})

	const { isLoading, onSubmit } = useActorEdit(setValue)

	return (
		<Layout isHasPadding>
			<AdminNavigation title='Edit actor' isBackButton />
			<View>
				{isLoading ? (
					<Loader />
				) : (
					<ScrollView showsVerticalScrollIndicator={false}>
						<Field<IActorEditInput>
							control={control}
							name='name'
							placeholder='Enter name'
							rules={{
								required: 'Name is required!'
							}}
						/>

						<SlugWrapper
							generate={() => {
								setValue('slug', generateSlug(getValues('name')))
							}}
						>
							<Field<IActorEditInput>
								control={control}
								name='slug'
								placeholder='Enter slug'
								rules={{
									required: 'Slug is required!'
								}}
							/>
						</SlugWrapper>

						<Controller
							control={control}
							name='photo'
							defaultValue=''
							render={({
								field: { value, onChange },
								fieldState: { error }
							}) => (
								<UploadField
									onChange={onChange}
									value={value}
									error={error}
									folder='actors'
									placeholder='Photo'
									isNoImage={value ? false : true}
								/>
							)}
							rules={{
								required: 'Photo is required!'
							}}
						/>

						<Button
							onPress={handleSubmit(onSubmit)}
							icon='pen-tool'
						>
							Update
						</Button>
					</ScrollView>
				)}
			</View>
		</Layout>
	)
}

export default ActorEdit
