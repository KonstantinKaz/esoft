import { FC } from 'react'
import { View } from 'react-native'
import { Control } from 'react-hook-form'
import Field from '../form/field/Field'

interface ISearchForm {
  searchTerm?: string
}

interface ISearchProps {
  control: Control<ISearchForm>
  placeholder?: string
}

const Search: FC<ISearchProps> = ({ control, placeholder = 'Поиск...' }) => {
  return (
    <View className='mb-4'>
      <Field
        control={control}
        name='searchTerm'
        placeholder={placeholder}
      />
    </View>
  )
}

export default Search 