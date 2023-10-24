import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

// Описываем тесты для UserController
describe('UserController', () => {
    let controller: UserController;
    
    // Выполняется перед каждым тестом
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            // Регистрируем UserController как контроллер и UserService как провайдер
            controllers: [UserController],
            providers: [UserService],
        }).compile();

        // Извлекаем экземпляр UserController для каждого теста
        controller = module.get<UserController>(UserController);
    });
    
    // Тест: проверяем, что контроллер определен
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

// Тесты для контроллера пользователей.