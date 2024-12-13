import { SubdepartmentService } from './subdepartment.service';
import { SubDepartment } from './entities/subdepartment.entity';
import { SubDepartmentDto } from './dto/create-subdepartment.dto';
import { UpdateSubDepartmentDto } from './dto/update-subdepartment.dto';
import { SuccessResponse } from './types/types';
export declare class SubdepartmentResolver {
    private readonly subdepartmentService;
    constructor(subdepartmentService: SubdepartmentService);
    createSubDepartment(subDepartmentDto: SubDepartmentDto): Promise<SubDepartment>;
    getAllSubDepartments(): Promise<SubDepartment[]>;
    getSubDepartment(id: string): Promise<SubDepartment>;
    updateSubDepartment(updateSubDepartmentDto: UpdateSubDepartmentDto): Promise<SubDepartment>;
    deleteSubDepartment(id: string): Promise<SuccessResponse>;
}
