import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Order } from './entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { OrderDetail } from './entities/orderDetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order, OrderDetail, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
