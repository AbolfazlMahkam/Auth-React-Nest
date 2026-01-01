import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';
import { UniqueEmailPipe } from '../common/pipes/unique-email.pipe';
import { UniquePhonePipe } from '../common/pipes/unique-phone.pipe';
import { UserExistsPipe } from '../common/pipes/user-exists.pipe';
import Users from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('admin', 'super_admin')
  @UsePipes(UniqueEmailPipe, UniquePhonePipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // IMPORTANT: Specific routes must come BEFORE parameterized routes
  @Get('admins/list')
  @Roles('super_admin')
  async findAdmins() {
    return await this.usersService.findUsersByRoles(['admin', 'super_admin']);
  }

  @Get()
  @Roles('admin', 'super_admin')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', UserExistsPipe) user: Users,
    @GetUser('id') userId: number,
  ) {
    // Users can view their own profile or admins can view any profile
    return user;
  }

  @Patch(':id')
  update(
    @Param('id', UserExistsPipe) user: Users,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser('id') userId: number,
  ) {
    // Users can update their own profile or admins can update any profile
    return this.usersService.update(user, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin', 'super_admin')
  remove(@Param('id', UserExistsPipe) user: Users) {
    return this.usersService.remove(user);
  }
}
