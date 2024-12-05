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
                rules={{ required: 'Укажите площадь участка' }}
            />
        </View>
    )
}

export default LandForm 