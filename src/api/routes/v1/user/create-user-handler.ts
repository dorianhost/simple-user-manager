import { Middleware, Context } from 'koa';
import { validate } from '../../../../heplers/validate';
import { createUserRequestSchema } from './validation-schemas';
import { AppError } from '../../../../errors/AppError';
import { IUserService } from '../../../../domain/interfaces/services/IUserService';

export function createUserHandler(userService: IUserService): Middleware {
  return async function(ctx: Context): Promise<void> {
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
