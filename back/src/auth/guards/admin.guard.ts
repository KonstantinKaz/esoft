// import {
// 	CanActivate,
// 	ExecutionContext,
// 	ForbiddenException,
// } from '@nestjs/common'
// import { Reflector } from '@nestjs/core'

// export class OnlyAdminGuard implements CanActivate {
// 	constructor(private reflector: Reflector) {}

// 	canActivate(context: ExecutionContext): boolean {
// 		const request = context.switchToHttp().getRequest<Request>()
// 		const user = request.user as UserModel
// 		if (user.role !== Role.ADMIN) {
// 			throw new ForbiddenException('У тебя нет прав!')
// 		}
// 		return true
// 	}
// }
