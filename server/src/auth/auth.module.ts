import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [
        // Импортирует модуль пользователей, чтобы взаимодействовать с пользователями
        UserModule, 
        // Подключает модуль Passport для аутентификации
        PassportModule, 
        // Регистрирует модуль JWT, чтобы создавать и проверять JWT-токены
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                // Загружает секретный ключ для JWT из конфигурации
                secret: configService.get('JWT_SECRET'),
                // Настраивает опции подписи JWT
                signOptions: {expiresIn: '30d'},
            }),
            inject: [ConfigService],
        }),
    ],
    // Регистрирует контроллер аутентификации
    controllers: [AuthController],
    // Регистрирует провайдеры для аутентификации
    providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}


// Модуль, связанный с аутентификацией