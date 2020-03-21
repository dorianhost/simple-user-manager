import { Connection, createConnection } from 'typeorm';
import { config } from '../config/config';

let connection: Connection | undefined;

export async function getConnection(): Promise<Connection> {
  if (!connection) {
    connection = await createConnection(config.database);
  }

  return connection;
}
