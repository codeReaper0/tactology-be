import { Field, ObjectType } from '@nestjs/graphql';
import { Department } from '../entities/department.entity';

@ObjectType()
export class PaginateDepartment {
  @Field(() => [Department])
  data: Department[];

  @Field()
  count: number;

  @Field()
  currentPage: number;

  @Field()
  lastPage: number;
}
