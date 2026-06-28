import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFieldTblItem1782664767498 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('items', [
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'deletedAt',
        type: 'timestamp',
        isNullable: true,
      }),
      new TableColumn({
        name: 'createdBy',
        type: 'int',
        isNullable: true,
      }),
      new TableColumn({
        name: 'deletedBy',
        type: 'int',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('items', [
      'createdAt',
      'updatedAt',
      'deletedAt',
      'createdBy',
      'deletedBy',
    ]);
  }
}
