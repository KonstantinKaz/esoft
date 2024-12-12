export const formatNumber = (value: string | number | undefined) => {
  if (!value && value !== 0) return ''
  
  try {
    // Безопасное преобразование в строку
    const stringValue = String(value)
    // Удаляем все нечисловые символы
    const numbers = stringValue.replace(/[^\d]/g, '')
    // Форматируем число с разделителями
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  } catch (error) {
    return ''
  }
}

export const unformatNumber = (value: string | undefined) => {
  if (!value) return ''
  try {
    // Удаляем все пробелы
    return value.replace(/\s/g, '')
  } catch (error) {
    return ''
  }
} 