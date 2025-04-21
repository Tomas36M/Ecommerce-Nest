import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';

@Entity({
    name: 'order_details'
})
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number;

    @ManyToMany(() => Product, product => product.orderDetails)    
    products: Product[];

    @ManyToOne(() => Order, order => order.orderDetails)    
    order: Order; 
}