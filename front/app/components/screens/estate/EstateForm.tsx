import { FC } from 'react'
import { Control } from 'react-hook-form'
import Field from '@/components/ui/form/field/Field'
import { EstateType } from '@/shared/types/estate.types'

interface IEstateForm {
  control: Control<any>
  type: EstateType
}

const EstateForm: FC<IEstateForm> = ({ control, type }) => {
  return (
    <>
      <Field
        control={control}
        name='city'
        placeholder='Город'
        rules={{ required: 'Укажите город' }}
      />
      <Field
        control={control}
        name='street'
        placeholder='Улица'
        rules={{ required: 'Укажите улицу' }}
      />
      <Field
        control={control}
        name='house'
        placeholder='Дом'
        rules={{ required: 'Укажите номер дома' }}
      />

      {type === 'APARTMENT' && (
        <>
          <Field
            control={control}
            name='apartmentData.apartment'
            placeholder='Квартира'
            rules={{ required: 'Укажите номер квартиры' }}
          />
          <Field
            control={control}
            name='apartmentData.floor'
            placeholder='Этаж'
            rules={{ required: 'Укажите этаж' }}
            keyboardType='numeric'
          />
          <Field
            control={control}
            name='apartmentData.rooms'
            placeholder='Количество комнат'
            rules={{ required: 'Укажите количество комнат' }}
            keyboardType='numeric'
          />
          <Field
            control={control}
            name='apartmentData.totalArea'
            placeholder='Общая площадь'
            rules={{ required: 'Укажите общую площадь' }}
            keyboardType='numeric'
          />
        </>
      )}

      {type === 'HOUSE' && (
        <>
          <Field
            control={control}
            name='houseData.floors'
            placeholder='Этажей'
            rules={{ required: 'Укажите количество этажей' }}
            keyboardType='numeric'
          />
          <Field
            control={control}
            name='houseData.rooms'
            placeholder='Количество комнат'
            rules={{ required: 'Укажите количество комнат' }}
            keyboardType='numeric'
          />
          <Field
            control={control}
            name='houseData.totalArea'
            placeholder='Общая площадь'
            rules={{ required: 'Укажите общую площадь' }}
            keyboardType='numeric'
          />
        </>
      )}

      {type === 'LAND' && (
        <Field
          control={control}
          name='landData.totalArea'
          placeholder='Площадь участка'
          rules={{ required: 'Укажите площадь участка' }}
          keyboardType='numeric'
        />
      )}
    </>
  )
}

export default EstateForm 