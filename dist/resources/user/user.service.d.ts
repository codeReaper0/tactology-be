import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(user: User | CreateUserDto): Promise<User>;
    saveUser(user: User): Promise<User>;
    findAll(user: User): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    findOneBy(field: string, value: string): Promise<User>;
    getMe(user: User): Promise<User>;
}
