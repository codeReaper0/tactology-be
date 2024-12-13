import { ObjectType, Field } from '@nestjs/graphql';

export interface Payload {
  id: string;
  firstName: string;
  lastName: string;
}

export interface UserAuth {
  user: Payload & {
    email: string;
  };
  accessToken: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;
}

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  state: string;

  @Field()
  city: string;

  @Field()
  country: string;

  @Field()
  phoneNumber: string;

  constructor(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    state: string,
    city: string,
    country: string,
    phoneNumber: string,
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.state = state;
    this.city = city;
    this.country = country;
    this.phoneNumber = phoneNumber;
  }
}
