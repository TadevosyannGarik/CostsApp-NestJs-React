// Создаем сервис AppService с помощью декоратора @Injectable
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    // Метод, который возвращает строку "Hello World!"
    getHello(): string {
        return 'Hello World!';
    }
    
    // Метод, который возвращает строку "My name is Garik"
    getProfile(): string{
        return 'My name is Garik'
    }
}

// Основной сервис для обработки бизнес-логики приложения.