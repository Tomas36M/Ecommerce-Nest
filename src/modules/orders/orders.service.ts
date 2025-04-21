import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/orderDetail.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        @InjectRepository(OrderDetail) private orderDetailsRepository: Repository<OrderDetail>,
        @InjectRepository(Product) private productsRepository: Repository<Product>
    ) { }

    async createOrder(userId: string, products: Product[]): Promise<Order | null> {

        let total = 0;
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`No se encontro el usuario con id: ${userId}`);
        }
        const order = new Order();
        order.user = user;

        const newOrder = await this.ordersRepository.save(order);

        const productsArray = await Promise.all(products.map(async (e: Product) => {
            const product = await this.productsRepository.findOne({ where: { id: e.id } });
            if (!product) {
                throw new NotFoundException(`No se encontro el producto con id: ${e.id}`);
            }
            total += Number(product.price);

            await this.productsRepository.update(
                { id: e.id },
                { stock: product.stock - 1 }
            );
            return product;
        }));

        const validProducts = productsArray.filter((product): product is Product => product !== null);

        const orderDetail = new OrderDetail();
        orderDetail.order = newOrder;
        orderDetail.products = validProducts;
        orderDetail.price = Number(total.toFixed(2));

        await this.orderDetailsRepository.save(orderDetail);

        return await this.ordersRepository.findOne({
            where: { id: newOrder.id },
            relations: ['orderDetails']
        });
    }

    async getOrderByID(id: string): Promise<Order | null> {
        const order = await this.ordersRepository.findOne({
            where: { id: id },
            relations: ['orderDetails', 'orderDetails.products']
        });
        if (!order) {
            throw new NotFoundException(`No se encontro la orden con id: ${id}`);
        }
        return order;
    }
}
