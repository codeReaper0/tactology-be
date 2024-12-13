import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Min, IsDate } from 'class-validator';

@InputType()
export class PaginationsDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page?: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  pageSize?: number;

  constructor(
    startDate?: Date,
    endDate?: Date,
    page?: number,
    pageSize?: number,
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.page = page;
    this.pageSize = pageSize;
  }
}
