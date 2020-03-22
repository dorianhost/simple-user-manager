import { Repository } from 'typeorm';
import { getConnection } from '../connection';

export abstract class BaseRepository<EntityModel> {
  protected entityName: string;
  private repository: Repository<EntityModel>;

  constructor(entityname: string) {
    this.entityName = entityname;
  }

  protected async getRepository(): Promise<Repository<EntityModel>> {
    if (!this.repository) {
      const connection = await getConnection();
      this.repository = connection.getRepository<EntityModel>(this.entityName);
    }

    return this.repository;
  }
}
