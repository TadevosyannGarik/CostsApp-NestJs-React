import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        // Импортируем модуль TypeOrm и регистрируем сущность User
        TypeOrmModule.forFeature([User]),
        // Импортируем и настраиваем модуль Jwt
        JwtModule.registerAsync({
            // Импортируем модуль конфигурации
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get("JWT_SECRET"),
                signOptions: {expiresIn: "30d"}
            }),
            // Внедряем зависимость ConfigService
            inject: [ConfigService]
        }),
    ],
    // Регистрируем UserController
    controllers: [UserController],
    // Регистрируем UserService
    providers: [UserService],
    // Экспортируем UserService для использования в других модулях
    exports: [UserService],
})
export class UserModule {}


// Модуль, связанный с пользователями.