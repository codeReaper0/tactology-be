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
exports.SubdepartmentService = void 0;
const common_1 = require("@nestjs/common");
const subdepartment_entity_1 = require("./entities/subdepartment.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let SubdepartmentService = class SubdepartmentService {
    constructor(subDepartmentRepository) {
        this.subDepartmentRepository = subDepartmentRepository;
    }
    async create(subDepartmentDto) {
        const subDepartment = this.subDepartmentRepository.create({
            name: subDepartmentDto.name,
            department: { id: subDepartmentDto.departmentId },
        });
        return await this.subDepartmentRepository.save(subDepartment);
    }
    async findAll() {
        return await this.subDepartmentRepository.find({
            order: {
                name: 'ASC',
            },
        });
    }
    async findOne(id) {
        const subDepartment = await this.subDepartmentRepository.findOne({
            where: { id },
            relations: ['department'],
        });
        if (!subDepartment) {
            throw new common_1.NotFoundException(`SubDepartment with ID ${id} not found`);
        }
        return subDepartment;
    }
    async update(updateSubDepartmentDto) {
        const { id, name, departmentId } = updateSubDepartmentDto;
        const subDepartment = await this.findOne(id);
        subDepartment.name = name;
        if (departmentId) {
            subDepartment.department = { id: departmentId };
        }
        return await this.subDepartmentRepository.save(subDepartment);
    }
    async remove(id) {
        const result = await this.subDepartmentRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`SubDepartment with ID ${id} not found`);
        }
        return { status: true, message: 'SubDepartment deleted successfully' };
    }
};
exports.SubdepartmentService = SubdepartmentService;
exports.SubdepartmentService = SubdepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subdepartment_entity_1.SubDepartment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SubdepartmentService);
//# sourceMappingURL=subdepartment.service.js.map