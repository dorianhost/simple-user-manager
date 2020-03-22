import { getConnection } from '../../db/connection';
import { container } from '../../dependency-injection/container';

beforeAll(() => {
  const config = container.cradle.appConfig;
  config.database = {
    ...config.database,
    database: config.database.database + '_test',
    dropSchema: true,
    synchronize: true
  };
});

afterAll(async () => {
  const connection = await getConnection();
  await connection.close();
});
