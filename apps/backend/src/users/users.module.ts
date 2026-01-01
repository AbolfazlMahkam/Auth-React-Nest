import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Users from '../entities/user.entity';
import { UniqueEmailPipe } from '../common/pipes/unique-email.pipe';
import { UniquePhonePipe } from '../common/pipes/unique-phone.pipe';
import { UserExistsPipe } from '../common/pipes/user-exists.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, UniqueEmailPipe, UniquePhonePipe, UserExistsPipe],
})
export class UsersModule {}
