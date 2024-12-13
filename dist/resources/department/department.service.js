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
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const department_entity_1 = require("./entities/department.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const subdepartment_service_1 = require("../subdepartment/subdepartment.service");
const date_range_1 = require("../../utilities/date-range");
let DepartmentService = class DepartmentService {
    constructor(departmentRepository, subdepartmentService) {
        this.departmentRepository = departmentRepository;
        this.subdepartmentService = subdepartmentService;
    }
    async create(createDepartmentDto) {
        const { name, subDepartments } = createDepartmentDto;
        const department = this.departmentRepository.create({ name });
        const savedDepartment = await this.departmentRepository.save(department);
        if (subDepartments && subDepartments.length > 0) {
            const subDepartmentEntities = subDepartments.map((subDept) => this.subdepartmentService.create({
                ...subDept,
                departmentId: savedDepartment.id,
            }));
            savedDepartment.subDepartments = await Promise.all(subDepartmentEntities);
        }
        return savedDepartment;
    }
    async update(updateDepartmentDto) {
        const { id, name, subDepartments } = updateDepartmentDto;
        const department = await this.departmentRepository.findOne({
            where: { id },
            relations: ['subDepartments'],
        });
        if (!department) {
            throw new common_1.NotFoundException('Department not found');
        }
        department.name = name;
        if (subDepartments) {
            const subDepartmentEntities = await Promise.all(subDepartments.map(async (subDeptDto) => {
                if (subDeptDto.id) {
                    return this.subdepartmentService.update({
                        ...subDeptDto,
                        departmentId: id,
                    });
                }
                else {
                    return this.subdepartmentService.create({
                        ...subDeptDto,
                        departmentId: id,
                    });
                }
            }));
            department.subDepartments = subDepartmentEntities;
        }
        return await this.departmentRepository.save(department);
    }
    async findOne(id) {
        const department = await this.departmentRepository.findOne({
            where: { id },
            relations: ['subDepartments'],
        });
        if (!department) {
            throw new Error('Department not found');
        }
        return department;
    }
    async findAll(query) {
        const { startDate, endDate, page = 1, pageSize = 10 } = query;
        const dateRangeCondition = (0, date_range_1.getDateRangeCondition)(startDate, endDate);
        const options = {
            where: {
                ...dateRangeCondition,
            },
            order: {
                name: 'ASC',
            },
            relations: ['subDepartments'],
        };
        const paginationOptions = {
            limit: pageSize,
            page,
        };
        const paginatedData = await (0, nestjs_typeorm_paginate_1.paginate)(this.departmentRepository, paginationOptions, options);
        return {
            data: paginatedData.items,
            count: paginatedData.meta.totalItems,
            currentPage: paginatedData.meta.currentPage,
            lastPage: paginatedData.meta.totalPages,
        };
    }
    async delete(id) {
        const department = await this.departmentRepository.findOne({
            where: { id },
            relations: ['subDepartments'],
        });
        if (!department) {
            throw new Error('Department not found');
        }
        if (department.subDepartments) {
            await Promise.all(department.subDepartments.map((subDepartment) => this.subdepartmentService.remove(subDepartment.id)));
        }
        await this.departmentRepository.remove(department);
        return {
            status: true,
            message: 'Department and its sub-departments deleted successfully',
        };
    }
    async findById(id) {
        return await this.findOne(id);
    }
};
exports.DepartmentService = DepartmentService;
exports.DepartmentService = DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        subdepartment_service_1.SubdepartmentService])
], DepartmentService);
//# sourceMappingURL=department.service.js.map