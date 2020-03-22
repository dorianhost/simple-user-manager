import { IMiddleware, RouterContext } from 'koa-router';
import { ContextState } from '../../../interfaces/IContextState';
import { servicesStorage } from '../../../../dependency-injection/ServicesStorage';

export function getAllUsersHandler(): IMiddleware<ContextState> {
  return async function(ctx: RouterContext<ContextState>): Promise<void> {
    ctx.body = await servicesStorage.userService.getAllUsers();
    ctx.status = 200;
  };
}
