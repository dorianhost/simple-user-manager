import winston from 'winston';
import { config } from '../config/config';

export const logger = winston.createLogger({
  level: 'info',

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`),
      ),
    }),
  ],
  exitOnError: false,
});

if (config.environment !== 'development') {
  logger.add(
    new winston.transports.File({
      filename: config.logs.logFile,
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    }),
  );
}
