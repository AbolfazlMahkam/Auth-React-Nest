import {
  PipeTransform,
  Injectable,
  NotFoundException,
  ArgumentMetadata,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Users from '../../entities/user.entity';

@Injectable()
export class UserExistsPipe implements PipeTransform<number, Promise<Users>> {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async transform(value: number, metadata: ArgumentMetadata): Promise<Users> {
    const id = Number(value);

    if (isNaN(id)) {
      throw new NotFoundException('Invalid user ID');
    }

    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
