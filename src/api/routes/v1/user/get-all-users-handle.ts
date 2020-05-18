import { IMiddleware, RouterContext } from 'koa-router';
import { ContextState } from '../../../interfaces/IContextState';
import { IUserService } from '../../../../domain/interfaces/services/IUserService';
import { container } from '../../../../dependency-injection/container';

function getAllUsersHandlerBuilder(userService: IUserService): IMiddleware<ContextState> {
  return async function(ctx: RouterContext<ContextState>): Promise<void> {
    ctx.body = await userService.getAllUsers();
    ctx.status = 200;
  };
}

export const getAllUsersHandler = (): IMiddleware<ContextState> =>
  container.build(getAllUsersHandlerBuilder);
