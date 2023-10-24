import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, Req, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthorGuard } from 'src/gurard/author.guard';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    // Создание новой транзакции
    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
        return this.transactionService.create(createTransactionDto, +req.user.id);
    }

    // Поиск транзакций по типу (например, доход или расход)
    @Get(':type/find')
    @UseGuards(JwtAuthGuard)
    findAllByType(@Req() req, @Param('type') type: string ){
        return this.transactionService.findAllByType(+req.user.id, type)
    }

    // url/transaction/pagination?page=1&limit=3
    // Пагинация для транзакций 
    @Get('pagination')
    @UseGuards(JwtAuthGuard)
    findAllWhithPagination(
    @Req() req, 
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 3,
    ) {
        return this.transactionService.findAllWhithPagination(
            +req.user.id, 
            +page, 
            +limit
            )
        }

    // Получение всех транзакций пользователя
    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() req) {
        return this.transactionService.findAll(req.user.id);
    }

    // url/transactions/transaction/ID
    // url/categories/category/ID
    // Получение конкретной транзакции по типу и идентификатору
    @Get(':type/:id')
    @UseGuards(JwtAuthGuard, AuthorGuard)
    findOne(@Param('id') id: string) {
        return this.transactionService.findOne(+id);
    }

    // Обновление транзакции
    @Patch(':type/:id')
    @UseGuards(JwtAuthGuard, AuthorGuard)
    update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
        return this.transactionService.update(+id, updateTransactionDto);
    }

    // Удаление транзакции
    @Delete(':type/:id')
    @UseGuards(JwtAuthGuard, AuthorGuard)
    remove(@Param('id') id: string) {
        return this.transactionService.remove(+id);
    }
}


// Контроллер для обработки запросов, связанных с транзакциями.