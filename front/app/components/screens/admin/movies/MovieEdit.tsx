import Button from '@/components/ui/button/Button'
import { IMovieEditInput } from '@/shared/types/movie.interface'
import React, { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'

import { generateSlug } from '@/utils/generateSlug'

import AdminNavigation from '@/components/ui/admin/navigation/AdminNavigation'
import Dropdown from '@/components/ui/form/dropdown/Dropdown'
import Field from '@/components/ui/form/field/Field'
import SlugWrapper from '@/components/ui/form/field/SlugWrapper'
import UploadField from '@/components/ui/form/upload-field/UploadField'
import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import { useAdminActors } from './useAdminActors'
import { useAdminGenres } from './useAdminGenres'
import { useMovieEdit } from './useMovieEdit'

const MovieEdit: FC = () => {
	const { control, setValue, handleSubmit, getValues } =
		useForm<IMovieEditInput>({
			mode: 'onChange'
		})

	const { isLoading, onSubmit } = useMovieEdit(setValue)

	const { data: genres } = useAdminGenres()
	const { data: actors } = useAdminActors()

	return (
		<Layout isHasPadding>
			<AdminNavigation title='Edit movie' isBackButton />
			<View>
				{isLoading ? (
					<Loader />
				) : (
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingBottom: 100
						}}
					>
						<Field<IMovieEditInput>
							control={control}
							name='title'
							placeholder='Enter name'
							rules={{
								required: 'Name is required!'
							}}
						/>

						<SlugWrapper
							generate={() => {
								setValue('slug', generateSlug(getValues('title')))
							}}
						>
							<Field<IMovieEditInput>
								control={control}
								name='slug'
								placeholder='Enter slug'
								rules={{
									required: 'Slug is required!'
								}}
							/>
						</SlugWrapper>

						<Field<IMovieEditInput>
							placeholder='Enter country'
							control={control}
							name='parameters.country'
							rules={{
								required: 'Country is required!'
							}}
						/>

						<View className='flex-row flex-wrap justify-between'>
							<View style={{ width: '56%' }}>
								<Field<IMovieEditInput>
									placeholder='Enter duration (min.)'
									control={control}
									name='parameters.duration'
									rules={{
										required: 'Duration is required!'
									}}
								/>
							</View>
							<View style={{ width: '40%' }}>
								<Field<IMovieEditInput>
									placeholder='Enter year'
									control={control}
									name='parameters.year'
									rules={{
										required: 'Year is required!'
									}}
									keyboardType='number-pad'
								/>
							</View>
						</View>

						<Controller
							control={control}
							name='genres'
							render={({ field, fieldState: { error } }) => (
								<Dropdown
									field={field}
									options={genres}
									isMulti
									error={error}
									style={{
										zIndex: 11
									}}
								/>
							)}
							rules={{
								required: 'Please select at least one genre!'
							}}
						/>

						<Controller
							name='actors'
							control={control}
							rules={{
								required: 'Please dropdown at least one actor!'
							}}
							render={({ field, fieldState: { error } }) => (
								<Dropdown
									field={field}
									options={actors}
									isMulti
									error={error}
								/>
							)}
						/>

						<Controller
							control={control}
							name='poster'
							defaultValue=''
							render={({
								field: { value, onChange },
								fieldState: { error }
							}) => (
								<UploadField
									onChange={onChange}
									value={value}
									error={error}
									folder='movies'
									placeholder='Poster'
									isNoImage={value ? false : true}
								/>
							)}
							rules={{
								required: 'Poster is required!'
							}}
						/>

						<Controller
							control={control}
							name='videoUrl'
							defaultValue=''
							render={({
								field: { value, onChange },
								fieldState: { error }
							}) => (
								<UploadField
									onChange={onChange}
									value={value}
									error={error}
									folder='movies'
									placeholder='Video'
									isNoImage
									gradient={['#4361a6', '#254584']}
								/>
							)}
							rules={{
								required: 'Video is required!'
							}}
						/>

						<Button onPress={handleSubmit(onSubmit)} icon='pen-tool'>
							Update
						</Button>
					</ScrollView>
				)}
			</View>
		</Layout>
	)
}

export default MovieEdit
