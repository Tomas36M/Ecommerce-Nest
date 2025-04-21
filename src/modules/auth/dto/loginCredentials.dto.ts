import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export type LoginResponse = {    
    success: string;    
    token: string;
};

export class LoginCredentialsDto {
    /**
     * @description Emial del usuario
     * @example sashaletas@gmail.com
    */
    @IsEmail()
    @IsNotEmpty()
    email: string;
    /**
     * @description Contraseña del usuario
     * @example Sasha123!
    */
    @IsString()
    @IsNotEmpty()
    password: string;
}