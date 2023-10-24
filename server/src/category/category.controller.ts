import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthorGuard } from 'src/gurard/author.guard';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    // Создает новую категорию. Требуется аутентификация с использованием JWT.
    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    create(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
        return this.categoryService.create(createCategoryDto, req.user.id);
    }

    // Возвращает список всех категорий для текущего пользователя. Требуется аутентификация с использованием JWT.
    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() req ) {
        return this.categoryService.findAll(+req.user.id);
    }
    
    // Возвращает информацию о конкретной категории по её ID. Требуется аутентификация с использованием JWT и проверка на авторство категории.
    @Get(':type/:id')
    @UseGuards(JwtAuthGuard, AuthorGuard)
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne(+id);
    }

    // Обновляет информацию о категории по её ID. Требуется аутентификация с использованием JWT и проверка на авторство категории.
    @Patch(':type/:id')
    @UseGuards(JwtAuthGuard, AuthorGuard)
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(+id, updateCategoryDto);
    }

    // Удаляет категорию по её ID. Требуется аутентификация с использованием JWT и проверка на авторство категории.
    @Delete(':type/:id')
    @UseGuards(JwtAuthGuard, AuthorGuard)
    remove(@Param('id') id: string) {
        return this.categoryService.remove(+id);
    }
}

// Контроллер для обработки запросов, связанных с категориями.