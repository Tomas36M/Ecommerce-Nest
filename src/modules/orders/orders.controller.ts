import { Body, Controller, Post, Get, Param, ParseUUIDPipe, ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Product } from '../products/entities/product.entity';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order | null> {
    const { userId, products } = createOrderDto;
    const orderProducts = products.map(productDto => {
      const product = new Product();
      product.id = productDto.id;
      return product;
    });
    return this.ordersService.createOrder(userId, orderProducts);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  getOrderById(@Param('id', ParseUUIDPipe) id: string): Promise<Order | null> {
    return this.ordersService.getOrderByID(id);
  }
}
