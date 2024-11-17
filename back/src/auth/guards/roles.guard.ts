import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from '@prisma/client'
import { UserService } from 'src/user/user.service'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private userService: UserService
	) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.get<Role[]>(
			'roles',
			context.getHandler()
		)
		if (!requiredRoles) {
			return true
		}

		const request = context.switchToHttp().getRequest()
		const user = request.user

		if (!user || !requiredRoles.includes(user.role)) {
			throw new ForbiddenException('У вас нет прав доступа к этому ресурсу')
		}

		return true
	}
}
