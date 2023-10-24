import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { PassportStrategy } from "@nestjs/passport"

// Декоратор @Injectable позволяет использовать этот класс как сервис
@Injectable()
// Создание класса LocalStrategy, который расширяет PassportStrategy
export class LocalStrategy extends PassportStrategy(Strategy) {
    // Конструктор класса, который принимает сервис AuthService в качестве зависимости
    constructor(private authService: AuthService) {
        // Вызов конструктора суперкласса (PassportStrategy) с опциями стратегии, указывая поле "email" в качестве имени пользователя
        super({ usernameField: "email" })
    }
    
    // Метод validate для проверки аутентификации пользователя
    async validate(email: string, password: string): Promise<any> {
        // Вызов метода validateUser из AuthService для проверки аутентификации пользователя
        const user = await this.authService.validateUser(email, password)
        // Если пользователь не найден, генерируется исключение UnauthorizedException
        if (!user) {
            throw new UnauthorizedException()
        }
        // Возвращение пользователя, если он успешно аутентифицирован
        return user
    }
}