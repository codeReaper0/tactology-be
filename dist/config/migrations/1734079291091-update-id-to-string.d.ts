import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdateIdToString1734079291091 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
