import { SubDepartment } from '@/resources/subdepartment/entities/subdepartment.entity';
export declare class Department {
    id: string;
    name: string;
    subDepartments?: SubDepartment[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
