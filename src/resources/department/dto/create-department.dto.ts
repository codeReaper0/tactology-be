import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  MinLength,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SubDepartmentDto } from '@/resources/subdepartment/dto/create-subdepartment.dto';

@InputType()
export class CreateDepartmentDto {
  @Field()
  @IsString()
  @MinLength(2)
  name: string;

  @Field(() => [SubDepartmentDto], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubDepartmentDto)
  subDepartments?: SubDepartmentDto[];

  constructor(name: string, subDepartments?: SubDepartmentDto[]) {
    this.name = name;
    this.subDepartments = subDepartments;
  }
}
