import { IMiddleware, RouterContext } from 'koa-router';
import { validate } from '../../../../helpers/validate';
import { createUserRequestSchema } from './validation-schemas';
import { AppError } from '../../../../errors/AppError';
import { ContextState } from '../../../interfaces/IContextState';
import { IUserService } from '../../../../domain/interfaces/services/IUserService';
import { container } from '../../../../dependency-injection/container';

function createUserHandlerBuilder(userService: IUserService): IMiddleware<ContextState> {
  return async function(ctx: RouterContext<ContextState>): Promise<void> {
    const userInfo = ctx.request.body;
    const { errors, errorMessage } = validate(userInfo, createUserRequestSchema);

    if (errors) {
      throw new AppError(`VALIDATION_ERROR: ${errorMessage}`, errors, 400);
    }

    const createdUser = await userService.createUser(userInfo.email);
    ctx.body = createdUser;
    ctx.status = 201;
  };
}

export const createUserHandler = (): IMiddleware<ContextState> =>
  container.build(createUserHandlerBuilder);
