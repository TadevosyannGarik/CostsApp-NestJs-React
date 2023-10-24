import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Определяем, что этот контроллер обрабатывает корневой маршрут
@Controller()
export class AppController {
    // Инициализируем сервис в конструкторе контроллера
    constructor(private readonly appService: AppService) {}
    
    // Определяем, что этот метод обрабатывает GET-запросы к корневому маршруту
    @Get()
    getHello(): string {
        // Возвращаем результат вызова метода getHello() из сервиса
        return this.appService.getHello();
    }

    // Определяем, что этот метод обрабатывает GET-запросы к маршруту "/profile"
    @Get("/profile")
    getProfile(): string{
        // Возвращаем результат вызова метода getProfile() из сервиса
        return this.appService.getProfile();
    }
}


// Основной контроллер для обработки запросов в приложении.