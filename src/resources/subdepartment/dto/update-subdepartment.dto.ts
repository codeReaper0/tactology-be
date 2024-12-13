import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUUID, MinLength, IsOptional } from 'class-validator';

@InputType()
export class UpdateSubDepartmentDto {
  @Field()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @IsString()
  @MinLength(2)
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  departmentId?: string;

  constructor(id: string, name?: string, departmentId?: string) {
    this.id = id;
    this.name = name;
    this.departmentId = departmentId;
  }
}
