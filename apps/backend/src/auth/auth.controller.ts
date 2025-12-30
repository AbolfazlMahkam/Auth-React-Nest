import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginByOtpDto } from './dto/login-otp.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { Public } from '../common/decorators/public.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() RegisterDto: RegisterDto) {
    return this.authService.register(RegisterDto);
  }

  @Public()
  @Post('login')
  login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }

  @Public()
  @Post('login_otp')
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
