/* eslint-disable @typescript-eslint/no-misused-promises */
import { Server } from 'http';
import { config } from './config/config';
import { systemInit, systemShutdown } from './system';
import { app } from './api/app';
import { servicesStorage } from './domain/ServicesStorage';

let server: Server;

async function gracefulShutdown(): Promise<void> {
  try {
    setTimeout(() => {
      process.exit(1);
    }, 10000);

    await systemShutdown();

    if (server) {
      server.close();
    }
  } finally {
    process.exit(0);
  }
}

((): void => {
  const appLogger = servicesStorage.appLogger;
  process.nextTick(async () => {
    await systemInit();

    server = app
      .listen(config.app.port)
      .on('listening', () => {
        appLogger.logInfo(`Server started at port ${config.app.port}`);
      })
      .on('error', error => {
        appLogger.logInfo(`Server failed to start at port ${config.app.port}`);
        throw error;
      });
  });

  process.on('uncaughtException', async error => {
    appLogger.logError(`UNCAUGHT_EXCEPTION ${error}`);

    try {
      await systemShutdown();
      if (server) {
        server.close();
      }
    } finally {
      process.exit(1);
    }
  });

  process.on('unhandledRejection', async error => {
    appLogger.logError(`UNCAUGHT_REJECTION ${error}`);

    try {
      await systemShutdown();
      if (server) {
        server.close();
      }
    } finally {
      process.exit(1);
    }
  });

  process.on('SIGTERM', async () => {
    appLogger.logInfo('SIGTERM Graceful shutdown...');

    await gracefulShutdown();
  });

  process.on('SIGINT', async () => {
    appLogger.logInfo('SIGTERM Graceful shutdown...');

    await gracefulShutdown();
  });

  process.on('SIGHUP', async () => {
    appLogger.logInfo('SIGTERM Graceful shutdown...');

    await gracefulShutdown();
  });
})();
