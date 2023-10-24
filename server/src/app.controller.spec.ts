import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Описываем блок тестов для AppController
describe('AppController', () => {
    // Объявляем переменную для хранения экземпляра AppController
    let appController: AppController;
    
    // Устанавливаем задачи, которые будут выполняться перед каждым тестом
    beforeEach(async () => {
        // Создаем тестовый модуль для AppController
        const app: TestingModule = await Test.createTestingModule({
            // Предоставляем AppController для тестирования
            controllers: [AppController],
            // Предоставляем AppService для тестирования
            providers: [AppService],
        }).compile();
        
        // Получаем экземпляр AppController из тестового модуля
        appController = app.get<AppController>(AppController);
    });

    // Описываем конкретный тест для конечной точки 'root'
    describe('root', () => {
        // Определяем ожидаемое поведение для данного теста
        it('should return "Hello World!"', () => {
            // Ожидаем, что вызов метода 'getHello' у appController вернет 'Hello World!'
            expect(appController.getHello()).toBe('Hello World!');
        });
    });
});

// Тесты для контроллера приложения.