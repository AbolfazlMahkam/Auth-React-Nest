import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // Only validate if the value has both password and _user properties
    if (value && value.password && value._user) {
      const isPasswordMatch = await bcrypt.compare(
        value.password,
        value._user.password,
      );

      if (!isPasswordMatch) {
        throw new BadRequestException('Wrong Password');
      }
    }

    return value;
  }
}
