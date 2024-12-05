import React, { FC } from 'react'
import { TextInput, TextInputProps, View, Text } from 'react-native'
import { Control, Controller } from 'react-hook-form'

interface IFieldProps extends TextInputProps {
	control: Control<any>
	name: string
	rules?: Object
	className?: string
}

const Field: FC<IFieldProps> = ({ control, name, rules, className, ...rest }) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({
				field: { onChange, onBlur, value },
				fieldState: { error }
			}) => (
				<View
					className={`bg-[#232323] w-full border rounded-lg pb-4 pt-2.5 px-4 my-1.5 ${error ? 'border-red' : 'border-transparent'} ${className}`}
				>
					<TextInput
						autoCapitalize='none'
						onChangeText={onChange}
						onBlur={onBlur}
						value={(value || '').toString()}
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
