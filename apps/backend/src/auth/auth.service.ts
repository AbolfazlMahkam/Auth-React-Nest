import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import Codes from '../entities/code.entity';
import { Repository } from 'typeorm';
import { LoginByOtpDto } from './dto/login-otp.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(Codes)
    private codeRepository: Repository<Codes>,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const existingEmail = await this.usersService.findUserByEmail(
        registerDto.email,
      );
      if (existingEmail) {
        throw new HttpException('Email already exists', 400);
      }

      const existingPhone = await this.usersService.findUserByPhone(
        registerDto.phone,
      );
      if (existingPhone) {
        throw new HttpException('Phone number already exists', 400);
      }

      const password = await bcrypt.hash(registerDto.password, 10);
      registerDto.password = password;
      registerDto.role = registerDto.role || 'user';
      return await this.usersService.createUser(registerDto);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findUserByEmailWithPassword(
      loginDto.email,
    );
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const isPasswordMath = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordMath) {
      throw new HttpException('Wrong Password', 400);
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    return { access_token: accessToken };
  }

  async loginByOtp(loginByOtpDto: LoginByOtpDto) {
    const user = await this.usersService.findUserByPhone(loginByOtpDto.phone);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (loginByOtpDto.code) {
      const checkCode = await this.codeRepository.findOne({
        where: {
          code: loginByOtpDto.code,
          phone: loginByOtpDto.phone,
          is_used: false,
        },
      });

      if (checkCode) {
        await this.codeRepository.update(checkCode, { is_used: true });
        const accessToken = this.jwtService.sign({
          sub: user.id,
          email: user.email,
          role: user.role,
        });
        return { access_token: accessToken };
      } else {
        throw new HttpException('code is not valid', 400);
      }
    } else {
      const otp = await this.generateOtpCode();
      await this.codeRepository.save({
        code: otp,
        phone: loginByOtpDto.phone,
      });
      return { code: otp };
    }
  }

  async generateOtpCode() {
    let code: number | null = null;
    while (!code) {
      const fourDigitCode = this.getRandomCode();
      const checkCode = await this.codeRepository.findOne({
        where: {
          code: fourDigitCode,
        },
      });

      if (!checkCode) {
        code = fourDigitCode;
        break;
      }
    }
    return code;
  }

  getRandomCode() {
    const min = 1000;
    const max = 9999;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;
    return otp;
  }

  async getProfile(userId: number) {
    const user = await this.usersService.findOne(userId);
    return user;
  }

  async loginWithGoogle(googleLoginDto: GoogleLoginDto) {
    try {
      // Initialize Google OAuth2 Client
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      // Verify the Google credential
      const ticket = await client.verifyIdToken({
        idToken: googleLoginDto.credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new HttpException('Invalid Google token', 401);
      }

      const { email, given_name, family_name, sub: googleId } = payload;

      // Validate that email is present
      if (!email) {
        throw new HttpException('Email not provided by Google', 401);
      }

      // Check if user exists
      let user = await this.usersService.findUserByEmail(email);

      // If user doesn't exist, create a new one
      if (!user) {
        user = await this.usersService.createUser({
          email,
          first_name: given_name || '',
          last_name: family_name || '',
          phone: '', // Google doesn't provide phone by default
          password: await bcrypt.hash(googleId, 10), // Use Google ID as password (user won't use it)
          role: 'user',
        });
      }

      // Generate JWT token
      const accessToken = this.jwtService.sign({
        sub: user.id,
        email: user.email,
        role: user.role,
      });

      return { access_token: accessToken };
    } catch (error) {
      console.error('Google login error:', error);
      throw new HttpException(
        error.message || 'Google authentication failed',
        401,
      );
    }
  }
}
