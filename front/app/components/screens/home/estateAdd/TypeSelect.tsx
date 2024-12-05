import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { View, Text, Pressable } from 'react-native'
import cn from 'classnames'
import { IEstate } from '@/services/estate.service'

const estateTypes = [
    { label: 'Квартира', value: 'APARTMENT' },
    { label: 'Дом', value: 'HOUSE' },
    { label: 'Участок', value: 'LAND' }
] as const

interface ITypeSelect {
    control: Control<IEstate>
}

const TypeSelect: FC<ITypeSelect> = ({ control }) => {
    return (
        <Controller
            control={control}
            name='type'
            rules={{ required: 'Выберите тип недвижимости' }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <View>
                    <View className='flex-row justify-between mb-3'>
                        {estateTypes.map(type => (
                            <Pressable
                                key={type.value}
                                onPress={() => onChange(type.value)}
                                className={cn(
                                    'py-2 px-4 rounded-xl',
                                    value === type.value
                                        ? 'bg-primary'
                                        : 'bg-[#232323]'
                                )}
                            >
                                <Text className='text-white text-base'>
                                    {type.label}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                    {error && (
                        <Text className='text-red text-sm'>{error.message}</Text>
                    )}
                </View>
            )}
        />
    )
}

export default TypeSelect 