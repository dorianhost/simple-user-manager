import { Server } from 'http';
import { container } from './dependency-injection/container';
import { ApplicationWrapper } from './domain/services/ApplicationWrapper';
import { IAppLogger } from './domain/interfaces/services/IAppLogger';
import { app } from './api/app';
import { config } from './config/config';

let server: Server;

const startApp = (): void =>
  container.build((appLogger: IAppLogger) => {
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

const stopApp = (): void => {
  if (server) {
    server.close();
  }
};

const applicationWrapper = container.build(ApplicationWrapper);

applicationWrapper.setupShutdownCallback(stopApp);

applicationWrapper.startApplication(startApp);
