import { Next } from 'koa';
import { RouterContext, IMiddleware } from 'koa-router';
import { AppError } from '../../errors/AppError';
import { ContextState } from '../interfaces/IContextState';
import { IUserService } from '../../domain/interfaces/services/IUserService';
import { container } from '../../dependency-injection/container';

function authorizationMiddlewareBuilder(userService: IUserService): IMiddleware<ContextState> {
  return async function(ctx: RouterContext<ContextState>, next: Next): Promise<void> {
    const authorizationHeader = ctx.request.headers.authorization;

    if (!authorizationHeader) {
      throw new AppError('UNAUTHORIZED', 'Please, make authorization', 403);
    }

    // remove "Bearer "
    const userId = authorizationHeader.substring(7);
    const user = await userService.getUser(userId);

    await userService.updateUser(userId, { lastAction: new Date() });
    ctx.state.user = user;
    return next();
  };
}

export const authorizationMiddleware = (): IMiddleware<ContextState> =>
  container.build(authorizationMiddlewareBuilder);
