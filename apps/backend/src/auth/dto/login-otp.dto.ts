import { IsString, IsOptional, IsNumber } from 'class-validator';

export class LoginByOtpDto {
  @IsString()
  phone: string;
  @IsOptional()
  @IsNumber()
  code: number;
}
