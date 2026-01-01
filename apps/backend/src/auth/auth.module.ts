import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Users from '../entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import Codes from '../entities/code.entity';
import { UniqueEmailPipe } from '../common/pipes/unique-email.pipe';
import { UniquePhonePipe } from '../common/pipes/unique-phone.pipe';
import { UserExistsByEmailPipe } from '../common/pipes/user-exists-by-email.pipe';
import { UserExistsByPhonePipe } from '../common/pipes/user-exists-by-phone.pipe';
import { PasswordValidationPipe } from '../common/pipes/password-validation.pipe';
import { OtpCodeValidationPipe } from '../common/pipes/otp-code-validation.pipe';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        const secret =
          configService.get<string>('JWT_SECRET') || 'default-jwt-secret';
        const expiresIn = configService.get<string>('JWT_EXPIRES_IN') || '1d';

        return {
          secret,
          signOptions: { expiresIn: expiresIn as any },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Users, Codes]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    JwtStrategy,
    UniqueEmailPipe,
    UniquePhonePipe,
    UserExistsByEmailPipe,
    UserExistsByPhonePipe,
    PasswordValidationPipe,
    OtpCodeValidationPipe,
  ],
})
export class AuthModule {}
