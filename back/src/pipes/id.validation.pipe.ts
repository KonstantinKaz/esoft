import {
	ArgumentMetadata,
	BadRequestException,
	PipeTransform,
} from '@nestjs/common'
import { isCuid } from 'cuid'

export class IdValidationPipe implements PipeTransform {
	transform(value: string, meta: ArgumentMetadata) {
		// Проверяем, что валидация происходит для параметров URL
		if (meta.type !== 'param') return value

		// Проверяем, является ли переданный ID корректным cuid
		if (!isCuid(value)) {
			throw new BadRequestException('Invalid ID format. Expected a valid cuid.')
		}

		return value
	}
}
