import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { LoginResponse } from './types/types';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(registerUserDto: RegisterUserDto): Promise<LoginResponse>;
    loginUser(loginUserDto: LoginUserDto): Promise<LoginResponse>;
}
