import { IsString, IsNotEmpty, MinLength, MaxLength, IsNumber, IsPositive, IsInt, IsUrl, IsOptional } from 'class-validator';

export class CreateProductDto {
    /**
     * @description Nombre del producto
     * @example 'Guitarra eléctrica'
    */
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El nombre no debe estar vacío.' })
    @MinLength(3, { message: 'El nombre es demasiado corto. Debe tener al menos 3 caracteres.' })
    @MaxLength(50, { message: 'El nombre es demasiado largo. No debe exceder los 100 caracteres.' })
    name: string;

    /**
     * @description Descripción del producto
     * @example 'Guitarra electro acustica marca Taylor, color madera natural.'
    */
    @IsString({ message: 'La descripción debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'La descripción no debe estar vacía.' })
    @MinLength(10, { message: 'La descripción es demasiado corta. Debe tener al menos 10 caracteres.' })
    @MaxLength(500, { message: 'La descripción es demasiado larga. No debe exceder los 1000 caracteres.' })
    description: string;

    /**
     * @description Precio del producto
     * @example 1500.00
    */
    @IsNotEmpty({ message: 'El precio no debe estar vacio' })
    @IsNumber({}, { message: 'El precio debe ser un número.' })
    @IsPositive({ message: 'El precio debe ser un número positivo.' })
    price: number;

    /**
     * @description Cantidad de productos en stock
     * @example 10
    */
    @IsInt({ message: 'El stock debe ser un número entero.' })
    @IsNotEmpty({ message: 'El stock no debe estar vacio' })
    @IsPositive({ message: 'El stock debe ser un número positivo.' })
    stock: number;

    /**
     * @description URL de la imagen del producto
     * @example 'https://fotografiamejorparavendermas.com/wp-content/uploads/2017/06/La-importancia-de-la-imagen.jpg'
    */
    @IsOptional()
    @IsUrl({}, { message: 'La URL de la imagen debe ser una URL válida.' })
    imgUrl?: string;

    /**
     * @description Categoría a la que pertenece el producto
     * @example 'Instrumentos musicales'
    */
    @IsString({ message: 'La categoría debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'La categoría no debe estar vacía.' })
    @MinLength(3, { message: 'El nombre de la categoria es demasiado corto. Debe tener al menos 3 caracteres.' })
    @MaxLength(50, { message: 'El nombre de la categoria es demasiado larg0. No debe exceder los 50 caracteres.' })
    category: string;
}

