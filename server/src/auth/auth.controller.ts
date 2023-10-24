import {  Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/loacl-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    // Определяет POST-маршрут для аутентификации пользователя
    @Post("login")
    // Использует локальную стратегию аутентификации
    @UseGuards(LocalAuthGuard)
    // Обрабатывает запрос на вход пользователя
    async login(@Request() req) {
        // Использует сервис аутентификации для входа и возвращает результат
        return this.authService.login(req.user)
    }

    // Определяет GET-маршрут для получения профиля пользователя
    @Get("profile") 
    // Использует JWT-стража для аутентификации
    @UseGuards(JwtAuthGuard)
    // Возвращает профиль пользователя
    getProfile(@Request() req) {
        // Возвращает информацию о текущем пользователе
        return req.user;
    }
}


// Контроллер для обработки запросов аутентификации.