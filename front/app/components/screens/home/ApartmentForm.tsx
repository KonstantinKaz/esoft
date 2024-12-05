import React, { FC } from 'react'
import { Controller } from 'react-hook-form'
import { View, Text } from 'react-native'
import Field from '@/components/ui/form/field/Field'

const ApartmentForm: FC<{ control: any }> = ({ control }) => {
    return (
        <View>
            <Controller
                control={control}
                name='apartmentData.rooms'
                render={({ field }) => (
                    <Field {...field} placeholder='Количество комнат' />
                )}
            />
            <Controller
                control={control}
                name='apartmentData.floor'
                render={({ field }) => (
                    <Field {...field} placeholder='Этаж' />
                )}
            />
            <Controller
                control={control}
                name='apartmentData.totalArea'
                render={({ field }) => (
                    <Field {...field} placeholder='Общая площадь (м²)' />
                )}
            />
        </View>
    )
}

export default ApartmentForm 