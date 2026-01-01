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
export class UniquePhonePipe implements PipeTransform {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    // Only validate if the value has a phone property
    if (value && value.phone) {
      const existingPhone = await this.usersRepository.findOne({
        where: { phone: value.phone },
      });

      if (existingPhone) {
        throw new BadRequestException('Phone number already exists');
      }
    }

    return value;
  }
}
