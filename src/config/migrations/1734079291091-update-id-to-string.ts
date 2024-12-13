import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateIdToString1734079291091 implements MigrationInterface {
    name = 'UpdateIdToString1734079291091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_department" DROP CONSTRAINT "FK_e1b1566895082e852aa1cb84eb2"`);
        await queryRunner.query(`ALTER TABLE "sub_department" DROP CONSTRAINT "PK_7f04797afdf7f75b8be0630b5e5"`);
        await queryRunner.query(`ALTER TABLE "sub_department" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "sub_department" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "sub_department" ADD CONSTRAINT "PK_7f04797afdf7f75b8be0630b5e5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "sub_department" ADD CONSTRAINT "UQ_321192758ac753202e02bb03d7c" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "sub_department" DROP COLUMN "departmentId"`);
        await queryRunner.query(`ALTER TABLE "sub_department" ADD "departmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "PK_9a2213262c1593bffb581e382f5"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "department" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "UQ_471da4b90e96c1ebe0af221e07b" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "sub_department" ADD CONSTRAINT "FK_e1b1566895082e852aa1cb84eb2" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_department" DROP CONSTRAINT "FK_e1b1566895082e852aa1cb84eb2"`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "UQ_471da4b90e96c1ebe0af221e07b"`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "PK_9a2213262c1593bffb581e382f5"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "department" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "sub_department" DROP COLUMN "departmentId"`);
        await queryRunner.query(`ALTER TABLE "sub_department" ADD "departmentId" integer`);
        await queryRunner.query(`ALTER TABLE "sub_department" DROP CONSTRAINT "UQ_321192758ac753202e02bb03d7c"`);
        await queryRunner.query(`ALTER TABLE "sub_department" DROP CONSTRAINT "PK_7f04797afdf7f75b8be0630b5e5"`);
        await queryRunner.query(`ALTER TABLE "sub_department" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "sub_department" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sub_department" ADD CONSTRAINT "PK_7f04797afdf7f75b8be0630b5e5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "sub_department" ADD CONSTRAINT "FK_e1b1566895082e852aa1cb84eb2" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
