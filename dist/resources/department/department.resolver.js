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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const department_service_1 = require("./department.service");
const create_department_dto_1 = require("./dto/create-department.dto");
const update_department_dto_1 = require("./dto/update-department.dto");
const department_entity_1 = require("./entities/department.entity");
const paginations_dto_1 = require("./dto/paginations.dto");
const types_1 = require("./types/types");
const types_2 = require("../subdepartment/types/types");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../guard/jwt-auth.guard");
let DepartmentResolver = class DepartmentResolver {
    constructor(departmentService) {
        this.departmentService = departmentService;
    }
    async createDepartment(createDepartmentDto) {
        return this.departmentService.create(createDepartmentDto);
    }
    async updateDepartment(updateDepartmentDto) {
        return this.departmentService.update(updateDepartmentDto);
    }
    async findOne(id) {
        return this.departmentService.findOne(id);
    }
    async findAll(query) {
        return this.departmentService.findAll(query);
    }
    async deleteDepartment(id) {
        return this.departmentService.delete(id);
    }
    async findById(id) {
        return this.departmentService.findById(id);
    }
};
exports.DepartmentResolver = DepartmentResolver;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => department_entity_1.Department),
    __param(0, (0, graphql_1.Args)('createDepartmentDto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_department_dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentResolver.prototype, "createDepartment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => department_entity_1.Department),
    __param(0, (0, graphql_1.Args)('updateDepartmentDto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_department_dto_1.UpdateDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentResolver.prototype, "updateDepartment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => department_entity_1.Department),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentResolver.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => types_1.PaginateDepartment),
    __param(0, (0, graphql_1.Args)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paginations_dto_1.PaginationsDto]),
    __metadata("design:returntype", Promise)
], DepartmentResolver.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => types_2.SuccessResponse),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentResolver.prototype, "deleteDepartment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => department_entity_1.Department),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentResolver.prototype, "findById", null);
exports.DepartmentResolver = DepartmentResolver = __decorate([
    (0, graphql_1.Resolver)(() => department_entity_1.Department),
    __metadata("design:paramtypes", [department_service_1.DepartmentService])
], DepartmentResolver);
//# sourceMappingURL=department.resolver.js.map