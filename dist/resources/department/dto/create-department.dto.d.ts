import { SubDepartmentDto } from '@/resources/subdepartment/dto/create-subdepartment.dto';
export declare class CreateDepartmentDto {
    name: string;
    subDepartments?: SubDepartmentDto[];
    constructor(name: string, subDepartments?: SubDepartmentDto[]);
}
