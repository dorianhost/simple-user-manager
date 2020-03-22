import { Next } from 'koa';
import { RouterContext, IMiddleware } from 'koa-router';
import { AppError } from '../../errors/AppError';
import { servicesStorage } from '../../dependency-injection/ServicesStorage';
import { ContextState } from '../interfaces/IContextState';

export function authorizationMiddleware(): IMiddleware<ContextState> {
  return async function(ctx: RouterContext<ContextState>, next: Next): Promise<void> {
    const authorizationHeader = ctx.request.headers.authorization;

    if (!authorizationHeader) {
      throw new AppError('UNAUTHORIZED', 'Please, make authorization', 403);
    }

    // remove "Bearer "
    const userId = authorizationHeader.substring(7);
    const user = await servicesStorage.userService.getUser(userId);

    await servicesStorage.userService.updateUser(userId, { lastAction: new Date() });
    ctx.state.user = user;
    return next();
  };
}
