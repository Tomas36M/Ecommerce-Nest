import { PrimaryGeneratedColumn, CreateDateColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderDetail } from './orderDetail.entity';

@Entity({
    name: 'orders'
})
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: string;

    @ManyToOne(() => User, user => user.orders) 
    user: User;

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.order, { cascade: true })    
    orderDetails: OrderDetail[]; 
}