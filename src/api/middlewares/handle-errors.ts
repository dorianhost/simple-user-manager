import stringify from 'json-stringify-safe';
import { Context, Next } from 'koa';
import { AppError } from '../../errors/AppError';
import { container } from '../../dependency-injection/container';
import { IAppLogger } from '../../domain/interfaces/services/IAppLogger';

export async function handleErrors(ctx: Context, next: Next): Promise<void> {
  const appLogger = container.resolve<IAppLogger>('appLogger');
  try {
    await next();

    if (ctx.status === 404) {
      throw new AppError('NOT FOUND', `Resource ${ctx.request.url} not found`, 404);
    }
  } catch (error) {
    let code: string;
    let message: string | undefined;
    let status: number;

    if (error instanceof AppError) {
      status = error.status || 500;
      code = error.code;
      message = error.message;
      appLogger.logError(`${code} ==> ${message}\nReqest: ${stringify(ctx.request.body)}\n${error}`);
    } else {
      status = 500;
      code = 'UNKNOWN_ERROR';
      appLogger.logError(`${code} ==> ${error.message}\nReqest: ${stringify(ctx.request.body)}\n${error.stack}`);
    }

    ctx.status = status;
    ctx.body = { code, message };
  }
}
