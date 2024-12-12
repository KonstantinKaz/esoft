import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { View, Text, Pressable } from 'react-native'
import cn from 'classnames'

const roleTypes = [
    { label: 'Клиент', value: 'CLIENT' },
    { label: 'Риэлтор', value: 'REALTOR' }
] as const

interface IRoleSelect {
    control: Control<any>
}

const RoleSelect: FC<IRoleSelect> = ({ control }) => {
    return (
        <Controller
            control={control}
            name='role'
            rules={{ required: 'Выберите роль' }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <View>
                    <View className='flex-row justify-around mb-3'>
                        {roleTypes.map(type => (
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

export default RoleSelect 