import React, { FC } from 'react'
import { TextInput, TextInputProps, View, Text } from 'react-native'
import { Control, Controller } from 'react-hook-form'

interface IFieldProps extends TextInputProps {
	control: Control<any>
	name: string
	rules?: Object
	className?: string
	secureTextEntry?: boolean
	onChange?: (text: string) => string
}

const Field: FC<IFieldProps> = ({ control, name, rules, className, secureTextEntry, onChange, ...rest }) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({
				field: { onChange: fieldOnChange, onBlur, value },
				fieldState: { error }
			}) => (
				<View
					className={`bg-[#232323] w-full border rounded-lg pb-4 pt-2.5 px-4 my-1.5 ${error ? 'border-red' : 'border-transparent'} ${className}`}
				>
					<TextInput
						autoCapitalize='none'
						onChangeText={(text) => {
							const formattedText = onChange ? onChange(text) : text
							fieldOnChange(formattedText)
						}}
						onBlur={onBlur}
						value={value?.toString() || ''}
						className='text-white text-base'
							{...rest}
					/>
					{error && <Text className='text-red'>{error.message}</Text>}
				</View>
			)}
		/>
	)
}

export default Field
