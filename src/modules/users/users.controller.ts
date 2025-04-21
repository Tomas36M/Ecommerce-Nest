import { Controller, Get, Body, Patch, Param, Delete, Query, UseGuards, ParseUUIDPipe, NotFoundException} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { User } from './entities/user.entity';
import { Role } from '../auth/roles/roles.enum';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<Omit<User, 'password' | 'isAdmin'> | null> {
    return await this.usersService.getUserById(id);
  }

  @ApiBearerAuth()
  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async getUsers(
    @Query('page')
    limit: string,
    @Query('limit')
    page: string
  ):  Promise<{ currentPage: number; totalPages: number; limit: number; totalUsers: number; users: Omit<User, 'password' | 'isAdmin'>[]; }> {
    return await this.usersService.getUsers(page, limit);
  }

  @ApiBearerAuth()
  @Patch('update/:id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto): Promise<Omit<User, 'password' | 'isAdmin'> | null> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string): string {
    return this.usersService.deleteUser(id);
  }
}
