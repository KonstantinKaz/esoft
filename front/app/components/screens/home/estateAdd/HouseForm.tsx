import React, { FC } from 'react'
import { View } from 'react-native'
import { Control } from 'react-hook-form'
import Field from '@/components/ui/form/field/Field'
import { IEstate } from '@/services/estate.service'

interface IHouseFormProps {
    control: Control<IEstate>
}

const HouseForm: FC<IHouseFormProps> = ({ control }) => {
    return (
        <View>
            <Field
                control={control}
                name='houseData.rooms'
                placeholder='Количество комнат'
                keyboardType='numeric'
                rules={{ required: 'Укажите количество комнат' }}
            />
            <Field
                control={control}
                name='houseData.floors'
                placeholder='Количество этажей'
                keyboardType='numeric'
                rules={{ required: 'Укажите количество этажей' }}
            />
            <Field
                control={control}
                name='houseData.totalArea'
                placeholder='Общая площадь (м²)'
                keyboardType='numeric'
                rules={{ required: 'Укажите площадь' }}
            />
        </View>
    )
}

export default HouseForm 