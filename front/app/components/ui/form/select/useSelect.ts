import { useState } from 'react'
import { Control, useController } from 'react-hook-form'

export const useSelect = (control: Control<any>, name: string, rules?: any) => {
  const [isOpen, setIsOpen] = useState(false)

  const { field } = useController({
    control,
    name,
    rules
  })

  return {
    isOpen,
    setIsOpen,
    setValue: field.onChange,
    value: field.value
  }
} 