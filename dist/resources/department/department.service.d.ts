import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { SubdepartmentService } from '../subdepartment/subdepartment.service';
import { SuccessResponse } from '../subdepartment/types/types';
import { PaginationsDto } from './dto/paginations.dto';
import { PaginateDepartment } from './types/types';
export declare class DepartmentService {
    private departmentRepository;
    private readonly subdepartmentService;
    constructor(departmentRepository: Repository<Department>, subdepartmentService: SubdepartmentService);
    create(createDepartmentDto: CreateDepartmentDto): Promise<Department>;
    update(updateDepartmentDto: UpdateDepartmentDto): Promise<Department>;
    findOne(id: string): Promise<Department>;
    findAll(query: PaginationsDto): Promise<PaginateDepartment>;
    delete(id: string): Promise<SuccessResponse>;
    findById(id: string): Promise<Department>;
}
