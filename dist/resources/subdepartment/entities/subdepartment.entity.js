"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubDepartment = void 0;
const typeorm_1 = require("typeorm");
const department_entity_1 = require("../../department/entities/department.entity");
const graphql_1 = require("@nestjs/graphql");
let SubDepartment = class SubDepartment {
};
exports.SubDepartment = SubDepartment;
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SubDepartment.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], SubDepartment.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => department_entity_1.Department),
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, (department) => department.subDepartments),
    __metadata("design:type", department_entity_1.Department)
], SubDepartment.prototype, "department", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], SubDepartment.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], SubDepartment.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], SubDepartment.prototype, "deletedAt", void 0);
exports.SubDepartment = SubDepartment = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], SubDepartment);
//# sourceMappingURL=subdepartment.entity.js.map