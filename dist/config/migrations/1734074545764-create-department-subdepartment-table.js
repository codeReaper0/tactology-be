"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDepartmentSubdepartmentTable1734074545764 = void 0;
class CreateDepartmentSubdepartmentTable1734074545764 {
    constructor() {
        this.name = 'CreateDepartmentSubdepartmentTable1734074545764';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "sub_department" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "departmentId" integer, CONSTRAINT "PK_7f04797afdf7f75b8be0630b5e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sub_department" ADD CONSTRAINT "FK_e1b1566895082e852aa1cb84eb2" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "sub_department" DROP CONSTRAINT "FK_e1b1566895082e852aa1cb84eb2"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "sub_department"`);
    }
}
exports.CreateDepartmentSubdepartmentTable1734074545764 = CreateDepartmentSubdepartmentTable1734074545764;
//# sourceMappingURL=1734074545764-create-department-subdepartment-table.js.map