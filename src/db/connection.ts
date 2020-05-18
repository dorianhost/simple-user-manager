import { Connection, createConnection } from 'typeorm';
import { config } from '../config/config';

let connection: Connection | undefined;

export async function getDbConnection(): Promise<Connection> {
  if (!connection) {
    connection = await createConnection(config.database);
  }

  return connection;
}

export async function connectToDatabase(): Promise<void> {
  connection = await createConnection(config.database);
}

export function closeDbConnection(): void {
  if (connection) {
    connection.close();
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function rawSQL<T>(query: string, parameters?: any[]): Promise<T[]> {
  const connection = await getDbConnection();

  return connection.query(query, parameters);
}
