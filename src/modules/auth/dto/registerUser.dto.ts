import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsInt, IsOptional, IsPositive, Matches, Max, Min } from 'class-validator';

export class CreateUserDto {
  /**
   * @description Emial del usuario
   * @example sashaletas@gmail.com
  */
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50, { message: 'El correo electrónico es demasiado largo' })
  email: string;
  /**
   * @description Nombre del usuario
   * @example 'Sasha Munevar'
  */
  @MinLength(3, { message: 'El nombre es demasiado corto' })
  @MaxLength(80, { message: 'El nombre es demasiado largo' })
  @IsString()
  @IsNotEmpty()
  name: string;
  /**
   * @description Contraseña del usuario
   * @example Sasha123!
  */
  @MinLength(8, { message: 'La contraseña es demasiado corta' })
  @MaxLength(20, { message: 'La contraseña es demasiado larga' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
  })
  password: string;
  @IsNotEmpty()
  @IsInt({ message: 'El número de teléfono debe ser un número entero.' })
  @IsPositive({ message: 'El número de teléfono debe ser un número positivo.' })
  @Min(1000000000, { message: 'El número de teléfono debe tener al menos 10 dígitos.' })
  @Max(9999999999, { message: 'El número de teléfono no debe tener más de 10 dígitos.' })
  phone: number;
  /**
   * @description Nombre del país en el que vive el usuario
   * @example Colombia
  */
  @IsString()
  @IsOptional()
  @MinLength(5, { message: 'El nombre del país es demasiado corto' })
  @MaxLength(20, { message: 'El nombre del país es demasiado largo' })
  country?: string;
  /**
   * @description Ciudad en la que vive el usuario
   * @example Bogota
  */
  @IsString()
  @IsOptional()
  @MinLength(5, { message: 'El nombre de la ciudad es demasiado corto' })
  @MaxLength(20, { message: 'El nombre de la ciudad es demasiado largo' })
  city?: string;
  /**
   * @description Dirección de la casa del usuario
   * @example 'Calle 123 # 45-67'
  */
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'La dirección es demasiado corta' })
  @MaxLength(80, { message: 'La dirección es demasiado larga' })
  address: string;
}