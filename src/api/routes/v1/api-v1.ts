import Router from 'koa-router';
import { container } from '../../../dependency-injection/container';
import { config } from '../../../config/config';

const v1Router = new Router();

v1Router.post(config.routes.v1.user, container.resolve('createUserHandler'));

export { v1Router };
