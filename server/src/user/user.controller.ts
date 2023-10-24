import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

// Определяем контроллер и присваиваем ему базовый путь "user"
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // Обрабатываем HTTP POST запрос на пути "http://localhost:3001/api/user"
    @Post()
    // Используем ValidationPipe для валидации данных из тела запроса
    @UsePipes(new ValidationPipe())
    create(@Body() createUserDto: CreateUserDto) {
        // Вызываем метод create сервиса UserService и передаем данные из createUserDto
        return this.userService.create(createUserDto);
    }
}

// Контроллер для обработки запросов, связанных с пользователями.