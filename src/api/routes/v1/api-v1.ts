import Router from 'koa-router';
import { config } from '../../../config/config';
import { createUserHandler } from './user/create-user-handler';
import { getUserHandler } from './user/get-user-handler';
import { checkRoleMiddleware } from '../../middlewares/check-role';
import { UserRole } from '../../../domain/interfaces/entities/enums/UserRole';
import { getAllUsersHandler } from './user/get-all-users-handle';
import { updateUserHanlde as updateUserHandle } from './user/update-user-handle';

const v1UnauthorizedRouter = new Router();

v1UnauthorizedRouter.post(config.routes.v1.user, createUserHandler());

const v1AuthorizedRouter = new Router();

v1AuthorizedRouter.get(config.routes.v1.user, checkRoleMiddleware(UserRole.ADMIN), getAllUsersHandler());
v1AuthorizedRouter.get(`${config.routes.v1.user}/:id`, getUserHandler());
v1AuthorizedRouter.patch(`${config.routes.v1.user}/:id`, updateUserHandle());

export { v1UnauthorizedRouter, v1AuthorizedRouter };
