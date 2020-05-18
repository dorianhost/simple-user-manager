import { getDbConnection } from './db/connection';

export async function systemInit(): Promise<void> {
  //do nothing
}

export async function systemShutdown(): Promise<void> {
  const connection = await getDbConnection();
  await connection.close();
}
