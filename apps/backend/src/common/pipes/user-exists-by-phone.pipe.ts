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
export class UserExistsByPhonePipe implements PipeTransform {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    // Only validate if the value has a phone property
    if (value && value.phone) {
      const user = await this.usersRepository.findOne({
        where: { phone: value.phone },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Attach the loaded user to the DTO for service to use
      value._user = user;
    }

    return value;
  }
}
