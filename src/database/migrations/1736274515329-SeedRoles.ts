import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedRoles1736274515329 implements MigrationInterface {
    name = 'SeedRoles1736274515329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO roles (name) VALUES ('Admin'), ('User'), ('Manager')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM roles WHERE name IN ('Admin', 'User', 'Manager')`);
    }

}
