import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/types/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            // Извлекает JWT из заголовка запроса в формате Bearer
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // Не игнорирует истечение срока действия JWT
            ignoreExpiration: false,
            // Использует секретный ключ из конфигурации
            secretOrKey: configService.get("JWT_SECRET"),
        })
    }

    async validate(user: IUser) {
        // Возвращает данные пользователя после успешной аутентификации
        return { id: user.id, email: user.email }
    }
}

// В этом каталоге находятся стратегии аутентификации, такие как JWT и Local.