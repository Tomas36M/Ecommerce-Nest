import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialsDto, LoginResponse } from './dto/loginCredentials.dto';
import { CreateUserDto } from './dto/registerUser.dto';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() credentialsDto: LoginCredentialsDto): Promise<LoginResponse> {
    return this.authService.login(credentialsDto);
  }

  @Post('register')
  register(@Body() userData: CreateUserDto): Promise<Omit<User, 'password' | 'id' | 'isAdmin'>> {
    return this.authService.register(userData);
  }

}
