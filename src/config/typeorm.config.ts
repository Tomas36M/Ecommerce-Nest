import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../modules/users/entities/user.entity';
import { Product } from '../modules/products/entities/product.entity';
import { Order } from '../modules/orders/entities/order.entity';
import { OrderDetail } from '../modules/orders/entities/orderDetail.entity';
import { Category } from '../modules/categories/entities/category.entity';

export const TypeOrmConfig = TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Product, Order, OrderDetail, Category],
        synchronize: true,
        logging: false,
        dropSchema: true,
        ssl: {
            rejectUnauthorized: false,
        }
    }),
});