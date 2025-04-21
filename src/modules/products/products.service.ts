import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import * as data from '../../data.json'
import { CategoriesService } from '../categories/categories.service';
import { FilesService } from '../files/files.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
    private readonly filesService: FilesService
  ){}

  async addProducts(): Promise<void> {
    for (const e of data) {
      
      let category = await this.categoriesService.findCategoryByName(e.category);
      
      if (!category) {
        category = await this.categoriesService.createCategory(e.category);
      }

      const product = new Product();
      product.name = e.name;
      product.price = e.price;
      product.description = e.description;
      product.stock = e.stock;
      product.category = category;
      product.img = e.imgUrl;
      
      
      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(product)
        .orUpdate(['price', 'description', 'stock', 'img'], ['name'])
        .execute();
    }
  }

  async createProduct(createProductDto: CreateProductDto, file?: Express.Multer.File): Promise<Product> {
5
    const productExist = await this.productsRepository.findOne({where: {name: createProductDto.name}});
    if (productExist) {
      throw new NotFoundException(`El producto ${createProductDto.name} ya existe`);
    }
    
    let category = await this.categoriesService.findCategoryByName(createProductDto.category);

    if (!category) {
        category = await this.categoriesService.createCategory(createProductDto.category);
    }
    
    let img = createProductDto.imgUrl;
    if (file) {
        const image = await this.filesService.uploadProductImage(file);
        img = image.secure_url;
    }

    const product = this.productsRepository.create({
        name: createProductDto.name,
        price: createProductDto.price,
        description: createProductDto.description,
        stock: createProductDto.stock,
        category: category,
        img: img,
    });

    return await this.productsRepository.save(product);
}

  async getProducts(limit: string, page: string): Promise<{currentPage: number, totalPages: number, limit: number, totalProducts: number, products: Product[]}> {
    const products = await this.productsRepository.find();
    if(products.length === 0){
      throw new NotFoundException('No hay productos agregados, porfavor agrega productos.')
    }
    const numberPage = Math.max(+page || 1, 1);
    const numberLimit = Math.max(+limit || 5, 1);
    const start = (numberPage - 1) * numberLimit;
    const end = start + numberLimit;
    const paginatedProducts = products.slice(start, end);
    const totalPages = Math.ceil(products.length / numberLimit);

    return {               
      currentPage: numberPage,        
      totalPages,        
      limit: numberLimit,        
      totalProducts: products.length,
      products: paginatedProducts  
    };
  }

  async getProductById(id: string): Promise<Product | null | string> {
    const product = await this.productsRepository.findOne({where: {id}});
    if (!product) {
      throw new NotFoundException(`No se encontro el producto con id: ${id}`)
    }
    return product;

  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto, file?: Express.Multer.File): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
        throw new NotFoundException(`No se encontró el producto con id: ${id}`);
    }

    if(Object.keys(updateProductDto).length === 0){
      throw new NotFoundException('No hay datos para actualizar')
    }

    let category = updateProductDto.category ? await this.categoriesService.findCategoryByName(updateProductDto.category) : undefined;
    if (!category && updateProductDto.category) {
        category = await this.categoriesService.createCategory(updateProductDto.category);
    }

    if(file){
      await this.filesService.updateProductImage(file, product.id);
    }

    Object.assign(product, {
        ...updateProductDto,
        ...(category && { category }),
    });

    await this.productsRepository.save(product);
    return product;
}

  async deleteProduct(id: string): Promise<string> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`No se encontro el producto con id: ${id}`)
    }
    await this.productsRepository.delete(id);
    return 'Product deleted';
  }
}
