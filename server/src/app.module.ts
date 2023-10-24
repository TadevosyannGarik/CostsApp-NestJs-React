import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        // Подключаем другие модули, которые мы хотим использовать в этом модуле
        UserModule, 
        CategoryModule, 
        AuthModule, 
        TransactionModule,
        // Инициализируем модуль конфигурации, чтобы использовать переменные окружения
        ConfigModule.forRoot({ isGlobal: true }),
        // Инициализируем модуль TypeORM для работы с базой данных
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get("DB_HOST"),
                port: configService.get("DB_PORT"),
                username: configService.get("DB_USERNAME"),
                password: configService.get("DB_PASSWORD"),
                database: configService.get("DB_NAME"),
                synchronize: true,
                entities: [__dirname + "/**/*.entity{.js, .ts}"]
            }),
            inject: [ConfigService],
        }),
    ],
    // Подключаем контроллеры
    controllers: [AppController],
    // Подключаем сервисы
    providers: [AppService],
})
// Экспортируем AppModule как модуль нашего приложения
export class AppModule {}


// Главный модуль приложения, который объединяет различные модули и настройки.