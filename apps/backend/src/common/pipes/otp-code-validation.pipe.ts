import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Codes from '../../entities/code.entity';

@Injectable()
export class OtpCodeValidationPipe implements PipeTransform {
  constructor(
    @InjectRepository(Codes)
    private readonly codeRepository: Repository<Codes>,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    // Only validate if the value has both code and phone properties
    if (value && value.code && value.phone) {
      const checkCode = await this.codeRepository.findOne({
        where: {
          code: value.code,
          phone: value.phone,
          is_used: false,
        },
      });

      if (!checkCode) {
        throw new BadRequestException('code is not valid');
      }

      // Attach the validated code to the DTO for service to use
      value._validatedCode = checkCode;
    }

    return value;
  }
}
