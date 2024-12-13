import { Module } from '@nestjs/common';
import { SubdepartmentService } from './subdepartment.service';
import { SubdepartmentResolver } from './subdepartment.resolver';
import { SubDepartment } from './entities/subdepartment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubDepartment])],
  providers: [SubdepartmentService, SubdepartmentResolver],
  exports: [SubdepartmentService],
})
export class SubdepartmentModule {}
