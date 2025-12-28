import { IsEmail, IsOptional } from 'class-validator';

export class LoginByOtpDto {
  @IsEmail()
  email: string;
  @IsOptional()
  code: number;
}
