import { FC } from 'react'
import { Control } from 'react-hook-form'
import { View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { UserService } from '@/services/user.service'
import Select from '@/components/ui/form/select/Select'

type Role = 'CLIENT' | 'REALTOR' | 'ADMIN'

interface IUserSelect {
  control: Control<any>
  name: string
  placeholder: string
  role: Role
  rules?: any
}

const UserSelect: FC<IUserSelect> = ({ control, name, placeholder, role, rules }) => {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users', role],
    queryFn: () => UserService.getAll({ role })
  })

  const options = users
    ?.filter(user => user.role === role)
    ?.map(user => {
      const profile = role === 'CLIENT' ? user.clientProfile : user.realtorProfile
      
      let label = ''
      if (profile?.lastName || profile?.firstName || profile?.middleName) {
        label = `${profile.lastName || ''} ${profile.firstName || ''} ${profile.middleName || ''}`.trim()
      } else {
        label = `ID: ${user.id}`
      }

      return {
        label,
        value: user.id
      }
    })
    .filter(Boolean) || []

  return (
    <View className='mb-4'>
      <Select
        control={control}
        name={name}
        placeholder={placeholder}
        options={options}
        rules={rules}
        isLoading={isLoading}
        useScrollView={true}
      />
    </View>
  )
}

export default UserSelect 