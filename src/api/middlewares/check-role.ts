import { Next } from 'koa';
import { IMiddleware, RouterContext } from 'koa-router';
import { UserRole } from '../../domain/interfaces/entities/enums/UserRole';
import { ContextState } from '../interfaces/IContextState';
import { AppError } from '../../errors/AppError';

export function checkRoleMiddleware(role: UserRole): IMiddleware<ContextState> {
  return async function(ctx: RouterContext<ContextState>, next: Next): Promise<void> {
    const user = ctx.state.user;

    if (!user) {
      throw new Error('User is missed in checkRoleMiddleware');
    }

    if (user.role !== role) {
      throw new AppError('ACCESS_DENIED', `You don't have permission to that resource`);
    }
    return next();
  };
}
