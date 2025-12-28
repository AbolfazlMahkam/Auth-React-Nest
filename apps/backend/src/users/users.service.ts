import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Users from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  findUserByEmail = async (email: string) => {
    return await this.usersRepository.findOne({
      where: { email: email },
    });
  };

  findUserByEmailWithPassword = async (email: string) => {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  };

  findUserByPhone = async (phone: string) => {
    return await this.usersRepository.findOne({
      where: { phone: phone },
    });
  };

  findAll = async () => {
    return await this.usersRepository.find();
  };

  findUsersByRoles = async (roles: string[]) => {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.role IN (:...roles)', { roles })
      .getMany();
  };

  createUser = async (data: CreateUserDto) => {
    const user = this.usersRepository.create(data);
    await this.usersRepository.save(user);

    return user;
  };

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    Object.assign(user, updateUserDto);
    await this.usersRepository.save(user);

    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    await this.usersRepository.remove(user);

    return {
      message: 'User successfully deleted',
      id,
    };
  }
}
