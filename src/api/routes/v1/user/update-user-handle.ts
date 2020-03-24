import { IMiddleware, RouterContext } from 'koa-router';
import { ContextState } from '../../../interfaces/IContextState';
import { servicesStorage } from '../../../../domain/ServicesStorage';
import { updateUserRequestSchema } from './validation-schemas';
import { validate } from '../../../../helpers/validate';
import { AppError } from '../../../../errors/AppError';

export function updateUserHanlde(): IMiddleware<ContextState> {
  return async function(ctx: RouterContext<ContextState>): Promise<void> {
    const userId = ctx.params.id;
    const updateInfo = ctx.request.body;
    const { errors, errorMessage } = validate(updateInfo, updateUserRequestSchema);
    if (errors) {
      throw new AppError(`VALIDATION_ERROR: ${errorMessage}`, errors, 400);
    }

    const updatedUser = await servicesStorage.userService.updateUser(userId, updateInfo);
    ctx.body = updatedUser;
    ctx.status = 200;
  };
}
