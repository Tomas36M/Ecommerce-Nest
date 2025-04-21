import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm";
import { Order } from "../../orders/entities/order.entity";

@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column(
        {
            type: 'varchar',
            length: 50,
            nullable: false,
            unique: true
        }
    )
    email: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    password: string;

    @Column({
        type: 'bigint'
    })
    phone: number;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true
    })
    country?: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true
    })
    city?: string;

    @Column({
        type: 'text'
    })
    address: string;

    @Column({
        type: 'boolean',
        default: false
    })
    isAdmin: boolean;

    @CreateDateColumn()
    createdAt: string;

    @OneToMany(() => Order, order => order.user)    
    orders: Order[];
}