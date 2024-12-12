import React, { FC } from 'react'
import { View } from 'react-native'
import { Control } from 'react-hook-form'
import Field from '@/components/ui/form/field/Field'
import { IEstate } from '@/services/estate.service'

interface ILandFormProps {
    control: Control<IEstate>
}

const LandForm: FC<ILandFormProps> = ({ control }) => {
    return (
        <View>
            <Field
                control={control}
                name='landData.totalArea'
                placeholder='Площадь участка (м²)'
                keyboardType='numeric'
            />
            <Field
                control={control}
                name='landData.coordinates.latitude'
                placeholder='Широта'
                keyboardType='numeric'
                rules={{
                    min: {
                        value: -90,
                        message: 'Широта должна быть больше -90'
                    },
                    max: {
                        value: 90,
                        message: 'Широта должна быть меньше 90'
                    }
                }}
            />
            <Field
                control={control}
                name='landData.coordinates.longitude'
                placeholder='Долгота'
                keyboardType='numeric'
                rules={{
                    min: {
                        value: -180,
                        message: 'Долгота должна быть больше -180'
                    },
                    max: {
                        value: 180,
                        message: 'Долгота должна быть меньше 180'
                    }
                }}
            />
        </View>
    )
}

export default LandForm 