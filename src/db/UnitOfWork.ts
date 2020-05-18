import { QueryRunner, Connection, Repository } from 'typeorm';
import { getDbConnection } from './connection';

export class UnitOfWork {
  private queryRunner: QueryRunner;

  private constructor(connection: Connection) {
    this.queryRunner = connection.createQueryRunner();
  }

  static async create(): Promise<UnitOfWork> {
    const dbConnection = await getDbConnection();
    return new UnitOfWork(dbConnection);
  }

  getRepository<Entity>(entityName: string): Repository<Entity> {
    return this.queryRunner.manager.getRepository<Entity>(entityName);
  }

  async startTransaction(): Promise<void> {
    await this.queryRunner.startTransaction();
  }

  async commitTransaction(): Promise<void> {
    await this.queryRunner.commitTransaction();
  }

  async rollbackTransaction(): Promise<void> {
    await this.queryRunner.rollbackTransaction();
  }
}
