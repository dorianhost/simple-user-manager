import winston, { Logger } from 'winston';
import { AppConfig } from '../../config/config';
import { IAppLogger } from '../interfaces/services/IAppLogger';

export class AppLogger implements IAppLogger {
  private logger: Logger;
  constructor(private appConfig: AppConfig) {
    this.logger = winston.createLogger({
      level: 'info',

      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.align(),
            winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
          )
        })
      ],
      exitOnError: false
    });

    if (this.appConfig.environment !== 'development') {
      this.logger.add(
        new winston.transports.File({
          filename: this.appConfig.logs.logFile,
          format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        })
      );
    }
  }

  logInfo(message: string): void {
    this.logger.info(message);
  }

  logError(message: string): void {
    this.logger.error(message);
  }

  logWarn(message: string): void {
    this.logger.warn(message);
  }
}
