import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { PaginationsDto } from './dto/paginations.dto';
import { PaginateDepartment } from './types/types';
import { SuccessResponse } from '../subdepartment/types/types';
export declare class DepartmentResolver {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<Department>;
    updateDepartment(updateDepartmentDto: UpdateDepartmentDto): Promise<Department>;
    findOne(id: string): Promise<Department>;
    findAll(query: PaginationsDto): Promise<PaginateDepartment>;
    deleteDepartment(id: string): Promise<SuccessResponse>;
    findById(id: string): Promise<Department>;
}
