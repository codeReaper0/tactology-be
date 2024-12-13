import { Module } from '@nestjs/common';
import { DepartmentResolver } from './department.resolver';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubdepartmentModule } from '../subdepartment/subdepartment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Department]), SubdepartmentModule],
  providers: [DepartmentResolver, DepartmentService],
  exports: [DepartmentService],
})
export class DepartmentModule {}
