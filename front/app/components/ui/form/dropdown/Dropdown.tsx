import { FC, useState } from 'react'
import { Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

import { IDropdown } from './dropdown.interface'

DropDownPicker.setTheme('DARK')
DropDownPicker.setListMode('SCROLLVIEW')

const Dropdown: FC<IDropdown> = ({
	isMulti,
	options = [],
	error,
	field,
	style
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [value, setValue] = useState<string[] | null>(field.value)
	const [items, setItems] = useState(options)
	
	return (
		<View className='z-10' style={style}>
			<DropDownPicker
				open={isOpen}
				setOpen={setIsOpen}
				items={items}
				setItems={setItems}
				value={value}
				setValue={setValue}
				onChangeValue={(value: any) => {
					if (value) field.onChange(value)
				}}
				multiple={isMulti}
				mode='BADGE'
				activityIndicatorColor='#BF3335'
				style={{
					backgroundColor: '#232323',
					borderColor: error ? 'red' : 'transparent',
					paddingHorizontal: 16,
					marginVertical: 6
				}}
				textStyle={{
					fontSize: 16
				}}
				placeholderStyle={{
					color: '#5A595D'
				}}
				dropDownContainerStyle={{
					backgroundColor: '#232323'
				}}
				showBadgeDot={false}
			/>

			{error && <Text className='text-red'>{error.message}</Text>}
		</View>
	)
}

export default Dropdown
