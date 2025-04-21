import { IsEmail, IsString, MinLength, MaxLength, IsInt, IsOptional, IsPositive, Matches, Max, Min } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail({}, { message: 'El formato del correo electrónico no es válido.' })
    @MaxLength(50, { message: 'El correo electrónico es demasiado largo.' })
    email?: string;

    @IsOptional()
    @MinLength(3, { message: 'El nombre es demasiado corto.' })
    @MaxLength(80, { message: 'El nombre es demasiado largo.' })
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    name?: string;

    @IsOptional()
    @MinLength(8, { message: 'La contraseña es demasiado corta.' })
    @MaxLength(15, { message: 'La contraseña es demasiado larga.' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {    
      message: 'La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',  
    })
    password?: string;

    @IsOptional()
    @IsInt({ message: 'El número de teléfono debe ser un número entero.' })  
    @IsPositive({ message: 'El número de teléfono debe ser un número positivo.' })  
    @Min(1000000000, { message: 'El número de teléfono debe tener al menos 10 dígitos.' })  
    @Max(9999999999, { message: 'El número de teléfono no debe tener más de 10 dígitos.' })  
    @Matches(/^\d{10}$/, { message: 'El número de teléfono debe consistir en exactamente 10 dígitos.' })
    phone?: number;

    @IsOptional()
    @IsString({ message: 'El nombre del país debe ser una cadena de texto.' })
    @MinLength(5, { message: 'El nombre del país es demasiado corto.' })
    @MaxLength(20, { message: 'El nombre del país es demasiado largo.' })
    country?: string;

    @IsOptional()
    @IsString({ message: 'El nombre de la ciudad debe ser una cadena de texto.' })
    @MinLength(5, { message: 'El nombre de la ciudad es demasiado corto.' })
    @MaxLength(20, { message: 'El nombre de la ciudad es demasiado largo.' })
    city?: string;

    @IsOptional()
    @IsString({ message: 'La dirección debe ser una cadena de texto.' })
    @MinLength(3, { message: 'La dirección es demasiado corta.' })
    @MaxLength(80, { message: 'La dirección es demasiado larga.' })
    address?: string;
}