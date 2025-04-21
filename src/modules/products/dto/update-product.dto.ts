import { IsString, MinLength, MaxLength, IsNumber, IsPositive, IsInt, IsUrl, IsOptional } from 'class-validator';

export class UpdateProductDto {
    @IsOptional()
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @MinLength(3, { message: 'El nombre es demasiado corto. Debe tener al menos 3 caracteres.' })
    @MaxLength(50, { message: 'El nombre es demasiado largo. No debe exceder los 100 caracteres.' })
    name?: string;

    @IsOptional()
    @IsString({ message: 'La descripción debe ser una cadena de texto.' })
    @MinLength(10, { message: 'La descripción es demasiado corta. Debe tener al menos 10 caracteres.' })
    @MaxLength(500, { message: 'La descripción es demasiado larga. No debe exceder los 1000 caracteres.' })
    description?: string;

    @IsOptional()
    @IsNumber({}, { message: 'El precio debe ser un número.' })
    @IsPositive({ message: 'El precio debe ser un número positivo.' })
    price?: number;

    @IsOptional()
    @IsInt({ message: 'El stock debe ser un número entero.' })
    @IsPositive({ message: 'El stock debe ser un número positivo.' })
    stock?: number;

    @IsOptional()
    @IsUrl({}, { message: 'La URL de la imagen debe ser una URL válida.' })
    imgUrl?: string;

    @IsOptional()
    @IsString({ message: 'La categoría debe ser una cadena de texto.' })
    @MinLength(3, { message: 'El nombre de la categoria es demasiado corto. Debe tener al menos 3 caracteres.' })
    @MaxLength(50, { message: 'El nombre de la categoria es demasiado largo. No debe exceder los 50 caracteres.' })
    category?: string;
}