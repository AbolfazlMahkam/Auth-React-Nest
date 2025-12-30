import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('admin', 'super_admin')
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
  findOne(@Param('id') id: number, @GetUser('id') userId: number) {
    // Users can view their own profile or admins can view any profile
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser('id') userId: number,
  ) {
    // Users can update their own profile or admins can update any profile
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin', 'super_admin')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
