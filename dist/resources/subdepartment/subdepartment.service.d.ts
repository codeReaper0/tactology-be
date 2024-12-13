import { SubDepartment } from './entities/subdepartment.entity';
import { Repository } from 'typeorm';
import { SubDepartmentDto } from './dto/create-subdepartment.dto';
import { UpdateSubDepartmentDto } from './dto/update-subdepartment.dto';
import { SuccessResponse } from './types/types';
export declare class SubdepartmentService {
    private subDepartmentRepository;
    constructor(subDepartmentRepository: Repository<SubDepartment>);
    create(subDepartmentDto: SubDepartmentDto): Promise<SubDepartment>;
    findAll(): Promise<SubDepartment[]>;
    findOne(id: string): Promise<SubDepartment>;
    update(updateSubDepartmentDto: UpdateSubDepartmentDto): Promise<SubDepartment>;
    remove(id: string): Promise<SuccessResponse>;
}
