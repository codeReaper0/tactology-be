import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SuccessResponse {
  @Field()
  status: boolean;

  @Field()
  message: string;
}
