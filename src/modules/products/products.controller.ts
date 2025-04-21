import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.createProduct(createProductDto);
  }

  @Get()
  async getProducts(
    @Query('page')
    limit: string,
    @Query('limit')
    page: string
  ): Promise<{currentPage: number, totalPages: number, limit: number, totalProducts: number, products: Product[]}> {
    return await this.productsService.getProducts(page, limit);
  }

  @Get('seeder')
  async addProducts(): Promise<string> {
    await this.productsService.addProducts();
    return 'Products added';
  }

  @Get(':id')
  async getProductById(@Param('id', ParseUUIDPipe) id: string): Promise<Product | null | string> {
    return await this.productsService.getProductById(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return await this.productsService.updateProduct(id, updateProductDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
