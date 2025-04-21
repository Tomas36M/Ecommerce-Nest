import { Module, OnModuleInit } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { EnvConfig } from './config/env.config';
import { TypeOrmConfig } from './config/typeorm.config';
import { OrdersModule } from './modules/orders/orders.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { FilesModule } from './modules/files/files.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductsService } from './modules/products/products.service';
import { CategoriesService } from './modules/categories/categories.service';

@Module({
  imports: [
    EnvConfig,
    TypeOrmConfig,
    UsersModule,
    ProductsModule,
    AuthModule,
    OrdersModule,
    CategoriesModule,
    FilesModule,
    JwtModule.register({
      global: true,
      signOptions: {expiresIn: '1h'},
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit { 
  constructor(
    private readonly productService: ProductsService,
    private readonly categoryService: CategoriesService
  ){}

  async onModuleInit() {
    await this.categoryService.addCategories();
    await this.productService.addProducts();
    console.log('Seeders runned, products and categories added');
  }
}
