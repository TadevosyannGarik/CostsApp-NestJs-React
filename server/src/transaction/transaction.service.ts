import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        ) {}
    
    // Создание новой транзакции для указанного пользователя
    async create(createTransactionDto: CreateTransactionDto, id: number) {
        // Подготавливаем данные для новой транзакции
        const newTransaction = {
            title: createTransactionDto.title,
            amount: createTransactionDto.amount,
            type: createTransactionDto.type,
            category: {id: +createTransactionDto.category},
            user: {id},
        } 
        
        // Проверяем данные и сохраняем новую транзакцию
        if(!newTransaction) throw new BadRequestException("Something went wrong...")
        return await this.transactionRepository.save(newTransaction)
    }
    
    // Получение всех транзакций пользователя
    async findAll(id: number) {
        const transactions = await this.transactionRepository.find({
            where: {
                user: {id},
            },
            relations: {
                category: true
            },
            order: {
                createdAt: "DESC"
            }
        })
        return transactions ;
    }

    // Получение транзакции по ID
    async findOne(id: number) {
        const transaction = await this.transactionRepository.findOne({
            where: {id},
            relations: {
                user: true,
                category: true
            }
        })
        // Проверяем, найдена ли транзакция
        if(!transaction) throw new NotFoundException("Transaction not found")
        return transaction;
    }

    // Обновление информации о транзакции
    async update(id: number, updateTransactionDto: UpdateTransactionDto) {
        const transaction = await this.transactionRepository.findOne({
            where: {id},
        })
        
        // Проверяем, найдена ли транзакция
        if(!transaction) throw new NotFoundException("Transaction not found")
        // Обновляем информацию о транзакции
        return await this.transactionRepository.update(id, updateTransactionDto);
    }

    // Удаление транзакции по ID
    async remove(id: number) {
        const transaction = await this.transactionRepository.findOne({
            where: {id},
        })
        // Проверяем, найдена ли транзакция
        if(!transaction) throw new NotFoundException("Transaction not found")
        // Удаляем транзакцию
        return await this.transactionRepository.delete(id);
    }

    // Получение транзакций пользователя с пагинацией
    async findAllWhithPagination(id: number, page: number, limit: number) {
        const transactions = await this.transactionRepository.find({
            where: {
                user: {id},
            },
            relations: {
                category: true,
                user: true,
            },
            order: {
                createdAt: "DESC",
            },
            take: limit,
            skip: (page -1) * limit,
        })
        return transactions
    }
  
    // Получение суммы транзакций пользователя по типу
    async findAllByType(id: number, type: string) {
        const transactions = await this.transactionRepository.find({
            where: {
                user: {id},
                type,
            },  
        })
        // Вычисляем общую сумму
        const total = transactions.reduce((acc, obj) => acc + obj.amount, 0)
        return total
    }
}

// Сервис для работы с транзакциями.