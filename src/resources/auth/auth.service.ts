import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { LoginResponse, Payload } from './types/types';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { GuardService } from '@/guard/guard.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly guardService: GuardService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<LoginResponse> {
    const { firstName, lastName, email, password, phoneNumber } =
      registerUserDto;

    const userEmail = email.toLowerCase();

    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = userEmail;
    newUser.password = await this.hashPassword(password);
    newUser.phoneNumber = phoneNumber;

    const savedUser = await this.userService.create(newUser);

    const payload: Payload = {
      id: savedUser.id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
    };

    const accessToken = this.guardService.generateToken(payload);

    return {
      accessToken,
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    const { email, password } = loginUserDto;

    const userEmail = email.toLowerCase();

    const user = await this.userService.findOneByEmail(userEmail);

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const valid = await this.comparePassword(password, user.password);

    if (!valid) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const payload: Payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const accessToken = this.guardService.generateToken(payload);

    return {
      accessToken,
    };
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async comparePassword(
    suppliedPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(suppliedPassword, storedPassword);
    return isMatch;
  }
}
