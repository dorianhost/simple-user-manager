import { IMiddleware, RouterContext } from 'koa-router';
import { ContextState } from '../../../interfaces/IContextState';
import { UserRole } from '../../../../domain/interfaces/entities/enums/UserRole';
import { AppError } from '../../../../errors/AppError';
import { IUserService } from '../../../../domain/interfaces/services/IUserService';
import { container } from '../../../../dependency-injection/container';

function getUserHandlerBuilder(userService: IUserService): IMiddleware<ContextState> {
  return async function(ctx: RouterContext<ContextState>): Promise<void> {
    const userId = ctx.params.id;

    if (ctx.state.user.id !== userId && ctx.state.user.role !== UserRole.ADMIN) {
      throw new AppError('ACCESS_DENIED', `You don't have permission to that resource`);
    }

    ctx.body = await userService.getUser(userId);
    ctx.status = 200;
  };
}

export const getUserHandler = (): IMiddleware<ContextState> =>
  container.build(getUserHandlerBuilder);
