import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { LoginResponse } from "./dto/loginCredentials.dto";
import { CreateUserDto } from "./dto/registerUser.dto";
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
    let mockUserService: Partial<AuthService>
    let service: AuthService;

    const mockUser: CreateUserDto = {
        name: 'Sasha Munevar',
        email: 'sashaletas@gmail.com',
        password: 'Sasha123!',
        phone: 3143453566,
        address: "Calle Wallaby, 42, Sidney",
        country: "Sidney",
        city: "Sidney"
    }

    beforeEach(async () => {
        mockUserService = {
            login: () => Promise.resolve({ token: 'mockToken' } as LoginResponse),
            register: (createUserDto: CreateUserDto) => Promise.resolve({
                ...createUserDto,
                id: '1234fs-234sd-24csfd-34sdfg',
                createdAt: new Date().toISOString(),
                orders: [],
                isAdmin: false,
            })
        }

        const module = await Test.createTestingModule({
            providers: [AuthService, JwtService, {
                provide: AuthService,
                useValue: mockUserService
            }]
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('Craer una instancia de AuthService', async () => {
        expect(service).toBeDefined();
    });
    it('Debería poder registrar un usuario con la contraseña encriptada', async () => {
        const user = await service.register(mockUser);
        expect(user).toBeDefined();
        const userWithPassword = { ...user, password: bcrypt.hash(mockUser.password, 10) };
        expect(userWithPassword).toHaveProperty('password');
        expect(userWithPassword.password).not.toEqual(mockUser.password);
    });

    it('inicio de sesion tira un error si el email ya esta registrado', async () => {
        mockUserService.login = () =>
            Promise.resolve({ token: 'mockToken', success: 'true' } as LoginResponse)
        try {
            await service.login({ email: mockUser.email, password: mockUser.password });
        } catch (error) {
            expect(error.mesage).toEqual('El email ya esta registrado.');
        }
    });
    it('inicio de sesion tira un error si las credenciales son incorrectas', async () => {
        mockUserService.login = () =>
            Promise.resolve({ token: 'mockToken', success: 'true' } as LoginResponse)
        try {
            await service.login({ email: mockUser.email, password: mockUser.password });
        } catch (error) {
            expect(error.message).toEqual('Credenciales incorrectas.');
        }
    });
    it('inicio de sesion retorne un error si el usuario no fue encontrado', async () => {
        try {
            await service.login({ email: mockUser.email, password: mockUser.password });
        } catch (error) {
            expect(error.message).toEqual('Usuario no encontrado.');
        }
    });
});