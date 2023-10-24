import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Category } from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/category.service';

@Module({
    // Импортируем сущности для работы с базой данных
    imports: [TypeOrmModule.forFeature([Transaction, Category])],
    // Указываем контроллеры, доступные в этом модуле
    controllers: [TransactionController],
    // Указываем сервисы, которые будут использоваться в этом модуле
    providers: [TransactionService, CategoryService],
})
export class TransactionModule {}


// Модуль, связанный с транзакциями.