import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';

export const passwordValidator = new RegExp(
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
);

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Matches(passwordValidator, {
    message:
      'Password must have an uppercase letter, a lowercase letter and a number or symbol',
  })
  password: string;

  @Field()
  @IsPhoneNumber('NG')
  @IsNotEmpty()
  phoneNumber: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
  }
}
