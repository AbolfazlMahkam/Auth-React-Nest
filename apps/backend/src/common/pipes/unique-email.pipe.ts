import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Users from '../../entities/user.entity';

@Injectable()
export class UniqueEmailPipe implements PipeTransform {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    // Only validate if the value has an email property
    if (value && value.email) {
      const existingEmail = await this.usersRepository.findOne({
        where: { email: value.email },
      });

      if (existingEmail) {
        throw new BadRequestException('Email already exists');
      }
    }

    return value;
  }
}
