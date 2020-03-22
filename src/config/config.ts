import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { AppError } from '../errors/AppError';

function getEnvValue(envKey: string): string | number | boolean | undefined {
  const value = process.env[envKey];

  if (!value) {
    throw new AppError('ENV_VALUE_MISSING', `ENV value for ${envKey} is missing`);
  }

  return value;
}

export class AppConfig {
  public environment = String(getEnvValue('NODE_ENV'));

  public database: PostgresConnectionOptions = {
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
  };

  public logs = {
    logToFile: Boolean(getEnvValue('LOG_TO_FILE')),
    logFile: String(getEnvValue('LOG_FILE'))
  };

  public app = {
    port: Number(getEnvValue('PORT'))
  };
}
