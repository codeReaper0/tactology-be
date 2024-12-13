import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  MinLength,
  IsOptional,
  ValidateNested,
  IsArray,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateSubDepartmentDto } from '@/resources/subdepartment/dto/update-subdepartment.dto';

@InputType()
export class UpdateDepartmentDto {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @IsString()
  @MinLength(2)
  name: string;

  @Field(() => [UpdateSubDepartmentDto], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSubDepartmentDto)
  subDepartments?: UpdateSubDepartmentDto[];

  constructor(
    id: string,
    name: string,
    subDepartments?: UpdateSubDepartmentDto[],
  ) {
    this.id = id;
    this.name = name;
    this.subDepartments = subDepartments;
  }
}
