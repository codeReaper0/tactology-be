import { Department } from '@/resources/department/entities/department.entity';
export declare class SubDepartment {
    id: string;
    name: string;
    department: Department;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
