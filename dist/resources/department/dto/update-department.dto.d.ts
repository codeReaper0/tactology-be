import { UpdateSubDepartmentDto } from '@/resources/subdepartment/dto/update-subdepartment.dto';
export declare class UpdateDepartmentDto {
    id: string;
    name: string;
    subDepartments?: UpdateSubDepartmentDto[];
    constructor(id: string, name: string, subDepartments?: UpdateSubDepartmentDto[]);
}
