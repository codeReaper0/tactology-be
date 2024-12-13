import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubdepartmentService } from './subdepartment.service';
import { SubDepartment } from './entities/subdepartment.entity';
import { SubDepartmentDto } from './dto/create-subdepartment.dto';
import { UpdateSubDepartmentDto } from './dto/update-subdepartment.dto';
import { SuccessResponse } from './types/types';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/guard/jwt-auth.guard';

@Resolver(() => SubDepartment)
export class SubdepartmentResolver {
  constructor(private readonly subdepartmentService: SubdepartmentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => SubDepartment)
  async createSubDepartment(
    @Args('subDepartmentDto') subDepartmentDto: SubDepartmentDto,
  ): Promise<SubDepartment> {
    return this.subdepartmentService.create(subDepartmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [SubDepartment])
  async getAllSubDepartments(): Promise<SubDepartment[]> {
    return this.subdepartmentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => SubDepartment)
  async getSubDepartment(@Args('id') id: string): Promise<SubDepartment> {
    return this.subdepartmentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => SubDepartment)
  async updateSubDepartment(
    @Args('updateSubDepartmentDto')
    updateSubDepartmentDto: UpdateSubDepartmentDto,
  ): Promise<SubDepartment> {
    return this.subdepartmentService.update(updateSubDepartmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => SuccessResponse)
  async deleteSubDepartment(@Args('id') id: string): Promise<SuccessResponse> {
    return this.subdepartmentService.remove(id);
  }
}
