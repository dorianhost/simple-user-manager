import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { handleErrors } from './middlewares/handle-errors';
import { v1Router } from './routes/v1/api-v1';

const app = new Koa();

app
  .use(handleErrors)
  .use(bodyParser())
  .use(v1Router.routes());

export { app };
