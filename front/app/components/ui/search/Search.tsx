import { FC } from 'react'
import { Control } from 'react-hook-form'
import { View } from 'react-native'
import Field from '../form/field/Field'

interface ISearch {
	control: Control<any>
	placeholder?: string
}

const Search: FC<ISearch> = ({ control, placeholder = 'Поиск...' }) => {
	return (
		<View className='mb-4'>
			<Field
				control={control}
				name='searchTerm'
				placeholder={placeholder}
				keyboardType='default'
			/>
		</View>
	)
}

export default Search
