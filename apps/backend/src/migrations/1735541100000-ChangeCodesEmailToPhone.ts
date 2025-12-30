import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeCodesEmailToPhone1735541100000 implements MigrationInterface {
  name = 'ChangeCodesEmailToPhone1735541100000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if email column exists, then rename it to phone
    await queryRunner.query(`
      ALTER TABLE "codes"
      RENAME COLUMN "email" TO "phone"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert: rename phone back to email
    await queryRunner.query(`
      ALTER TABLE "codes"
      RENAME COLUMN "phone" TO "email"
    `);
  }
}
