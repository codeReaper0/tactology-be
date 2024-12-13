import { Department } from '../entities/department.entity';
export declare class PaginateDepartment {
    data: Department[];
    count: number;
    currentPage: number;
    lastPage: number;
}
