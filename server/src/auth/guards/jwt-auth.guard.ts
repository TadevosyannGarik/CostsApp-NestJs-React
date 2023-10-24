import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    // Этот кастомный AuthGuard использует стратегию 'jwt' для аутентификации пользователей.
    // Если JWT действителен и соответствующий пользователь найден, запрос считается аутентифированным.
    // В противном случае запрос будет отклонен, и пользователю потребуется повторно аутентифицироваться.
}


// Содержит кастомные гварды (AuthGuard) для аутентификации, такие как JWT и Local.