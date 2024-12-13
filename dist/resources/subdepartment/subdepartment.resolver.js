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
exports.SubdepartmentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const subdepartment_service_1 = require("./subdepartment.service");
const subdepartment_entity_1 = require("./entities/subdepartment.entity");
const create_subdepartment_dto_1 = require("./dto/create-subdepartment.dto");
const update_subdepartment_dto_1 = require("./dto/update-subdepartment.dto");
const types_1 = require("./types/types");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../guard/jwt-auth.guard");
let SubdepartmentResolver = class SubdepartmentResolver {
    constructor(subdepartmentService) {
        this.subdepartmentService = subdepartmentService;
    }
    async createSubDepartment(subDepartmentDto) {
        return this.subdepartmentService.create(subDepartmentDto);
    }
    async getAllSubDepartments() {
        return this.subdepartmentService.findAll();
    }
    async getSubDepartment(id) {
        return this.subdepartmentService.findOne(id);
    }
    async updateSubDepartment(updateSubDepartmentDto) {
        return this.subdepartmentService.update(updateSubDepartmentDto);
    }
    async deleteSubDepartment(id) {
        return this.subdepartmentService.remove(id);
    }
};
exports.SubdepartmentResolver = SubdepartmentResolver;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => subdepartment_entity_1.SubDepartment),
    __param(0, (0, graphql_1.Args)('subDepartmentDto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subdepartment_dto_1.SubDepartmentDto]),
    __metadata("design:returntype", Promise)
], SubdepartmentResolver.prototype, "createSubDepartment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => [subdepartment_entity_1.SubDepartment]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubdepartmentResolver.prototype, "getAllSubDepartments", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => subdepartment_entity_1.SubDepartment),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubdepartmentResolver.prototype, "getSubDepartment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => subdepartment_entity_1.SubDepartment),
    __param(0, (0, graphql_1.Args)('updateSubDepartmentDto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_subdepartment_dto_1.UpdateSubDepartmentDto]),
    __metadata("design:returntype", Promise)
], SubdepartmentResolver.prototype, "updateSubDepartment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => types_1.SuccessResponse),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubdepartmentResolver.prototype, "deleteSubDepartment", null);
exports.SubdepartmentResolver = SubdepartmentResolver = __decorate([
    (0, graphql_1.Resolver)(() => subdepartment_entity_1.SubDepartment),
    __metadata("design:paramtypes", [subdepartment_service_1.SubdepartmentService])
], SubdepartmentResolver);
//# sourceMappingURL=subdepartment.resolver.js.map