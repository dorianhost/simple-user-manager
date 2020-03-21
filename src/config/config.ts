import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { AppError } from '../errors/AppError';

function getEnvValue(envKey: string): string | number | boolean {
  const value = process.env[envKey];

  if (!value) {
    throw new AppError('ENV_VALUE_MISSING', `ENV value for ${envKey} is missing`);
  }

  return value;
}

export const config: AppConfig = {
  environment: String(getEnvValue('NODE_ENV')),
  database: {
    host: String(getEnvValue('DB_HOST')),
    port: Number(getEnvValue('DB_PORT')),
    database: String(getEnvValue('DB_NAME')),
    username: String(getEnvValue('DB_USER')),
    password: String(getEnvValue('DB_PASS')),
    logging: false,
    type: 'postgres',
    entities: [`src/db/models/**/*.ts`],
    migrations: ['migrations/**/*.ts'],
    cli: {
      migrationsDir: 'migrations'
    }
  },
  logs: {
    logToFile: Boolean(getEnvValue('LOG_TO_FILE')),
    logFile: String(getEnvValue('LOG_FILE'))
  },
  app: {
    port: Number(getEnvValue('PORT'))
  }
};

interface AppConfig {
  environment: string;
  database: PostgresConnectionOptions;
  logs: {
    logToFile: boolean;
    logFile: string;
  };
  app: {
    port: number;
  };
}
