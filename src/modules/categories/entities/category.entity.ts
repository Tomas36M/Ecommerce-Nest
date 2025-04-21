import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity({
    name: 'categories'
})
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        unique: true
    })
    name: string;

    @OneToMany(() => Product, product => product.category)    
    products: Product[];
}