import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Определение функции, которая запустит наше приложение
async function bootstrap() {
    // Создаем экземпляр приложения, связанный с модулем AppModule
    const app = await NestFactory.create(AppModule);
    // Устанавливаем префикс для всех наших маршрутов как "api"
    app.setGlobalPrefix("api");
    // Включаем CORS (Cross-Origin Resource Sharing), чтобы разрешить запросы с других источников
    app.enableCors();
    // Начинаем слушать запросы на порту 3001
    await app.listen(3001);
}
// Вызываем функцию bootstrap для запуска нашего приложения
bootstrap();

// Главный файл для запуска вашего приложения.