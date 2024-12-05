import React, { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, View, Text } from 'react-native'
import Button from '@/components/ui/button/Button'
import Field from '@/components/ui/form/field/Field'
import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import { useEstateAdd } from './useEstateAdd'

const EstateAdd: FC = () => {
    const { control, handleSubmit, isLoading } = useForm()
    const { onSubmit } = useEstateAdd()

    return (
        <Layout isHasPadding>
            <View>
                {isLoading ? (
                    <Loader />
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Field control={control} name='city' placeholder='Город' />
                        <Field control={control} name='street' placeholder='Улица' />
                        <Field control={control} name='house' placeholder='Дом' />
                        <Field control={control} name='apartment' placeholder='Квартира' />

                        <Controller
                            control={control}
                            name='type'
                            render={({ field: { value, onChange } }) => (
                                <View>
                                    {/* Здесь можно добавить селектор типа недвижимости */}
                                </View>
                            )}
                        />

                        <Button onPress={handleSubmit(onSubmit)} icon='plus'>
                            Добавить
                        </Button>
                    </ScrollView>
                )}
            </View>
        </Layout>
    )
}

export default EstateAdd 