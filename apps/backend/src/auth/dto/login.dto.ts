import { IsEmail, IsNotEmpty } from 'class-validator';
import Users from '../../entities/user.entity';

export class LoginDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;

  // Populated by UserExistsByEmailPipe
  _user?: Users;
}
