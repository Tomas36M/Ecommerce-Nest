import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { OrderDetail } from "../../orders/entities/orderDetail.entity";
import { Category } from "../../categories/entities/category.entity";

@Entity({
    name: 'products'
})
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false
    })
    name: string;

    @Column({
        type: 'text',
        nullable: false
    })
    description: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number;

    @Column({
        type: 'int',
        nullable: false
    })
    stock: number;

    @Column({
        type: 'text',
        nullable: false,
        default: 'default-image-url.png'
    })
    img: string;

    @CreateDateColumn()
    createdAt: string;

    @ManyToMany(() => OrderDetail, orderDetail => orderDetail.products)    
    @JoinTable()    
    orderDetails: OrderDetail[];

    @ManyToOne(() => Category, category => category.products)    
    category: Category;
}