import { UseGuards, applyDecorators } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { RoleGuard } from '../guards/role.guard'

export const Auth = (roles: ('ADMIN' | 'REALTOR' | 'CLIENT')[] = ['ADMIN', 'REALTOR']) =>
  applyDecorators(
    UseGuards(AuthGuard('jwt'), new RoleGuard(roles))
  )
