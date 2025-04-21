import { IsUUID, IsNotEmpty, ValidateNested, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class ProductDto {
    @IsUUID('4', { message: 'El id del producto debe ser un UUID válido.' })
    id: string;
}

export class CreateOrderDto {
    @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido.' })
    @IsNotEmpty({ message: 'El ID del usuario no debe estar vacío.' })
    userId: string;

    @ArrayNotEmpty({ message: 'La lista de productos no debe estar vacía.' })
    @ValidateNested({ each: true })
    @Type(() => ProductDto)
    products: ProductDto[];
}