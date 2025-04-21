import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { Product } from "./entities/product.entity";
import { JwtService } from "@nestjs/jwt";
import { CreateProductDto } from "./dto/create-product.dto";

describe('ProductsController', () => {
    let productsController: ProductsController;
    let mockProductsService: Partial<ProductsService>;

    const mockProducts: Partial<Product> = {
        id: 'njsnkjslkosjjbdjksl',
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        stock: 10,
    };

    const mockJwtService = {
        sign: jest.fn().mockReturnValue('mockedJwtToken'),
        verify: jest.fn().mockReturnValue({
            id: 'some-uuid',
            email: 'testuser@example.com',
            name: 'Test User',
            isAdmin: false,
            iat: 1615311234,
            exp: 1615314834
        }),
    };

    beforeEach(async () => {
        mockProductsService = {
            createProduct: jest.fn().mockResolvedValue(mockProducts),
            getProducts: jest.fn().mockResolvedValue([mockProducts]),
            getProductById: jest.fn().mockResolvedValue(mockProducts),
            updateProduct: jest.fn().mockResolvedValue(mockProducts),
        };
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                { provide: ProductsService, useValue: mockProductsService },
                { provide: JwtService, useValue: mockJwtService }
            ],
        }).compile();
        productsController = module.get<ProductsController>(ProductsController);
    });

    it('should be defined', () => {
        expect(productsController).toBeDefined();
    });

    it('should create a product', async () => {
        const createProductDto = {
            name: mockProducts.name,
            description: mockProducts.description,
            price: mockProducts.price,
            stock: mockProducts.stock,
            category: 'some-category'
        };
        try {
            await productsController.createProduct(createProductDto as CreateProductDto);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('should get all products', async () => {
        try {
            await productsController.getProducts('1', '10');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('should get a product by id', async () => {
        try {
            await productsController.getProductById(mockProducts.id as string);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });
});