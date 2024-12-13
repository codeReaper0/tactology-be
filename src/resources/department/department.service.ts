import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { SubdepartmentService } from '../subdepartment/subdepartment.service';
import { SuccessResponse } from '../subdepartment/types/types';
import { PaginationsDto } from './dto/paginations.dto';
import { getDateRangeCondition } from '@/utilities/date-range';
import { PaginateDepartment } from './types/types';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    private readonly subdepartmentService: SubdepartmentService,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const { name, subDepartments } = createDepartmentDto;

    const department = this.departmentRepository.create({ name });
    const savedDepartment = await this.departmentRepository.save(department);

    if (subDepartments && subDepartments.length > 0) {
      const subDepartmentEntities = subDepartments.map((subDept) =>
        this.subdepartmentService.create({
          ...subDept,
          departmentId: savedDepartment.id,
        }),
      );

      savedDepartment.subDepartments = await Promise.all(subDepartmentEntities);
    }

    return savedDepartment;
  }

  async update(updateDepartmentDto: UpdateDepartmentDto) {
    const { id, name, subDepartments } = updateDepartmentDto;

    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    department.name = name;

    if (subDepartments) {
      const subDepartmentEntities = await Promise.all(
        subDepartments.map(async (subDeptDto) => {
          if (subDeptDto.id) {
            return this.subdepartmentService.update({
              ...subDeptDto,
              departmentId: id,
            });
          } else {
            return this.subdepartmentService.create({
              ...subDeptDto,
              departmentId: id,
            });
          }
        }),
      );

      department.subDepartments = subDepartmentEntities;
    }

    return await this.departmentRepository.save(department);
  }

  async findOne(id: string): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new Error('Department not found');
    }

    return department;
  }

  async findAll(query: PaginationsDto): Promise<PaginateDepartment> {
    const { startDate, endDate, page = 1, pageSize = 10 } = query;

    const dateRangeCondition = getDateRangeCondition(startDate, endDate);

    const options: FindManyOptions<Department> = {
      where: {
        ...dateRangeCondition,
      },
      order: {
        name: 'ASC',
      },
      relations: ['subDepartments'],
    };

    const paginationOptions: IPaginationOptions = {
      limit: pageSize,
      page,
    };

    const paginatedData = await paginate<Department>(
      this.departmentRepository,
      paginationOptions,
      options,
    );

    return {
      data: paginatedData.items,
      count: paginatedData.meta.totalItems,
      currentPage: paginatedData.meta.currentPage,
      lastPage: paginatedData.meta.totalPages,
    };
  }

  async delete(id: string): Promise<SuccessResponse> {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new Error('Department not found');
    }

    if (department.subDepartments) {
      await Promise.all(
        department.subDepartments.map((subDepartment) =>
          this.subdepartmentService.remove(subDepartment.id),
        ),
      );
    }

    await this.departmentRepository.remove(department);

    return {
      status: true,
      message: 'Department and its sub-departments deleted successfully',
    };
  }

  async findById(id: string): Promise<Department> {
    return await this.findOne(id);
  }
}
