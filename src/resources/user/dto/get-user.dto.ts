import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class GetUserDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
