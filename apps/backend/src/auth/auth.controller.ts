import { Controller, Post, Body, Get, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginByOtpDto } from './dto/login-otp.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { Public } from '../common/decorators/public.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';
import { UniqueEmailPipe } from '../common/pipes/unique-email.pipe';
import { UniquePhonePipe } from '../common/pipes/unique-phone.pipe';
import { UserExistsByEmailPipe } from '../common/pipes/user-exists-by-email.pipe';
import { UserExistsByPhonePipe } from '../common/pipes/user-exists-by-phone.pipe';
import { PasswordValidationPipe } from '../common/pipes/password-validation.pipe';
import { OtpCodeValidationPipe } from '../common/pipes/otp-code-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @UsePipes(UniqueEmailPipe, UniquePhonePipe)
  register(@Body() RegisterDto: RegisterDto) {
    return this.authService.register(RegisterDto);
  }

  @Public()
  @Post('login')
  @UsePipes(UserExistsByEmailPipe, PasswordValidationPipe)
  login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }

  @Public()
  @Post('login_otp')
  @UsePipes(UserExistsByPhonePipe, OtpCodeValidationPipe)
  loginByOtp(@Body() LoginByOtpDto: LoginByOtpDto) {
    return this.authService.loginByOtp(LoginByOtpDto);
  }

  @Public()
  @Post('google')
  loginWithGoogle(@Body() googleLoginDto: GoogleLoginDto) {
    return this.authService.loginWithGoogle(googleLoginDto);
  }

  @Get('me')
  async getProfile(@GetUser('id') userId: number) {
    return this.authService.getProfile(userId);
  }
}
