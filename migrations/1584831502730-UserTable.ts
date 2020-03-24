import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1584831502730 implements MigrationInterface {
  name = 'UserTable1584831502730';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('USER', 'ADMIN')`, undefined);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL, "email" text NOT NULL, "role" "user_role_enum" NOT NULL DEFAULT 'USER', "last_action" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`, undefined);
    await queryRunner.query(`DROP TYPE "user_role_enum"`, undefined);
  }
}
