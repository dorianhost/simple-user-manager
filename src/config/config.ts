import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { AppError } from '../errors/AppError';

function getEnvValueOrFail(envKey: string): string | number | boolean {
  const value = process.env[envKey];

  if (!value) {
    throw new AppError('ENV_VALUE_MISSING', `ENV value for ${envKey} is missing`);
  }

  return value;
}

function getEnvValue(envKey: string): string | number | boolean | undefined {
  return process.env[envKey];
}

export const config: AppConfig = {
  environment: String(getEnvValueOrFail('NODE_ENV')),
  database: {
    host: String(getEnvValueOrFail('DB_HOST')),
    port: Number(getEnvValueOrFail('DB_PORT')),
    database: String(getEnvValueOrFail('DB_NAME')),
    username: String(getEnvValueOrFail('DB_USER')),
    password: String(getEnvValueOrFail('DB_PASS')),
    logging: false,
    type: 'postgres',
    entities: [`src/db/models/**/*.ts`],
    migrations: ['migrations/**/*.ts'],
    cli: {
      migrationsDir: 'migrations',
    },
  },
  logs: {
    logOutput: String(getEnvValue('LOG_OUTPUT'))?.split(','),
    logFile: String(getEnvValueOrFail('LOG_FILE')),
  },
  app: {
    port: Number(getEnvValueOrFail('PORT')),
  },
  routes: {
    v1: {
      user: '/api/v1/user',
    },
  },
};

interface AppConfig {
  environment: string;
  database: PostgresConnectionOptions;
  logs: {
    logOutput: string[];
    logFile: string;
  };
  app: {
    port: number;
  };
  routes: {
    v1: {
      user: string;
    };
  };
}
