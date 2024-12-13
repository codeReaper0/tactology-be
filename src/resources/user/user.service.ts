import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: User | CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.save(user);
    } catch (e) {
      const error = e as { code: string };
      if (error.code === '23505') {
        throw new BadRequestException(
          'Email address or phone number already exists',
        );
      } else {
        throw new InternalServerErrorException(e);
      }
    }
  }

  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findAll(user: User): Promise<User[]> {
    console.log({ user });
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async findOneBy(field: string, value: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { [field]: value },
    });
  }

  async getMe(user: User): Promise<User> {
    const found = await this.findOne(user.id);

    if (!found) {
      throw new NotFoundException('You are not a user');
    }

    return found;
  }
}
