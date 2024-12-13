import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { LoginResponse } from './types/types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async registerUser(
    @Args('registerUserDto') registerUserDto: RegisterUserDto,
  ): Promise<LoginResponse> {
    return this.authService.register(registerUserDto);
  }

  @Query(() => LoginResponse)
  async loginUser(
    @Args('loginUserDto') loginUserDto: LoginUserDto,
  ): Promise<LoginResponse> {
    return this.authService.login(loginUserDto);
  }
}
