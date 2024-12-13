import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUUID, MinLength, IsOptional } from 'class-validator';

@InputType()
export class SubDepartmentDto {
  @Field({ nullable: true })
  @IsString()
  @MinLength(2)
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  departmentId?: string;

  constructor(name?: string, departmentId?: string) {
    this.name = name;
    this.departmentId = departmentId;
  }
}
