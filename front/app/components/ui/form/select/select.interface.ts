export interface ISelect {
  options: { label: string; value: string }[]
  value?: string
  onChange: (...event: any[]) => void
  placeholder: string
  error?: string
} 