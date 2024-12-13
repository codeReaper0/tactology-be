import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    getUser(getUserDto: GetUserDto): Promise<User>;
    getUsers(user: User): Promise<User[]>;
}
