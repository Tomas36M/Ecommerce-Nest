import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  async getUserById(id: string): Promise<Omit<User, 'password' | 'isAdmin'>> {
    const user = await this.usersRepository.findOne({
      where: {
        id: id.toString()
      }
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }

    const { password, isAdmin,...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUsers(limit: string, page: string): Promise<{ currentPage: number; totalPages: number; limit: number; totalUsers: number; users: Omit<User, 'password' | 'isAdmin'>[]; }> {
    const users = await this.usersRepository.find();
    if (users.length === 0) {
      throw new NotFoundException('No hay usuarios agregados, porfavor agregar')
    }
    const numberPage = Math.max(Number(page) || 1, 1);
    const numberLimit = Math.max(Number(limit) || 5, 1);
    const start = (numberPage - 1) * numberLimit;
    const end = start + numberLimit;
    const paginatedUsers = users.slice(start, end);

    const usersWithoutPassword = paginatedUsers.map(user => {
      const { password, isAdmin, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return {
      currentPage: numberPage,
      totalPages: Math.ceil(users.length / numberLimit),
      limit: numberLimit,
      totalUsers: users.length,
      users: usersWithoutPassword
    }
  }


  async updateUser(id: string, updateUserDto: Partial<UpdateUserDto>): Promise<Omit<User, 'password' | 'isAdmin'> | null> {
    const user = await this.usersRepository.findOne({ where: { id: id.toString() } });
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`)
    }

    if(Object.keys(updateUserDto).length === 0){
      throw new NotFoundException('No hay datos para actualizar')
    }

    if(updateUserDto.password){
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);

    await this.usersRepository.save(user);

    const { password, isAdmin ,...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  deleteUser(id: string): string {
    const user = this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`)
    }
    this.usersRepository.delete(id);
    return `User with id ${id} deleted`;

  }
}
