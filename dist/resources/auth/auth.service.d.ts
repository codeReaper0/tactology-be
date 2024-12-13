import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { LoginResponse } from './types/types';
import { UserService } from '../user/user.service';
import { GuardService } from '@/guard/guard.service';
export declare class AuthService {
    private readonly userService;
    private readonly guardService;
    constructor(userService: UserService, guardService: GuardService);
    register(registerUserDto: RegisterUserDto): Promise<LoginResponse>;
    login(loginUserDto: LoginUserDto): Promise<LoginResponse>;
    hashPassword(password: string): Promise<string>;
    comparePassword(suppliedPassword: string, storedPassword: string): Promise<boolean>;
}
