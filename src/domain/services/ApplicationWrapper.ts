import { IAppLogger } from '../interfaces/services/IAppLogger';
import { connectToDatabase, closeDbConnection } from '../../db/connection';

export class ApplicationWrapper {
  private shutdownCallback: () => void;
  constructor(private appLogger: IAppLogger) {}

  async startApplication(callback: () => void): Promise<void> {
    this.setupProcessErrorsListeners();
    this.setupProcessSignalListeners();
    try {
      await connectToDatabase();
      callback();
    } catch (error) {
      this.appLogger.logError(error);
    }
  }

  shutdown(): void {
    this.appLogger.logInfo('Graceful shutdown...');
    try {
      setTimeout(() => {
        process.exit(1);
      }, 10000);

      if (typeof this.shutdownCallback === 'function') {
        this.shutdownCallback();
      }
      closeDbConnection();
    } catch (error) {
      this.appLogger.logError(error);
      process.exit(1);
    } finally {
      process.exit(0);
    }
  }

  setupShutdownCallback(callback: () => void): void {
    this.shutdownCallback = callback;
  }

  private setupProcessSignalListeners(): void {
    process
      .on('SIGTERM', () => {
        this.appLogger.logInfo('SIGTERM Graceful shutdown...');
        this.shutdown();
      })
      .on('SIGINT', () => {
        this.appLogger.logInfo('SIGINT Graceful shutdown...');
        this.shutdown();
      })
      .on('SIGHUP', () => {
        this.appLogger.logInfo('SIGHUP Graceful shutdown...');
        this.shutdown();
      });
  }

  private setupProcessErrorsListeners(): void {
    process
      .on('uncaughtException', error => {
        this.appLogger.logError(`UNCAUGHT_EXCEPTION ${error}`);
        this.shutdown();
      })
      .on('unhandledRejection', error => {
        this.appLogger.logError(`UNCAUGHT_REJECTION ${error}`);
        this.shutdown();
      });
  }
}
