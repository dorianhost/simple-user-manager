import { getDbConnection } from '../../db/connection';
import { config } from '../../config/config';

beforeAll(() => {
  config.database = {
    ...config.database,
    database: config.database.database + '_test',
    dropSchema: true,
    synchronize: true,
  };
});

afterAll(async () => {
  const connection = await getDbConnection();
  await connection.close();
});
