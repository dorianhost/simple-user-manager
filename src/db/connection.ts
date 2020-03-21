import { Connection, createConnection } from 'typeorm';
import { config } from '../config/config';

let connection: Connection | undefined;

export async function getConnection(): Promise<Connection> {
  if (!connection) {
    connection = await createConnection(config.database);
  }

  return connection;
}

export async function rawSQL<T>(query: string, parameters?: any[]): Promise<T[]> {
  const connection = await getConnection();

  return connection.query(query, parameters);
}
