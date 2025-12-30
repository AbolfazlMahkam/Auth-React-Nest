import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1735541000000 implements MigrationInterface {
  name = 'InitialSchema1735541000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL NOT NULL,
        "email" character varying NOT NULL,
        "phone" character varying NOT NULL,
        "role" character varying NOT NULL,
        "first_name" character varying(25),
        "last_name" character varying(25),
        "password" character varying NOT NULL,
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "UQ_users_phone" UNIQUE ("phone"),
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
      )
    `);

    // Create codes table
    await queryRunner.query(`
      CREATE TABLE "codes" (
        "id" SERIAL NOT NULL,
        "email" character varying NOT NULL,
        "code" integer NOT NULL,
        "is_used" boolean DEFAULT false,
        CONSTRAINT "PK_codes_id" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "codes"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
