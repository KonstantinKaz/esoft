import Field from '@/components/ui/form/field/Field'
import Select from '@/components/ui/form/select/Select'
import { IDemand } from '@/services/demand.service'
import { formatNumber } from '@/utils/format/formatNumber'
import { FC } from 'react'
import { Control, useWatch } from 'react-hook-form'
import { ScrollView } from 'react-native'
import UserSelect from '../offers/UserSelect'

interface IDemandForm {
	control: Control<IDemand>
	isEdit?: boolean
}

const estateTypes = [
	{ label: 'Квартира', value: 'APARTMENT' },
	{ label: 'Дом', value: 'HOUSE' },
	{ label: 'Земля', value: 'LAND' }
]

const DemandForm: FC<IDemandForm> = ({ control, isEdit }) => {
	const estateType = useWatch({
		control,
		name: 'estateType'
	})

	const numberField = (name: string, placeholder: string) => (
		<Field
			control={control}
			name={name}
			placeholder={placeholder}
			keyboardType='numeric'
			onChange={value => formatNumber(value)}
			rules={{
				setValueAs: (value: string | undefined) => {
					if (!value && value !== '0') return undefined
					try {
						const cleanValue = String(value).replace(/\s/g, '')
						const number = parseInt(cleanValue, 10)
						return isNaN(number) ? undefined : number
					} catch (error) {
						return undefined
					}
				}
			}}
		/>
	)

	return (
		<ScrollView showsVerticalScrollIndicator={false} className='mb-5'>
			<UserSelect
				control={control}
				name='clientId'
				placeholder='Выберите клиента'
				role='CLIENT'
				rules={{ required: 'Выберите клиента' }}
			/>

			<UserSelect
				control={control}
				name='realtorId'
				placeholder='Выберите риэлтора'
				role='REALTOR'
				rules={{ required: 'Выберите риэлтора' }}
			/>

			<Select
				options={estateTypes}
				control={control}
				name='estateType'
				placeholder='Выберите тип недвижимости'
				rules={{ required: 'Выберите тип недвижимости' }}
			/>

			<Field control={control} name='address' placeholder='Адрес' />

			{numberField('minPrice', 'Минимальная цена')}
			{numberField('maxPrice', 'Максимальная цена')}

			{(estateType === 'APARTMENT' || estateType === 'HOUSE') && (
				<>
					{numberField('minArea', 'Минимальная площадь')}
					{numberField('maxArea', 'Максимальная площадь')}
					{numberField('minRooms', 'Минимальное количество комнат')}
					{numberField('maxRooms', 'Максимальное количество комнат')}
				</>
			)}

			{estateType === 'APARTMENT' && (
				<>
					{numberField('minFloor', 'Минимальный этаж')}
					{numberField('maxFloor', 'Максимальный этаж')}
				</>
			)}

			{estateType === 'HOUSE' && (
				<>
					{numberField('minFloors', 'Минимальная этажность')}
					{numberField('maxFloors', 'Максимальная этажность')}
				</>
			)}

			{/* Поля только для земли */}
			{estateType === 'LAND' && (
				<>
					{numberField('minArea', 'Минимальная площадь')}
					{numberField('maxArea', 'Максимальная площадь')}
				</>
			)}
		</ScrollView>
	)
}

export default DemandForm
