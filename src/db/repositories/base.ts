import { Repository } from 'typeorm';
import { getConnection } from '../connection';

export abstract class BaseRepository<EntityModel> {
  private repository: Repository<EntityModel>;

  constructor(protected entityName: string) {}

  protected async getRepository(): Promise<Repository<EntityModel>> {
    if (!this.repository) {
      const connection = await getConnection();
      this.repository = connection.getRepository<EntityModel>(this.entityName);
    }

    return this.repository;
  }
}
