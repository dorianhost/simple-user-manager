import { Repository } from 'typeorm';
import { getDbConnection } from '../connection';

export abstract class BaseRepository<EntityModel> {
  private repository: Repository<EntityModel>;

  constructor(protected entityName: string) {}

  protected async getRepository(): Promise<Repository<EntityModel>> {
    if (!this.repository) {
      const connection = await getDbConnection();
      this.repository = connection.getRepository<EntityModel>(this.entityName);
    }

    return this.repository;
  }
}
