import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { User } from '@prisma/client'

export class RoleGuard implements CanActivate {
  constructor(private roles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const user = request.user as User

    if (!this.roles.includes(user.role)) {
      throw new ForbiddenException('У вас нет прав для этого действия')
    }

    return true
  }
} 