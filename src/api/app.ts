import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { handleErrors } from './middlewares/handle-errors';
import { v1UnauthorizedRouter, v1AuthorizedRouter } from './routes/v1/api-v1';
import { authorizationMiddleware } from './middlewares/authorization';

const app = new Koa();

app
  .use(handleErrors)
  .use(bodyParser())
  .use(v1UnauthorizedRouter.routes())
  .use(authorizationMiddleware())
  .use(v1AuthorizedRouter.routes());

export { app };
