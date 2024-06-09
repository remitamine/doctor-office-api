import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { Response } from 'express';

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter<EntityNotFoundError>
  implements ExceptionFilter
{
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.status(404).end();
  }
}
