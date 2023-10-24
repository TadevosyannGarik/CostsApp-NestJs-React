import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { TransactionService } from 'src/transaction/transaction.service';

@Module({
    imports: [TypeOrmModule.forFeature([Category, Transaction])],
    // Контроллеры, отвечающие за обработку запросов категорий.
    controllers: [CategoryController],
    // Сервисы, предоставляющие бизнес-логику для работы с категориями.
    providers: [CategoryService, TransactionService],
})
export class CategoryModule {}


// Модуль, связанный с категориями.