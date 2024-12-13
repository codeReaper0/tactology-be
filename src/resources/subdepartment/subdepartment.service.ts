import { Injectable, NotFoundException } from '@nestjs/common';
import { SubDepartment } from './entities/subdepartment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubDepartmentDto } from './dto/create-subdepartment.dto';
import { UpdateSubDepartmentDto } from './dto/update-subdepartment.dto';
import { SuccessResponse } from './types/types';
import { Department } from '../department/entities/department.entity';

@Injectable()
export class SubdepartmentService {
  constructor(
    @InjectRepository(SubDepartment)
    private subDepartmentRepository: Repository<SubDepartment>,
  ) {}

  async create(subDepartmentDto: SubDepartmentDto): Promise<SubDepartment> {
    const subDepartment = this.subDepartmentRepository.create({
      name: subDepartmentDto.name,
      department: { id: subDepartmentDto.departmentId },
    });
    return await this.subDepartmentRepository.save(subDepartment);
  }

  async findAll(): Promise<SubDepartment[]> {
    return await this.subDepartmentRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<SubDepartment> {
    const subDepartment = await this.subDepartmentRepository.findOne({
      where: { id },
      relations: ['department'],
    });

    if (!subDepartment) {
      throw new NotFoundException(`SubDepartment with ID ${id} not found`);
    }

    return subDepartment;
  }

  async update(
    updateSubDepartmentDto: UpdateSubDepartmentDto,
  ): Promise<SubDepartment> {
    const { id, name, departmentId } = updateSubDepartmentDto;

    const subDepartment = await this.findOne(id);

    subDepartment.name = name;

    if (departmentId) {
      subDepartment.department = { id: departmentId } as unknown as Department;
    }

    return await this.subDepartmentRepository.save(subDepartment);
  }

  async remove(id: string): Promise<SuccessResponse> {
    const result = await this.subDepartmentRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`SubDepartment with ID ${id} not found`);
    }

    return { status: true, message: 'SubDepartment deleted successfully' };
  }
}
