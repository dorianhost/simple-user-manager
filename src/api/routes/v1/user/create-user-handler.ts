import { IMiddleware, RouterContext } from 'koa-router';
import { validate } from '../../../../helpers/validate';
import { createUserRequestSchema } from './validation-schemas';
import { AppError } from '../../../../errors/AppError';
import { servicesStorage } from '../../../../domain/ServicesStorage';
import { ContextState } from '../../../interfaces/IContextState';

export function createUserHandler(): IMiddleware<ContextState> {
  return async function(ctx: RouterContext<ContextState>): Promise<void> {
    const userInfo = ctx.request.body;
    const { errors, errorMessage } = validate(userInfo, createUserRequestSchema);

    if (errors) {
      throw new AppError(`VALIDATION_ERROR: ${errorMessage}`, errors, 400);
    }

    const createdUser = await servicesStorage.userService.createUser(userInfo.email);
    ctx.body = createdUser;
    ctx.status = 201;
  };
}
