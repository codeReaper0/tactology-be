import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/guard/jwt-auth.guard';
import { CurrentUser } from '@/decorators/get-user-id.decorator';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  async createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { nullable: true })
  async getUser(@Args('getUserDto') getUserDto: GetUserDto) {
    return this.userService.findOne(getUserDto.id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [User])
  async getUsers(@CurrentUser() user: User) {
    return this.userService.findAll(user);
  }
}
