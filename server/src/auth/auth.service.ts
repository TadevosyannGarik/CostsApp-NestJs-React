import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';
  
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService, private readonly jwtService: JwtService ) {}
    
    // Проверяет пользователя по электронной почте и паролю. Возвращает пользователя, если аутентификация прошла успешно.
    // В противном случае выбрасывает исключение UnauthorizedException.
    async validateUser(email: string, password: string) {
        const user = await this.userService.findOne(email)
        const passwordIsMatch = await argon2.verify(user.password, password)
        
        if (user && passwordIsMatch) {
        return user
    }
    
    throw new UnauthorizedException("User or password are incorrect !")
}

    // Выполняет вход пользователя, создавая JWT-токен. Возвращает объект с ID, email и JWT-токеном.
    async login(user: IUser) {
        const {id, email} = user
        return {
            id, 
            email, 
            token: this.jwtService.sign({id: user.id, email: user.email}),
        }
    }
}


// Сервис для обработки аутентификации и создания токенов.