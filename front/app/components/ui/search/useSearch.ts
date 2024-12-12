import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserService } from '@/services/user.service'
import { EstateService } from '@/services/estate.service'

interface ISearchForm {
  searchTerm: string
}

export const useSearch = (isUserSearch: boolean = false) => {
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { control, watch } = useForm<ISearchForm>({
    mode: 'onChange',
    defaultValues: {
      searchTerm: ''
    }
  })

  const searchTerm = watch('searchTerm')

  useEffect(() => {
    const search = async () => {
      try {
        setIsLoading(true)
        
        if (isUserSearch) {
          const users = await UserService.getAll(searchTerm)
          setSearchResults(users)
        } else {
          const estates = await EstateService.getAll({ 
            searchTerm 
          })
          setSearchResults(estates)
        }
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(() => {
      search()
    }, 500)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm, isUserSearch])

  return { control, searchResults, isLoading }
} 