import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        ) {}

        // Метод для создания новой категории для пользователя.
        async create(createCategoryDto: CreateCategoryDto, id: number) {
            const existingCategory = await this.categoryRepository.findOne({
                where: {
                    user: { id },
                    title: createCategoryDto.title,
                },
            });
        
            if (existingCategory) {
                throw new BadRequestException("This category already exists!");
            }
        
            const newCategory = {
                title: createCategoryDto.title,
                user: {
                    id,
                },
            };
        
            return await this.categoryRepository.save(newCategory);
        }

        // Метод для получения всех категорий пользователя.
        async findAll(id: number) {
            return await this.categoryRepository.find({
                where: {
                    user: {id}
                },
                relations: {
                    transactions: true
                },
            })
        }

        // Метод для получения информации о конкретной категории.
        async findOne(id: number) {
            const category = await this.categoryRepository.findOne({
                where: {id},
                relations: {
                    user: true,
                transactions: true
            },
        })
        
        if(!category) throw new NotFoundException("Category not found")
        return category
    }

    // Метод для обновления информации о категории.
    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.categoryRepository.findOne({
            where: {id},
        })
    
        if (!category) throw new NotFoundException("Category not found")
        return await this.categoryRepository.update(id, updateCategoryDto);
    }

    // Метод для удаления категории.
    async remove(id: number) {
        const category = await this.categoryRepository.findOne({
        where: {id}
        })
    
        if (!category) throw new NotFoundException("Category not found")
        return await this.categoryRepository.delete(id)
    }
}

// Сервис для работы с категориями.