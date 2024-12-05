import cn from 'classnames'
import { Controller } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'
import { IField } from './field.interface'

const Field = <T extends Record<string, any>>({
	control,
	name,
	rules,
	className,
	...rest
}: IField<T>): JSX.Element => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({
				field: { value, onChange, onBlur },
				fieldState: { error }
			}) => (
				<View
					className={cn(
						'bg-[#232323] w-full border rounded-lg pb-4 pt-2.5 px-4 my-1.5',
						error ? 'border-red' : 'border-transparent',
						className
					)}
				>
					<TextInput
						autoCapitalize='none'
						onChangeText={onChange}
						onBlur={onBlur}
						value={(value || '').toString()}
						{...rest}
						className='text-white text-base'
					/>
					{error && <Text className='text-red'>{error.message}</Text>}
				</View>
			)}
		/>
	)
}

export default Field
