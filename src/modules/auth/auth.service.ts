import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/registerUser.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginCredentialsDto } from './dto/loginCredentials.dto';
import { LoginResponse } from './dto/loginCredentials.dto';
import { Role } from './roles/roles.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private readonly jwtService: JwtService
    ){}

    async login(credentials: LoginCredentialsDto): Promise<LoginResponse> {
        const { email, password } = credentials;
        const user = await this.usersRepository.findOneBy({ email });
        if (!user) {
            throw new UnauthorizedException('Credenciales incorrectas.');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales incorrectas.');
        }

        const userPayload = { 
            id: user.id, 
            email: user.email, 
            roles: [user.isAdmin ? Role.ADMIN : Role.USER]
        };

        const token = this.jwtService.sign(userPayload);

        return { success: 'Inicio de sesion exitoso, firma creada por 1 hora' , token }
    }

    async register(createUserDto: CreateUserDto): Promise<Omit<User, 'password' | 'id' | 'isAdmin'>> {
        const userExist = await this.usersRepository.findOneBy({ email: createUserDto.email });

        if (userExist) {
            throw new UnauthorizedException('El email ya esta registrado.');    
        }
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        
        const user = this.usersRepository.create(createUserDto);
        await this.usersRepository.save(user);

        const { password, isAdmin ,...userWithoutPassword } = user;
        return userWithoutPassword;
    }

}
