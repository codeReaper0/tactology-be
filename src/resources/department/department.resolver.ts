import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { PaginationsDto } from './dto/paginations.dto';
import { PaginateDepartment } from './types/types';
import { SuccessResponse } from '../subdepartment/types/types';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/guard/jwt-auth.guard';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Department)
  async createDepartment(
    @Args('createDepartmentDto') createDepartmentDto: CreateDepartmentDto,
  ) {
    return this.departmentService.create(createDepartmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Department)
  async updateDepartment(
    @Args('updateDepartmentDto') updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(updateDepartmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Department)
  async findOne(@Args('id') id: string) {
    return this.departmentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => PaginateDepartment)
  async findAll(@Args('query') query: PaginationsDto) {
    return this.departmentService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => SuccessResponse)
  async deleteDepartment(@Args('id') id: string) {
    return this.departmentService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Department)
  async findById(@Args('id') id: string) {
    return this.departmentService.findById(id);
  }
}
