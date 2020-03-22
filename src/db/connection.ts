import { Connection, createConnection } from 'typeorm';
import { AppConfig } from '../config/config';
import { container } from '../dependency-injection/container';

let connection: Connection | undefined;

export async function getConnection(): Promise<Connection> {
  if (!connection) {
    const appConfig = container.resolve<AppConfig>('appConfig');
    connection = await createConnection(appConfig.database);
  }

  return connection;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function rawSQL<T>(query: string, parameters?: any[]): Promise<T[]> {
  const connection = await getConnection();

  return connection.query(query, parameters);
}
