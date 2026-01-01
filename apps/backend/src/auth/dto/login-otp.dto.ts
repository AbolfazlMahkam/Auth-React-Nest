import { IsString, IsOptional, IsNumber } from 'class-validator';
import Users from '../../entities/user.entity';
import Codes from '../../entities/code.entity';

export class LoginByOtpDto {
  @IsString()
  phone: string;
  @IsOptional()
  @IsNumber()
  code: number;

  // Populated by UserExistsByPhonePipe
  _user?: Users;
  // Populated by OtpCodeValidationPipe
  _validatedCode?: Codes;
}
