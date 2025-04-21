import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as data from '../../data.json'

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) private categoriesRepository: Repository<Category>) {}

    async addCategories(): Promise<void> {
        data.map(async (e) => {
            await this.categoriesRepository
            .createQueryBuilder()
            .insert()
            .into(Category)
            .values({name: e.category})
            .orIgnore()
            .execute()
        })
    }

    async createCategory(name: string): Promise<Category> {
        const category = this.categoriesRepository.create({ name });
        return await this.categoriesRepository.save(category);
    }

    async getCategories(): Promise<Category[]> {
        return await this.categoriesRepository.find();
    }

    async findCategoryByName(name: string): Promise<Category | null> {
        const category = await this.categoriesRepository.findOne({ where: { name } });
        return category
    }
}
